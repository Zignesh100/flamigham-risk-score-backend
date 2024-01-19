import express from "express"
import { patientestsubmit } from "../controller/Test.controoller";
const router = express.Router();
router.post("/patientestsubmit/:ptid",patientestsubmit);
export default router