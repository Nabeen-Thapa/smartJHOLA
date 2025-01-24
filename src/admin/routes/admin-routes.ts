import express, { Router } from "express";
import viewSmartUsers from "../../users/controllers/view-users";
import viewAdmin from "../controllers/view-admin-detail";

const adminRoutes:Router = express.Router();

adminRoutes.use("/smartjhola", viewSmartUsers);
adminRoutes.use("/smartjhola", viewAdmin);



export default adminRoutes;