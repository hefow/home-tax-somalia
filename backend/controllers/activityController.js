import Activity from '../models/Activity.js';

// Get all activities for a user with homeowner details
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('homeowner', 'username email')
      .populate('user', 'username')
      .sort({ date: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: activities.length,
      activities
    });
  } catch (error) {
    console.error('Get Activities Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activities',
      error: error.message
    });
  }
};

// Create new activity with change tracking
export const createActivity = async (req, res) => {
  try {
    const { type, activity, details, homeownerId, changes } = req.body;

    const validTypes = ['payment', 'property', 'profile', 'document', 'tax', 'status'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid activity type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    const newActivity = new Activity({
      user: req.user._id,
      homeowner: homeownerId,
      type,
      activity,
      details,
      changes,
      date: new Date()
    });

    await newActivity.save();

    // Populate homeowner details before sending response
    await newActivity.populate('homeowner', 'username email');

    res.status(201).json({
      success: true,
      activity: newActivity
    });
  } catch (error) {
    console.error('Create Activity Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create activity',
      error: error.message
    });
  }
};

// Get activities for specific homeowner
export const getHomeownerActivities = async (req, res) => {
  try {
    const { homeownerId } = req.params;
    
    const activities = await Activity.find({ homeowner: homeownerId })
      .populate('homeowner', 'username email')
      .sort({ date: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch homeowner activities',
      error: error.message
    });
  }
}; 