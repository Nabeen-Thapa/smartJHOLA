import express, { Router } from "express";

import viewAdmin from "../controllers/view-admin-detail";
import updateAdmin from "../controllers/update-admin-details";
import deleteAdmin from "../controllers/delete-admin";

const adminRoutes:Router = express.Router();

adminRoutes.use("/admin", viewAdmin);
adminRoutes.use("/admin", updateAdmin);
adminRoutes.use("/admin", deleteAdmin);



export default adminRoutes;