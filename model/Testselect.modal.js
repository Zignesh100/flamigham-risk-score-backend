import mongoose from "mongoose";
const Schema = mongoose.Schema;
const testselect = new Schema({
  testname: {
    type: String,
    required: true,
    unique: true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
});
 export default mongoose.model ("testselect",testselect)