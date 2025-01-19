import express, {Router} from "express";
import userRegister from "../controllers/user-register";
import smartUserLogin from "../../common/controllers/smart-login";
import smartUserLogout from "../controllers/smart-logout";
import viewSmartUsers from "../../admin/controllers/view-users";
const userRoutes:Router = express.Router();

userRoutes.use("/smartjhola", userRegister);
userRoutes.use("/smartjhola", smartUserLogin);
userRoutes.use("/smartjhola", smartUserLogout);
userRoutes.use("/smartjhola", viewSmartUsers);

export default userRoutes;

