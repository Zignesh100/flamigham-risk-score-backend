import AdminModel from "../model/Admin.modal";
import bcrypt from "bcrypt";
import DoctorModel  from "../model/Doctor.model" 
import MRUserModel from "../model/MR.user.model" 
import PatienSchema  from "../model/Patient.modal" 
// export const Adminsignup = async (req, res) => {
//     try {
//       const { fullname, AdminID, password ,role } =
//         req.body;
//       const getAdminUserData = await AdminModel.findOne({
//          AdminID:AdminID
//       });
//       if (getAdminUserData) {
//         return res.status(201).json({
//           data: getAdminUserData,
//           message: "User already exists",
//         });
//       }
//       const newPassword = bcrypt.hashSync(password, 10);
//       const AdminuserData = new AdminModel({
//         fullname: fullname,
//         AdminID:AdminID,
//         role:role,
//         password: newPassword,
//       });
//       console.log(AdminuserData);
//       AdminuserData.save();

//       if (AdminuserData) {
//         return res.status(200).json({
//           data: AdminuserData,
//           message: "successfully Signed up !",
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

export const Adminsignup = async (req, res) => {
  try {
    const { fullname, AdminID, password, role } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }
    password;
    const getAdminUserData = await AdminModel.findOne({
      AdminID: AdminID,
    });

    if (getAdminUserData) {
      return res.status(201).json({
        data: getAdminUserData,
        message: "User already exists",
      });
    }

    const newPassword = bcrypt.hashSync(password, 10);
    const adminData = new AdminModel({
      fullname: fullname,
      AdminID: AdminID,
      role: role,
      password: newPassword,
    });

    adminData.save();

    if (adminData) {
      return res.status(200).json({
        data: adminData,
        message: "successfully Signed up!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const AdminsignIn = async (req, res) => {
  try {
    const { AdminID, password } = req.body;

    const userData = await AdminModel.findOne({ AdminID });

    if (!userData) {
      return res.status(400).json({
        message: "User doesn't exist!",
      });
    }

    const comparePassword = await bcrypt.compare(password, userData.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      data: userData,
      message: "Successfully logged in!",
    });
  } catch (error) {
    console.error("Error during signIn:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export  const getadmin  = async (req,res)=>{

  try {
    const admins = await AdminModel.find();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}






export const getData = async (req, res) => {
  try {
    if (!req.params.model) {
      return res.status(400).json({ message: 'Model parameter is missing' });
    }

    const models = {
      doctor: DoctorModel,
      admin: AdminModel,
      mruser: MRUserModel,
      patient: PatienSchema,
    };

    const modelName = req.params.model.toLowerCase();

    if (models[modelName]) {
      const data = await models[modelName].find();
      res.json(data);
    } else {
      res.status(404).json({ message: 'Model not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};








// export const handleDetailedReport = async (req, res) => {
//   try {
//     const mrData = await MRUserModel.find({ role: "MR" })
//       .populate({
//         path: 'doctorID',
//         model: 'doctor',
//         populate: {
//           path: 'PTID',
//           model: 'patient',
//           populate: {
//             path: 'testdata',
//             model: 'test',
//           },
//         },
//       })
//       .exec();

//     // Reshape the data into the desired format
//     const detailedReport = mrData.flatMap((mr) => {
//       const doctorsData = mr.doctorID.flatMap((doctor) => {
//         const patientsData = doctor.PTID.flatMap((patient) => {
//           const testsData = patient.testdata.map((test) => {
//             return {
//               Mrname: mr.MRname,
//               MrCode: mr.MRCODE,
//               Div: mr.DIV,
//               Hq: mr.HQ,
//               state: mr.state,
//               DESG: mr.DESG,
//               email: mr.email,
//               DOJ: mr.DOJ,
//               doctorName: doctor.name,
//               // Add patient and test details here if needed
//               patientName: patient.name,
//               patientPhoneNumber: patient.phoneNumber,
//               testName: test.TestName,
//             };
//           });

//           return testsData;
//         });

//         return patientsData;
//       });

//       return doctorsData;
//     });

//     res.status(200).json(detailedReport);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// };



export const handleDetailedReport = async (req, res) => {
  try {
    const mrData = await MRUserModel.find({ role: "MR" })
      .populate({
        path: 'doctorID',
        model: 'doctor',
        populate: {
          path: 'PTID',
          model: 'patient',
          populate: {
            path: 'testdata',
            model: 'test',
          },
        },
      })
      .exec();

   
    const detailedReport = mrData.flatMap((mr) => {
      const doctorsData = mr.doctorID.flatMap((doctor) => {
        const patientsData = doctor.PTID.flatMap((patient) => {
          const testsData = patient.testdata.map((test) => {
            return {
              Mrname: mr.MRname,
              MrCode: mr.MRCODE,
              Div: mr.DIV,
              Hq: mr.HQ,
              state: mr.state,
              DESG: mr.DESG,
              email: mr.email,
              DOJ: mr.DOJ,
              doctorName: doctor.name,
              scCode: doctor.scCode,
              doctorstate: doctor.state,
              city: doctor.city,
              location: doctor.location,
              phoneNumberdoctor: doctor.phoneNumber,
              specialty:doctor.specialty,
              patientName: patient.name,
              patientemail: patient.email,
              patientPhoneNumber: patient.phoneNumber,
              testName: test.TestName,
              Gender: test.Gender,
              Age: test.Age,
              TotalCholesterol: test.TotalCholesterol,
              Underhypertensiontreatment: test.Underhypertensiontreatment,
              Systolicbloodpressure: test.Systolicbloodpressure,
              Smoking: test.Smoking,
              Riskscore: test.Riskscore,
            };
          });

          return testsData;
        });

        return patientsData;
      });

      return doctorsData;
    });

    res.status(200).json(detailedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};