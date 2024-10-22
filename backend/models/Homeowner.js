import mongoose from 'mongoose'

const homeownerSchema =new mongoose.Schema({
   fullName:{
      type: String,
      required: true,
   },
   phone:{
      type: String,
      required:true,
   },
   address:{
      type: String,
      required: true,
   },
   age:{
      type: String,
      required:true
   }
})

const Homeowner= mongoose.model("Homeowner",homeownerSchema)

export default Homeowner