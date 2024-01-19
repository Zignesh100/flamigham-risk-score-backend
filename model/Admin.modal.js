import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },

  AdminID: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    requierd: null,
  },

  role: {
    type: String,
    default: "1",
  },

  MRID: [ {type: mongoose.Schema.Types.ObjectId,ref: 'Mr'} ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("Admin", AdminSchema);
