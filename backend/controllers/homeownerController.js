import Homeowner from "../models/Homeowner.js";

// create homeowner
export const createHomeowner = async (req,res)=>{
   const {fullName, phone, address, age}=req.body;

   try {
      const newHomeowner = new Homeowner({ fullName, phone, address, age });
      await newHomeowner.save();
      res.status(201).json(newHomeowner);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//get all homeowners
export const getHomeowners = async (req, res) => {
   try {
      const homeowners = await Homeowner.find();
      res.status(200).json(homeowners);
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
      const homeowner = await Homeowner.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!homeowner) {
         return res.status(404).json({ message: 'Homeowner not found' });
      }
      res.status(200).json(homeowner);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete a homeowner
export const deleteHomeowner = async (req, res) => {
   try {
      const homeowner = await Homeowner.findByIdAndDelete(req.params.id);
      if (!homeowner) {
         return res.status(404).json({ message: 'Homeowner not found' });
      }
      res.status(200).json({ message: 'Homeowner deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};