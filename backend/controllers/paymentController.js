import Stripe from 'stripe';
import dotenv from 'dotenv';
import User from '../models/Users.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { amount, planId, planName, email } = req.body;
    
    if (!amount || !planId || !planName || !email) {
      return res.status(400).json({ message: 'Missing required payment details' });
    }

    // Create Stripe Checkout Session with customer email
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      billing_address_collection: 'auto',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planName,
              description: `Tax Payment for ${planName} Plan`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        planId,
        planName,
        userId: req.user._id.toString(),
        userEmail: email
      },
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      locale: 'auto',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout Session Error:', error);
    res.status(500).json({ 
      message: 'Failed to create checkout session',
      error: error.message 
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