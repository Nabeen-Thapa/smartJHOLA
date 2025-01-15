import express, {Router} from "express";
import userRegister from "../controllers/user-register";
import smartUserLogin from "../controllers/smart-login";
const userRoutes:Router = express.Router();

userRoutes.use("/smartjhola", userRegister);
userRoutes.use("/smartjhola", smartUserLogin);
export default userRoutes;

