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
      propertyId: propertyId,
      title,
      description,
      priority,
      status: 'Pending',
      submittedBy: req.user._id
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
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ submittedBy: req.user._id })
      .populate('propertyId', 'address')
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

// Get single report
export const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      submittedBy: req.user._id
    }).populate('propertyId', 'address');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Get Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report'
    });
  }
};

// Update report
export const updateReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      submittedBy: req.user._id
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    const { title, description, priority, status } = req.body;

    report.title = title || report.title;
    report.description = description || report.description;
    report.priority = priority || report.priority;
    report.status = status || report.status;

    await report.save();

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Update Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update report'
    });
  }
};

// Delete report
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      submittedBy: req.user._id
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    await report.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Delete Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete report'
    });
  }
}; 