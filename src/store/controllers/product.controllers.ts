import { Request, Response } from "express";
import { addProduct, deleteProduct, updateProduct, viewProduct } from "../services/product.services";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";

//add product
export const addProductController = async(req:Request, res:Response)=>{
    const {category, productName,price, brand, stockQuanity,productDescription,discount, image}= req.body;
    try {
        const createProductResult = await addProduct(category, productName,price, brand, stockQuanity,productDescription,discount, image);
        res.status(StatusCodes.CREATED).json(createProductResult);
    } catch (error) {
        logger.error("Error during add product:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error});
    }
}

//view product
export const viewProductController =async(req:Request,  res:Response)=>{
   
    try {
        const viewProductResult = await viewProduct();
        res.status(StatusCodes.OK).json(viewProductResult);
    } catch (error) {
        logger.error("Error during view product:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error});
    }
}


//update 
export const updateProductController =async (req:Request, res:Response)=>{
    const {adminId, productId, productName, price, brand, stockQuanity, productDescription, discount} = req.body;
    try {
        const updateProductResult =  await updateProduct(adminId, productId, productName, price, brand, stockQuanity, productDescription, discount);
        res.status(StatusCodes.OK).json(updateProductResult);
    } catch (error) {
        logger.error("Error during view product:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
    }
}

//delete
export const deleteProductController = async(req:Request, res:Response)=>{
    const {adminId,produtId}= req.body;
    try {
        const deleteProductResult = await deleteProduct(adminId,produtId);
    } catch (error) {
        logger.error("Error during view product:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
    }
}