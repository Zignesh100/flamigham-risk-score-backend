import  express  from "express";
import{ Mradd, MrsignIn, Mrupdate, getMruser, } from "../controller/Mruser.controller"
const router = express.Router();
router.get("/get-Mruser",getMruser)
router.post("/Mradd/:adminid", Mradd);
router.post("/MRsign-In", MrsignIn);
//router.put("/Mrupdate/:mruserid",Mrupdate)
export default router;