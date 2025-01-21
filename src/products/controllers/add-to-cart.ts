import express, { Request, Response, Router } from "express";

const addToProductCart :Router = express.Router();

addToProductCart.post("/add-to-cart", async(req:Request, res:Response):Promise<void>=>{
    const {user, product, qunatity, price, total_price, added_at } = req.body;
    
});

export default addToProductCart;