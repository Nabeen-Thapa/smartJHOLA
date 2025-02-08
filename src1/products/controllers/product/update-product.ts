import express, { Request, Response, Router } from "express";
import logger from "../../../common/utils/logger";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../../common/db/db-connection-config";
import { smartAdmin } from "../../../admin/entities/adminDetails";
import { smartProduct } from "../../entities/produstDetails";

const updateProduct:Router = express.Router();

updateProduct.patch("/update-product", async(req:Request, res:Response):Promise<void>=>{
    const {adminId, username,productId, productName,price, brand, stockQuanity, productDescription, discount, image } = req.body;
    if(!username || !productName){
        res.status(StatusCodes.BAD_REQUEST).json({message :"all data are required"});
        return;
    }
    try {
       const getAdminRepo = smartConnection.getRepository(smartAdmin);
       const getProductRepo = smartConnection.getRepository(smartProduct);

       const isAdminLoggedIn = await getAdminRepo.findOne({where: {username,adminId}});

       if(!isAdminLoggedIn){
        res.status(StatusCodes.NOT_FOUND).json({message : "you are not logged in, login first"});
        return;
       }

       const isProductExist = await getProductRepo.findOne({where : {productId, productName}});

       if(!isProductExist){
        res.status(StatusCodes.NOT_FOUND).json({message : "product is not exist"});
        return;         
       }

       //update product on db
       const updateproductRepo ={
            productName,
            price,
            brand,
            stockQuanity,
            productDescription,
            discount,
            image
       }
       await getProductRepo.update({productId},updateproductRepo);
    } catch (error) {
        logger.error("update product error :" , error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : "update product error :" , error});
    }
});

export default updateProduct;