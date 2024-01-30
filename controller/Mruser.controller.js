import bcrypt from "bcrypt";
import MRUserModel from "../model/MR.user.model";
import AdminModel from "../model/Admin.modal";  

export  const getMruser  = async (req,res)=>{

  try {
    const Mruser = await MRUserModel.find();
    res.json(Mruser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export const Mradd = async (req, res) => {
  try {
    const { MRname, MRCODE, DIV, HQ, state, DESG, DOJ, email, password } =
      req.body;
    const adminid = req.params.adminid;
    const admin = await AdminModel.findById({ _id:adminid });

    if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    const getMRUserData = await MRUserModel.findOne({
      email: email,
    });

    if (getMRUserData) {
      return res.status(201).json({
        data: getMRUserData,
        message: "User already exists",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const newPassword = bcrypt.hashSync(password, 10);
    const MRuserData = new MRUserModel({
      adminID: admin._id,
      MRname: MRname,
      MRCODE: MRCODE,
      DIV: DIV,
      HQ: HQ,
      DESG: DESG,
      DOJ: DOJ,
      state: state,
      email: email,
      password: newPassword,
    });

    MRuserData.save();

    if (!admin.MRID) {
      admin.MRID = [];
    }

    // Update admin model with MR ID
    admin.MRID.push(MRuserData._id);
    await admin.save();

    const populatedAdmin = await AdminModel.findById(adminid).populate('MRID');

    if (MRuserData) {
      return res.status(200).json({
        data: populatedAdmin,
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

export const MrsignIn = async (req, res) => {
  try {
    const { MRCODE, password } = req.body;
   // console.log(req.body);
    const userData = await MRUserModel.findOne({ MRCODE });

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
      success:true,
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












export const getMRUser = async (req, res) => {
  try {
    const id = req.params.id;
    const MRuserData = await MRUserModel.findOne({ _id: id });
    if (MRuserData) {
      return res.status(200).json({
        data: MRuserData,
        message: "Successfully Data fatched",
        
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};