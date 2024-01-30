import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MRuserschema = new Schema({
 
  MRname: {
    type: String,
    required: true,
  },

  MRCODE: {
    type: String,
  },
  DIV: {
    type: String,
    required: true,
  },

  HQ: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  DESG: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    requierd: true,
  },
  password: {
    type: String,
    requierd: null,
  },

  DOJ: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },

  role: {
    type: String,
    default: "MR",
  },
  doctorID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'doctor',
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Mr", MRuserschema);
