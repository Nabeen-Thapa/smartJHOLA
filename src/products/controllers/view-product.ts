import express, { Request, Response, Router } from "express";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartProduct } from "../entities/produstDetails";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";

const viewProduct :Router = express.Router();

viewProduct.get("/view-product", async(req:Request, res:Response):Promise<void>=>{
    try {
        const getProductRepo = smartConnection.getRepository(smartProduct);
        const products = await getProductRepo.find();
        if(products.length === 0){
            res.status(StatusCodes.NO_CONTENT).json({message: "No porducts found"});
            return;
        }

        res.status(StatusCodes.OK).json({
            success:true,
            data : products
        });
    } catch (error) {
        logger.error("view product error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"view product error: ", error})
    }
});

export default viewProduct;