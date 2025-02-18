import { Response } from "express"
import { smartConnection } from "../../common/db/db-connection-config";
import { smartCoupon } from "../entities/discount.coupon";
import StatusCodes from "http-status-codes";
import { smartUser } from "../../users/entities/userDetails";
import { smartCart } from "../entities/AddToCart";
import { smartToken } from "../../users/entities/smartUserToken";

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

export const checkCouponCode =async(couponCode:number, totalAmount:number,user: smartUser, res:Response) =>{
    try {
        const getCouponRepo = smartConnection.getRepository(smartCoupon);
        const getCartRepo =  smartConnection.getRepository(smartCart);
        const getTokenRepo = smartConnection.getRepository(smartToken);

        const isCouponExist = await getCouponRepo.findOne({where :{couponCode}});
        if(couponCode !== isCouponExist?.couponCode){
            throw new Error("coupon is not mached");
        }

            const isUserLoggedIn = await getTokenRepo.findOne({ where: { userId:user.userId } });
            if (!isUserLoggedIn) {
                throw new Error("you are not logged in");
            }
            //get cart items
            const cartItems = await getCartRepo.find({where:{user :{userId : user.userId}}});
            if (cartItems.length === 0) {
               throw new Error("you don't add any items in cart");
            }
            const totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);
            const totalPriceAfterDiscount =totalPrice - (totalPrice *0.1);
            return {
                success: true,
                data: cartItems,
                totalPrice :totalPrice,
                totalPriceAfterDiscount : totalPriceAfterDiscount
            };

    } catch (error) {
        console.log("error duirng coupon check :", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "internal server errro during add check: ", error});
    }
}