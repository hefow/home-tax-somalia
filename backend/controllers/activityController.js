import Activity from '../models/Activity.js';

// Get all activities for a user
export const getActivities = async (req, res) => {
  try {
    console.log('User ID from request:', req.user._id);
    
    const activities = await Activity.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(10);

    console.log('Found activities:', activities);

    res.status(200).json({
      success: true,
      count: activities.length,
      activities: activities.map(activity => ({
        _id: activity._id,
        type: activity.type,
        activity: activity.activity,
        date: activity.date,
        createdAt: activity.createdAt
      }))
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

// Create new activity
export const createActivity = async (req, res) => {
  try {
    console.log('Creating activity for user:', req.user._id);
    console.log('Activity data:', req.body);

    const { type, activity } = req.body;

    const validTypes = ['payment', 'property', 'profile', 'document'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid activity type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    const newActivity = new Activity({
      user: req.user._id,
      type,
      activity,
      date: new Date()
    });

    await newActivity.save();
    console.log('New activity created:', newActivity);

    res.status(201).json({
      success: true,
      activity: {
        _id: newActivity._id,
        type: newActivity.type,
        activity: newActivity.activity,
        date: newActivity.date,
        createdAt: newActivity.createdAt
      }
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