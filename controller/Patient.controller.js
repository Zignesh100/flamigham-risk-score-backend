import PatienSchema from "../model/Patient.modal";
import  Doctormodel from "../model/Doctor.model"
export const Patienadd = async (req, res) => {
  try {
    const { name, phoneNumber, age, email, gender } = req.body;

    const docid = req.params.docid
    const druser = await Doctormodel.findById({_id:docid})
    
    if (!druser) {
      return res.status(404).json({ message: " doctor User not found!" });
    }
    const newPatient = new PatienSchema({
      name,
      phoneNumber,
      age,
      email,
      gender,
      drID: druser._id, 
    });

    const savedPatient = await newPatient.save();

    const patientid = savedPatient._id

    if (!druser.PTID) {
      druser.PTID = [];
    }


    druser.PTID.push(savedPatient._id);
    await druser.save();


    const populatedDRUser = await Doctormodel.findById(docid).populate("PTID");

    res.status(201).json({message: "patient added successfully", data: populatedDRUser , patientid});
    console.log(populatedDRUser)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export  const  getpatient = async (req,res) => {
  try {
    const patient = await PatienSchema.find();
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

}

  
