import DoctorModel from "../model/Doctor.model";
import MRUserModel from "../model/MR.user.model";

export const getdoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.find();
    
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const Doctoradd = async (req, res) => {
  try {
    const { name, specialty, scCode, phoneNumber, city, location, state } =
      req.body;
    const mrId = req.params.mrId;
    const mrUser = await MRUserModel.findById({ _id: mrId });

    if (!mrUser) {
      return res.status(404).json({ message: "MR User not found!" });
    }



    const doctor = new DoctorModel({
      name,
      specialty,    
      scCode,
      phoneNumber,
      city,
      location,
      state,
      mrID: mrUser._id,
    });

    const savedDoctor = await doctor.save();
    const doctorid = savedDoctor._id

    if (!mrUser.doctorID) {
      mrUser.doctorID = [];
    }

    mrUser.doctorID.push(savedDoctor._id);
    await mrUser.save();

    const populatedMRUser = await MRUserModel.findById(mrId).populate(
      "doctorID"
    );
    res.status(201).json({ message: "Doctor added successfully", data: populatedMRUser , doctorid});
   //res.status(201).json(populatedMRUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
