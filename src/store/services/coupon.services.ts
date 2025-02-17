import { Response } from "express"
import { smartConnection } from "../../common/db/db-connection-config";
import { smartCoupon } from "../entities/discount.coupon";
import StatusCodes from "http-status-codes";

export const addCouponCode =async (couponCode:number,discountPrecentage:number, ExpireDate:Date, res:Response)=>{
    if(!couponCode || !ExpireDate){
        throw new Error("couponcode and expire data are rqquired");
    }

    try {
        const getCouponRepo = smartConnection.getRepository(smartCoupon);
        const isExistCoupon = await getCouponRepo.findOne({where : {couponCode}});
        if(isExistCoupon){
            res.status(StatusCodes.CONFLICT).json({message: "coupon is already exist"});
            return;
        }
        const newCoupon = getCouponRepo.create({
            couponCode,
            discountPrecentage,
            ExpireDate
        })
        await getCouponRepo.save(newCoupon);
        res.status(StatusCodes.ACCEPTED).json({message :"coupon added successfully"});
        return;
    } catch (error) {
        console.log("error duirng coupon add :", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "internal server errro during add coupon: ", error});
    }
}

export const checkCouponCode =async(couponCode, totalAmount) =>{
    try {
        
    } catch (error) {
        
    }
}