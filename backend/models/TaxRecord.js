import mongoose from 'mongoose';

const taxRecordSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  datePaid: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending'
  },
  transactionDetails: {
    type: String
  }
}, {
  timestamps: true
});

const TaxRecord = mongoose.model('TaxRecord', taxRecordSchema);

export default TaxRecord;
