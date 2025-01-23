import express, { Request, Response, Router } from "express";
import logger from "../../../common/utils/logger";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../../common/db/db-connection-config";
import { smartProduct } from "../../entities/produstDetails";
import { smartToken } from "../../../users/entities/smartUserToken";

const viewCart:Router = express.Router();

viewCart.get("/view-cart", async(req:Request, res:Response):Promise<void>=>{
    const {adminId, username,productId, prodictName, quantity} =req.body;
    try {
        const getProductRepo = smartConnection.getRepository(smartProduct);
        const getTokenRepo = smartConnection.getRepository(smartToken);

        const isAdminLoggedIn = getTokenRepo.findOne({where : {userId:adminId, username}});
        if(!isAdminLoggedIn){
            res.status(StatusCodes.NOT_FOUND).json({message : "you are not logged in"});
            return
        }
        const cartItems =await getProductRepo.find();
        if (cartItems.length === 0) {
            res.status(StatusCodes.NO_CONTENT).json({message: "No catagories found"});
            return;
        }

        res.status(200).json({
            success: true,
            data:cartItems
        });
    } catch (error) {
        logger.error("view cart error: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }

});

export default viewCart;


