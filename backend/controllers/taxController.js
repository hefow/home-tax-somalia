import TaxRecord from '../models/TaxRecord.js';
import Property from '../models/Property.js';
import Homeowner from '../models/Homeowner.js';

// Create a new tax record
export const createTaxRecord = async (req, res) => {
  try {
    const { propertyId, year, amount, transactionDetails } = req.body;

    const property = await Property.findOne({ _id: propertyId, owner: req.user._id });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const newTaxRecord = new TaxRecord({
      property: propertyId,
      year,
      amount,
      transactionDetails
    });

    const savedTaxRecord = await newTaxRecord.save();
    res.status(201).json(savedTaxRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tax records for a homeowner
export const getTaxRecords = async (req, res) => {
  try {
    const homeowner = await Homeowner.findOne({ user: req.user._id });
    if (!homeowner) {
      return res.status(404).json({ message: 'Homeowner not found' });
    }

    const properties = await Property.find({ homeowner: homeowner._id });
    const propertyIds = properties.map(property => property._id);

    const taxRecords = await TaxRecord.find({ property: { $in: propertyIds } })
      .populate('property', 'address')
      .sort({ year: -1 });
    res.status(200).json(taxRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single tax record by ID
export const getTaxRecordById = async (req, res) => {
  try {
    const taxRecord = await TaxRecord.findById(req.params.id)
      .populate('property', 'address');
    
    if (!taxRecord) {
      return res.status(404).json({ message: 'Tax record not found' });
    }

    const property = await Property.findById(taxRecord.property);
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this tax record' });
    }

    res.status(200).json(taxRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tax record
export const updateTaxRecord = async (req, res) => {
  try {
    const { amount, datePaid, status, transactionDetails } = req.body;

    const taxRecord = await TaxRecord.findById(req.params.id);
    if (!taxRecord) {
      return res.status(404).json({ message: 'Tax record not found' });
    }

    const property = await Property.findById(taxRecord.property);
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this tax record' });
    }

    taxRecord.amount = amount || taxRecord.amount;
    taxRecord.datePaid = datePaid || taxRecord.datePaid;
    taxRecord.status = status || taxRecord.status;
    taxRecord.transactionDetails = transactionDetails || taxRecord.transactionDetails;

    const updatedTaxRecord = await taxRecord.save();
    res.status(200).json(updatedTaxRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a tax record
export const deleteTaxRecord = async (req, res) => {
  try {
    const taxRecord = await TaxRecord.findById(req.params.id);
    if (!taxRecord) {
      return res.status(404).json({ message: 'Tax record not found' });
    }

    const property = await Property.findById(taxRecord.property);
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this tax record' });
    }

    await TaxRecord.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tax record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
