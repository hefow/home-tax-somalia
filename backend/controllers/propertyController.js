import Property from '../models/Property.js';
import Homeowner from '../models/Homeowner.js';

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const { address, type, size, value, yearBuilt, description } = req.body;

    const homeowner = await Homeowner.findOne({ user: req.user._id });
    if (!homeowner) {
      return res.status(404).json({ message: 'Homeowner not found' });
    }

    const newProperty = new Property({
      owner: req.user._id,
      homeowner: homeowner._id,
      address,
      type,
      size,
      value,
      yearBuilt,
      description
    });

    const savedProperty = await newProperty.save();
    res.status(201).json({ id: savedProperty._id, message: 'Property created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all properties for the logged-in user
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, owner: req.user._id });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a property
export const updateProperty = async (req, res) => {
  try {
    const { address, type, size, value, yearBuilt, description } = req.body;
    const property = await Property.findOne({ _id: req.params.id, owner: req.user._id });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.address = address || property.address;
    property.type = type || property.type;
    property.size = size || property.size;
    property.value = value || property.value;
    property.yearBuilt = yearBuilt || property.yearBuilt;
    property.description = description || property.description;

    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

