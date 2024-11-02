import Stripe from 'stripe';
import dotenv from 'dotenv';
import User from '../models/Users.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    console.log('Received payment request:', req.body);
    const { amount, planId, planName } = req.body;

    if (!amount || !planId || !planName) {
      console.log('Missing required fields:', { amount, planId, planName });
      return res.status(400).json({ 
        message: 'Missing required payment information',
        received: { amount, planId, planName }
      });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({ 
        message: 'Invalid amount format',
        received: amount
      });
    }

    const amountInCents = Math.round(numericAmount * 100);

    console.log('Creating payment intent with amount:', amountInCents);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: {
        planId,
        planName,
        userId: req.user._id.toString()
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: amountInCents,
    });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({ 
      error: 'Failed to create payment intent',
      details: error.message,
      type: error.type,
      code: error.code
    });
  }
};

export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handleSuccessfulPayment(paymentIntent);
        break;
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await handleFailedPayment(failedPayment);
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

async function handleSuccessfulPayment(paymentIntent) {
  try {
    const { userId, planId, planName } = paymentIntent.metadata;
    
    // Update user's subscription status
    await User.findByIdAndUpdate(userId, {
      $set: {
        'subscription.planId': planId,
        'subscription.planName': planName,
        'subscription.status': 'active',
        'subscription.startDate': new Date(),
        'subscription.endDate': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      }
    });
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent) {
  try {
    const { userId } = paymentIntent.metadata;
    
    // Update user's subscription status to failed
    await User.findByIdAndUpdate(userId, {
      $set: {
        'subscription.status': 'failed',
      }
    });
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
} 