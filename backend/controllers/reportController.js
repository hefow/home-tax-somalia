import Report from '../models/Report.js';
import Property from '../models/Property.js';

// Create new report
export const createReport = async (req, res) => {
  try {
    const { propertyId, title, description, priority } = req.body;

    // Verify property belongs to user
    const property = await Property.findOne({
      _id: propertyId,
      owner: req.user._id
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found or does not belong to user'
      });
    }

    const newReport = new Report({
      user: req.user._id,
      property: propertyId,
      title,
      description,
      priority
    });

    await newReport.save();

    res.status(201).json({
      success: true,
      report: newReport
    });
  } catch (error) {
    console.error('Create Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create report'
    });
  }
};

// Get user's reports
export const getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id })
      .populate('property', 'address')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('Get Reports Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports'
    });
  }
}; 