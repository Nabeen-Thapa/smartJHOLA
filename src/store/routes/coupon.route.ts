import express, { Router } from "express";
import { addCouponController } from "../controllers/coupon.controller";

const couponRoute :Router = express.Router();

couponRoute.post("/addcoupon", addCouponController);

export default couponRoute;