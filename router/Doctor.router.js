import  express  from "express";
import{ Doctoradd, getdoctor } from "../controller/Doctor.controller"
const router = express.Router();
router.get("/getdoctor",getdoctor)
router.post("/Doctoradd/:mrId", Doctoradd);
export default router;