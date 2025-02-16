import { Request, Response } from "express";
import { addCouponCode } from "../services/coupon.services";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";


export const addCouponController = async(req:Request, res:Response)=>{
    const { couponCode,discountPrecentage,ExpireDate} = req.body;

   try {
    const addCouponResult = await addCouponCode(couponCode,discountPrecentage,ExpireDate, res);
     res.status(StatusCodes.CREATED).json(addCouponResult);
   } catch (error) {
        logger.error("Error during add coupon:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error});
   }
}


