import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../../common/utils/logger";
import { smartConnection } from "../../../common/db/db-connection-config";
import { addToCart } from "../../entities/AddToCart";

const rejectCartItem :Router = express.Router();

rejectCartItem.post("/reject-item", async(req:Request, res:Response):Promise<void>=>{
    const {productId, productName} = req.body;
    try {
        const getCartRepo = smartConnection.getRepository(addToCart);
    const isExistProductInCart =await getCartRepo.findOne({where : { product:productId}});
    if(!isExistProductInCart){
        res.status(StatusCodes.NOT_FOUND).json({message: "product not found in the product cart"});
        return;
    }
    isExistProductInCart.status = "rejected";
    await getCartRepo.save(isExistProductInCart);
    res.status(StatusCodes.ACCEPTED);
    } catch (error) {
        logger.error("erro duirng accept cart item :" , error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }

});

export default rejectCartItem;