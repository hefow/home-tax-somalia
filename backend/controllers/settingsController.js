import { sendEmail } from '../utils/emailService.js';
import User from '../models/User.js';

export const updateEmailSettings = async (req, res) => {
  try {
    const { emailNotifications } = req.body;
    
    // Update user's email notification preferences
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        'settings.emailNotifications': emailNotifications 
      },
      { new: true }
    );

    // Send test email if notifications are enabled
    if (emailNotifications) {
      await sendEmail({
        to: user.email,
        template: 'notificationEnabled',
        data: user.username
      });
    }

    res.json({ 
      success: true, 
      message: 'Email settings updated successfully',
      settings: user.settings
    });
  } catch (error) {
    console.error('Email settings update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update email settings',
      error: error.message
    });
  }
}; 