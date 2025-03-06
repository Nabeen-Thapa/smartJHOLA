import { Request, Response } from "express";
import { AddToCart, removeItemFromCart, viewCart } from "../services/cart.service";
import { StatusCodes } from "http-status-codes";
import { cartEvent } from "../../common/utils/event.emmiter";


export const addToCartController =async(req:Request, res:Response)=>{
    const{user, productId, quantity, discountCoupon}=req.body;
    try {
       await AddToCart(user, productId, quantity, discountCoupon);
       res.json({mesage:"product is added to cart success"});
       cartEvent.emit("decreaseItemQuantity", {productId, quantity});
    } catch (error) {
        console.log("add to cart error:", error);
    }
}



export const viewCartController = async(req:Request, res:Response)=>{
    const {user}= req.body;
    try {
        const viewCartresult = await viewCart(user);
    } catch (error) {
        
    }
}

export const removeCartItemController = async(req: Request, res: Response)=>{
    const {productId, user} =req.body;
    try {
        const removeCartItemResult =  await removeItemFromCart(productId, user);
        res.status(StatusCodes.FORBIDDEN).json({message:"cart item deeleted"})
    } catch (error) {
        console.log("cart item remove error :", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

