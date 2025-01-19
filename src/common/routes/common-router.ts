import express, { Router } from "express";
import smartUserLogin from "../controllers/smart-login";

const commonRoutes : Router = express.Router();

commonRoutes.use("/", smartUserLogin);

export default commonRoutes;