import  express  from "express";
import{ Mradd, MrsignIn, Mrupdate, getMruser,getMRUser } from "../controller/Mruser.controller"
const router = express.Router();
router.get("/get-Mruser",getMruser)
router.post("/Mradd/:adminid", Mradd);
router.post("/MRsign-In", MrsignIn);
//router.put("/Mrupdate/:mruserid",Mrupdate)
router.get("/getMRUser/:id",getMRUser);
export default router;