import express, { Router } from "express";

import viewAdmin from "../controllers/view-admin-detail";
import updateAdmin from "../controllers/update-admin-details";
import deleteAdmin from "../controllers/delete-admin";
import changePassword from "../../common/controllers/change-password";
import forgetPassword from "../../common/controllers/forget-password";

const adminRoutes:Router = express.Router();

adminRoutes.use("/admin", viewAdmin);
adminRoutes.use("/admin", updateAdmin);
adminRoutes.use("/admin", deleteAdmin);
adminRoutes.use("/admin", changePassword);
adminRoutes.use("/admin", forgetPassword);




export default adminRoutes;