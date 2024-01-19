import patientestSchema from "../model/Test.modal";
import Patienschema from "../model/Patient.modal";
export const patientestsubmit = async (req, res) => {
 

  try {
    const {
      TestName,
      Gender,
      Age,
      TotalCholesterol,
      Underhypertensiontreatment,
      Systolicbloodpressure,
      Smoking,
      Riskscore,
      dot,
    } = req.body;
    

    const ptid = req.params.ptid;
    const PTuser = await Patienschema.findById({ _id: ptid });

    if (!PTuser) {
      return res.status(404).json({ message: " patient User not found!" });
    }

    const patientTestData = new patientestSchema({
      ptID: PTuser._id,
      TestName,
      Gender,
      Age,
      TotalCholesterol,
      Underhypertensiontreatment,
      Systolicbloodpressure,
      Smoking,
      Riskscore,
      dot,
    });

    const savedTestData = await patientTestData.save();

    if (!PTuser.testdata) {
      PTuser.testdata = [];
    }


    PTuser.testdata.push(savedTestData._id);
    await PTuser.save();

    const populatedPTUser = await Patienschema.findById(ptid).populate("testdata");
    res.status(201).json(populatedPTUser);
    // res.status(201).json({
    //   message: "Patient test data submitted successfully",
    //   data: populatedPTUser,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
