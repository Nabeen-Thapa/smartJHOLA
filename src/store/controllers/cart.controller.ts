import { Request, Response } from "express";
import { AddToCart, viewCart } from "../services/cart.service";


const addToCartController =async(req:Request, res:Response)=>{
    const{user, product, quantity, price, total_price, added_at}=req.body;
    try {
       const  addToCartResult = await AddToCart(user, product, quantity, price, total_price, added_at);
       res.json({mesage:"rpoduct is added to cart success"});
    } catch (error) {
        console.log("add to cart error:", error);
    }
}

const viewCartController = async(req:Request, res:Response)=>{
    const {user}= req.body;
    try {
        const viewCartresult = await viewCart(user);
    } catch (error) {
        
    }
}