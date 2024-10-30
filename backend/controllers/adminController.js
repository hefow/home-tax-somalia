import User from '../models/Users.js';
import Property from '../models/Property.js';
import Homeowner from '../models/Homeowner.js';

// Get all users (homeowners)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'homeowner' }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('owner', 'username email')
      .populate('homeowner', 'fullName phone address');
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'homeowner' });
    const totalProperties = await Property.countDocuments();
    const totalHomeowners = await Homeowner.countDocuments();

    // Get recent properties
    const recentProperties = await Property.find()
      .populate('owner', 'username email')
      .populate('homeowner', 'fullName')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent users
    const recentUsers = await User.find({ role: 'homeowner' })
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: {
        totalUsers,
        totalProperties,
        totalHomeowners
      },
      recentProperties,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete associated homeowner profile
    await Homeowner.findOneAndDelete({ user: user._id });
    // Delete associated properties
    await Property.deleteMany({ owner: user._id });
    // Delete user
    await user.deleteOne();

    res.status(200).json({ message: 'User and associated data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await property.deleteOne();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 