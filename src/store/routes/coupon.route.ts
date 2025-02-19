import express, { Router } from "express";
import { addCouponController, checkCouponController } from "../controllers/coupon.controller";

const couponRoute :Router = express.Router();

couponRoute.post("/addcoupon", addCouponController);
couponRoute.post("/checkcoupon", checkCouponController);

export default couponRoute;