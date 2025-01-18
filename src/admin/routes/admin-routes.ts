import express, { Router } from "express";
import viewSmartUsers from "../controllers/view-users";

const adminRoutes:Router = express.Router();

adminRoutes.use("/smartjhola", viewSmartUsers);

export default adminRoutes;