import { Request, Response } from "express";
import { addCategory } from "../services/category.services";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";


export const createCategory = async(req:Request, res:Response)=>{
    const { categoryName, categoryDescription } = req.body;
    try {
        const categoryAddResult = await addCategory(categoryName, categoryDescription);
        res.status(StatusCodes.CREATED).json(categoryAddResult);
    } catch (error) {
        logger.error("Error during add category:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

