import express, {Router} from "express";
import userRegister from "../controllers/user-register";
import smartUserLogin from "../controllers/smart-login";
import smartUserLogout from "../controllers/smart-logout";
const userRoutes:Router = express.Router();

userRoutes.use("/smartjhola", userRegister);
userRoutes.use("/smartjhola", smartUserLogin);
userRoutes.use("/smartjhola", smartUserLogout);

export default userRoutes;

