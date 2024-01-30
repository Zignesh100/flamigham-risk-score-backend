import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(express.json());
import MruserRouter from "./router/Mruser.router";
import AdminRouter  from "./router/Admin.router";
import DoctorRouter from "./router/Doctor.router";
import PatienRouter from "./router/Patient.router"
import test from "./router/Test.router";
import testselect  from "./router/Testselect.router"
app.use(cors());
app.use(express.static(__dirname));
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(" http://localhost:" + PORT);
});

// ---------------PORT---------------

app.use('/',MruserRouter);
app.use("/",AdminRouter);
app.use("/",DoctorRouter);
app.use ("/",PatienRouter);
app.use("/",test);
app.use("/",testselect)

// ---------MONOGO DB DATABASE--------------
const DB = "mongodb+srv://root:root@cluster1.mssxrfo.mongodb.net/test?retryWrites=true&w=majority";
//const DB = "mongodb://localhost:27017/RiskApi";
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.log(error);
    console.log("no connection");
  });



