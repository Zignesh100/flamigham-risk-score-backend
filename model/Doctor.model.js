import mongoose from "mongoose";
import Patientmodel from "../model/Patient.modal"
//import MRUserModel from "../model/MR.user.model"
import MRmodal   from "../model/MR.user.model"
const Schema = mongoose.Schema;
const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  scCode: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  status: {
    type: Number,
    default: 1,
  },
  state:{
    type:String, 
  },
  location: {
    type: String,
    required: true,
  },
 
  PTID: [ { type: mongoose.Schema.Types.ObjectId, ref: 'patient', } ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("doctor", doctorSchema);
