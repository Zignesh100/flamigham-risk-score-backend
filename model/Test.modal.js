import mongoose from "mongoose";
const Schema = mongoose.Schema;
const patientestSchema = new Schema({
  TestName: String,
  Gender: String,
  Age: Number,
  TotalCholesterol: Number,
  Underhypertensiontreatment: Boolean,
  Systolicbloodpressure: Number,
  Smoking: Boolean,
  Riskscore: String,
  dot: Date,

 
});
export default mongoose.model("test", patientestSchema);
