import { Request, Response } from "express";
import { AddToCart, removeItemFromCart, viewCart } from "../services/cart.service";
import { StatusCodes } from "http-status-codes";


export const addToCartController =async(req:Request, res:Response)=>{
    const{userId, product, quantity, price, total_price}=req.body;
    try {
       const  addToCartResult = await AddToCart(userId, product, quantity, price, total_price);
       res.json({mesage:"rpoduct is added to cart success"});
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

