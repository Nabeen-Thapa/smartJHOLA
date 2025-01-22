import express, { Request, Response, Router } from "express";

const viewCart:Router = express.Router();

viewCart.get("/view-cart", async(req:Request, res:Response):Promise<void>=>{
    
});

export default viewCart;


