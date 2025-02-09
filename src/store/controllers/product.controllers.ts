import { Request, Response } from "express";
import { addProduct, updateProduct, viewProduct } from "../services/product.services";
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

