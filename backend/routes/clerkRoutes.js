import express from 'express';
import User from '../models/Users.js';

const router = express.Router();

router.post('/webhooks/clerk', async (req, res) => {
  const { id, email_addresses, first_name, last_name } = req.body;

  try {
    const userExists = await User.findOne({ email: email_addresses[0].email_address });

    if (!userExists) {
      const user = new User({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
      });

      await user.save();
    }

    res.status(200).send('User synced');
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).send('Server error');
  }
});

export default router;