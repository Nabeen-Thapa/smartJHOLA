import express, { Request, Response, Router } from "express";
import logger from "../../../common/utils/logger";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../../common/db/db-connection-config";
import { smartAdmin } from "../../../admin/entities/adminDetails";
import { smartProduct } from "../../entities/produstDetails";

const deleteProduct :Router = express.Router();

deleteProduct.delete("/delete-Product", async(req:Request, res:Response):Promise<void>=>{
    const { adminId, productId, productName } = req.body;

    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
        const getProductRepo = smartConnection.getRepository(smartProduct);

        const isAdminLoggedIn = await getAdminRepo.findOne({ where: { adminId } });

        if (!isAdminLoggedIn) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "you are not logged in, login first" });
            return;
        }
        const isproductExist = await getProductRepo.findOne({where : {productId, productName}});

       if(!isproductExist){
        res.status(StatusCodes.NOT_FOUND).json({message : "product is not exist"});
        return;         
       }
       await getProductRepo.delete({productId});
       res.status(StatusCodes.OK).json({message : "product delete successfully"});
       
    } catch (error) {
        logger.error("update product error :", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "update product error :", error });
    }
})

export default deleteProduct;