import express, { Router } from "express";
import viewSmartUsers from "../../users/controllers/view-users";
import addCategory from "../../products/controllers/add-category";

const adminRoutes:Router = express.Router();

adminRoutes.use("/smartjhola", viewSmartUsers);
adminRoutes.use("/smartjhola", addCategory);



export default adminRoutes;