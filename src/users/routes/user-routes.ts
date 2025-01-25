import express, {Router} from "express";
import userRegister from "../controllers/user-register";
import smartUserLogin from "../../common/controllers/smart-login";
import smartUserLogout from "../../common/controllers/smart-logout";
import viewSmartUsers from "../controllers/view-users";
import updateUser from "../controllers/update-user";
import deleteUser from "../controllers/delete-user";
import changePassword from "../../common/controllers/change-password";
import forgetPassword from "../../common/controllers/forget-password";
const userRoutes:Router = express.Router();

userRoutes.use("/user", userRegister);
userRoutes.use("/user", smartUserLogin);
userRoutes.use("/user", smartUserLogout);
userRoutes.use("/user", viewSmartUsers);
userRoutes.use("/user", updateUser);
userRoutes.use("/user", deleteUser);
userRoutes.use("/user", changePassword);
userRoutes.use("/user", forgetPassword);

export default userRoutes;

