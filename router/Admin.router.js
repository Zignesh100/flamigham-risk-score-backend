import  express  from "express";
import{ AdminsignIn, Adminsignup, getData, getadmin, } from "../controller/Admin.controller"
const router = express.Router();
router.get("/getData",getData)
router.get("/get-admin",getadmin)
router.post("/Adminsign-up", Adminsignup);
router.post("/Adminsign-In", AdminsignIn);
export default router;