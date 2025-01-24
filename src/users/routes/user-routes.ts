import express, {Router} from "express";
import userRegister from "../controllers/user-register";
import smartUserLogin from "../../common/controllers/smart-login";
import smartUserLogout from "../../common/controllers/smart-logout";
import viewSmartUsers from "../controllers/view-users";
import updateUser from "../controllers/update-user";
import deleteUser from "../controllers/delete-user";
const userRoutes:Router = express.Router();

userRoutes.use("/smartjhola", userRegister);
userRoutes.use("/smartjhola", smartUserLogin);
userRoutes.use("/smartjhola", smartUserLogout);
userRoutes.use("/smartjhola", viewSmartUsers);
userRoutes.use("/smartjhola", updateUser);
userRoutes.use("/smartjhola", deleteUser);

export default userRoutes;

