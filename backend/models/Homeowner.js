import mongoose from 'mongoose'

const homeownerSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   fullName: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   age: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

const Homeowner = mongoose.model("Homeowner", homeownerSchema)

export default Homeowner
