import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  value: {
    type: Number,
    required: true
  },
  size: {
    square: Number,
    feet: Number,
    total: Number
  },
  yearBuilt: Number,
  description: String
}, {
  timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
