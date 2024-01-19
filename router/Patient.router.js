import express from "express"
import { Patienadd, getpatient } from "../controller/Patient.controller"
const router = express.Router();
router.get("/getpatient",getpatient)
router.post("/Patien-add/:docid", Patienadd);
export default router