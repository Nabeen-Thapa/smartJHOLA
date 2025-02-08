import express, { Router } from "express";

import viewAdmin from "../controllers/view-admin-detail";
import updateAdmin from "../controllers/update-admin-details";
import deleteAdmin from "../controllers/delete-admin";
import changePassword from "../../common/controllers/change-password";
import forgetPassword from "../../common/controllers/forget-password";
import viewSmartUsers from "../../users/controllers/view-users";
import { smartAdmin } from "../entities/adminDetails";
import smartUserLogin from "../../common/controllers/smart-login";

const adminRoutes:Router = express.Router();
adminRoutes.use("/admin", smartUserLogin);
adminRoutes.use("/admin", viewAdmin);
adminRoutes.use("/admin", updateAdmin);
adminRoutes.use("/admin", deleteAdmin);
adminRoutes.use("/admin", changePassword);
adminRoutes.use("/admin", forgetPassword);
adminRoutes.use("/admin", viewSmartUsers);




export default adminRoutes;