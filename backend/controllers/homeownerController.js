import Homeowner from "../models/Homeowner.js";

// create homeowner
export const createHomeowner = async (req, res) => {
   const { fullName, phone, address, age } = req.body;

   try {
      const newHomeowner = new Homeowner({
         user: req.user._id, // Isticmaal ID-ga user-ka ee hadda ku jira
         fullName,
         phone,
         address,
         age
      });
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
   const { fullName, phone, address, age } = req.body;

   try {
      const homeowner = await Homeowner.findOne({ user: req.user._id });

      if (!homeowner) {
         return res.status(404).json({ message: 'Homeowner not found' });
      }

      // Update the homeowner fields
      homeowner.fullName = fullName || homeowner.fullName;
      homeowner.phone = phone || homeowner.phone;
      homeowner.address = address || homeowner.address;
      homeowner.age = age || homeowner.age;

      // Save the updated homeowner
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
