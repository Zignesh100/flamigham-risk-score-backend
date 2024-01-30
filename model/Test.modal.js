import mongoose from "mongoose";
const Schema = mongoose.Schema;
const patientestSchema = new Schema({
  TestName: String,
  gender: Boolean,                 
  age: String,                   
  totalCholesterol: String,       
  hdlCholesterol: String,         
  sbpTreated: Boolean,            
  blood_pressure: String,         
  smoking: Boolean, 
  result:String,
  dot: {
    type: Date,
    default: Date.now(),
  },
  

});
export default mongoose.model("test", patientestSchema);
