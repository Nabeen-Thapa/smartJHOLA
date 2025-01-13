import express, {Router} from "express";
import userRegister from "../controllers/user-register";
const userRoutes:Router = express.Router();

userRoutes.use("/user-register", userRegister);

export default userRoutes;

