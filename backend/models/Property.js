import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  homeowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homeowner',
    required: true
  },
  address: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['House', 'Apartment', 'Commercial', 'Land']
  },
  // Update size fields
  size: {
    square: {
      type: Number,
      required: true
    },
    feet: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  value: {
    type: Number,
    required: true
  },
  yearBuilt: {
    type: Number
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
