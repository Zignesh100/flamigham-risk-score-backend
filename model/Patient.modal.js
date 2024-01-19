import mongoose from "mongoose";
const PatienSchema = mongoose.Schema;


const Patienschema = new PatienSchema({
  name: {
    type: String,
   
  },
  phoneNumber: {
    type: Number,
  },
  age: {
    type: Number, 
  
  },

  email: {
    type: String,
    
  },

  gender: {
    type: String,
  }, 
 
 testdata: [ {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'test',
},],

 
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("patient", Patienschema);
