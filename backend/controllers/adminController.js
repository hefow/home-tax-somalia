import User from '../models/Users.js';
import Property from '../models/Property.js';
import Homeowner from '../models/Homeowner.js';
import Activity from '../models/Activity.js';
import TaxRecord from '../models/TaxRecord.js';

// Get all users (both admins and homeowners)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    // Get current active sessions from localStorage or database
    const activeSessions = await User.find({
      lastActivity: { 
        $gt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
      }
    }).select('_id');

    const activeUserIds = activeSessions.map(session => session._id.toString());

    // Add active status to each user
    const usersWithActivity = users.map(user => ({
      ...user.toObject(),
      isActive: activeUserIds.includes(user._id.toString())
    }));

    const stats = {
      total: users.length,
      admins: users.filter(user => user.role === 'admin').length,
      homeowners: users.filter(user => user.role === 'homeowner').length,
      active: activeUserIds.length
    };

    res.status(200).json({
      users: usersWithActivity,
      stats
    });
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
    // Calculate the start of current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Use Promise.all for concurrent database queries
    const [
      totalUsers, 
      totalProperties, 
      totalHomeowners, 
      recentProperties, 
      recentUsers,
      // Get all tax records for current month
      monthlyTaxRecords
    ] = await Promise.all([
      User.countDocuments({ role: 'homeowner' }),
      Property.countDocuments(),
      Homeowner.countDocuments(),
      Property.find()
        .populate('owner', 'username email')
        .populate('homeowner', 'fullName')
        .sort({ createdAt: -1 })
        .limit(5),
      User.find({ role: 'homeowner' })
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(5),
      // Add query for tax records
      TaxRecord.find({
        datePaid: { $gte: startOfMonth },
        status: 'Paid'
      })
    ]);

    // Calculate monthly revenue from tax records
    const monthlyRevenue = monthlyTaxRecords.reduce((total, record) => {
      return total + (record.amount || 0);
    }, 0);

    // Calculate new users and properties in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [newUsers, newProperties] = await Promise.all([
      User.countDocuments({ 
        createdAt: { $gte: thirtyDaysAgo },
        role: 'homeowner'
      }),
      Property.countDocuments({ 
        createdAt: { $gte: thirtyDaysAgo }
      })
    ]);

    res.status(200).json({
      stats: {
        totalUsers,
        totalProperties,
        totalHomeowners,
        monthlyRevenue,
        newUsers,
        newProperties
      },
      recentProperties,
      recentUsers
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch dashboard statistics',
      error: error.message 
    });
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

export const getHomeownerActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('homeowner', 'username email')
      .sort({ date: -1 })
      .limit(50)
      .lean(); // Use lean() for better performance
    
    if (!activities) {
      return res.status(404).json({ message: 'No activities found' });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error('Homeowner activities error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch homeowner activities',
      error: error.message 
    });
  }
};

// Add this function to get revenue trends
export const getRevenueTrends = async (req, res) => {
  try {
    // Get start of last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const taxRecords = await TaxRecord.find({
      datePaid: { $gte: sixMonthsAgo },
      status: 'Paid'
    });

    // Group by month and calculate total
    const monthlyTotals = {};
    taxRecords.forEach(record => {
      const month = record.datePaid.toLocaleString('default', { month: 'short' });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + record.amount;
    });

    // Convert to array format for charts
    const trends = Object.entries(monthlyTotals).map(([month, amount]) => ({
      month,
      amount
    }));

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 