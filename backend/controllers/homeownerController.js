import Homeowner from "../models/Homeowner.js";
import { validateHomeownerForm } from '../utils/validationHelpers.js';
import asyncHandler from 'express-async-handler';
import Property from '../models/Property.js';

// create homeowner
export const createHomeowner = async (req, res) => {
   try {
      // Check if homeowner already exists
      const existingHomeowner = await Homeowner.findOne({ user: req.user._id });
      
      if (existingHomeowner) {
         // Instead of error, return the existing homeowner
         return res.status(200).json({ 
           message: 'Retrieved existing profile',
           homeowner: existingHomeowner 
         });
      }

      // Validate the form data
      const { isValid, errors, validatedData } = validateHomeownerForm(req.body);

      if (!isValid) {
         return res.status(400).json({ 
           message: 'Validation failed', 
           errors 
         });
      }

      

      const newHomeowner = new Homeowner({
         user: req.user._id,
         ...validatedData
      });
      
      await newHomeowner.save();
      res.status(201).json({
        message: 'Profile created successfully',
        homeowner: newHomeowner
      });
   } catch (error) {
      console.error('Create Homeowner Error:', error);
      res.status(500).json({ 
        message: 'Error creating profile',
        error: error.message 
      });
   }
};

//get all homeowners
export const getHomeowners = async (req, res) => {
   try {
      const homeowner = await Homeowner.findOne({ user: req.user._id });
      if (!homeowner) {
         return res.status(404).json({ message: 'Homeowner not found' });
      }
      res.status(200).json(homeowner);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get a single homeowner by ID
export const getHomeownerById = async (req, res) => {
   try {
      const homeowner = await Homeowner.findById(req.params.id);
      if (!homeowner) {
         return res.status(404).json({ message: 'Homeowner not found' });
      }
      res.status(200).json(homeowner);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update a homeowner
export const updateHomeowner = async (req, res) => {
   try {
      // Validate the form data
      const { isValid, errors, validatedData } = validateHomeownerForm(req.body);

      if (!isValid) {
         return res.status(400).json({ 
           message: 'Validation failed', 
           errors 
         });
      }

      const homeowner = await Homeowner.findOne({ user: req.user._id });

      if (!homeowner) {
         return res.status(404).json({ message: 'Homeowner not found' });
      }

      // Update with validated data
      Object.assign(homeowner, validatedData);

      const updatedHomeowner = await homeowner.save();
      res.status(200).json(updatedHomeowner);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete a homeowner
export const deleteHomeowner = async (req, res) => {
   try {
      const homeowner = await Homeowner.findOneAndDelete({ user: req.user._id });
      if (!homeowner) {
         return res.status(404).json({ message: 'Homeowner not found' });
      }
      res.status(200).json({ message: 'Homeowner deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// @desc    Get properties for logged-in homeowner
// @route   GET /api/homeowner/properties
// @access  Private
export const getHomeownerProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ owner: req.user._id })
    .sort({ createdAt: -1 });

  res.json(properties);
});
