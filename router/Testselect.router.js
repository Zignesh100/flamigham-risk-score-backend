import express from "express";
import { createTestSelect, getAllTestSelects, updateTestSelectById } from "../controller/Testselect.controller";
const router = express.Router();
router.get('/getTestSelects', getAllTestSelects);
router.post("/testselects", createTestSelect);
router.put("/testselects/:id", updateTestSelectById);
export default router;
