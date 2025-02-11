import { Request, Response } from "express";
import { addCategory, viewCategory,updateCategory, deleteCategory } from "../services/category.services";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";


export const createCategory = async(req:Request, res:Response)=>{
    const { categoryName, categoryDescription } = req.body;
    try {
        const categoryAddResult = await addCategory(categoryName, categoryDescription);
        res.status(StatusCodes.CREATED).json(categoryAddResult);
    } catch (error) {
        logger.error("Error during add category:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
    }
}


export const readCategory = async(req:Request, res:Response)=>{
    const {categoryId} =req.body;
   try {
    const category = await viewCategory(categoryId);
    res.status(StatusCodes.OK).json({
        success :true,
        category : category
    })
   } catch (error) {
    logger.error("Error during view category:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
   }
}

export const updatedCategord = async(req:Request, res:Response)=>{
    const {categoryId, categoryName, categoryDescription} =req.body;
   try {
    const category = await updateCategory(categoryId,categoryName, categoryDescription);
    res.status(StatusCodes.OK).json({
        success :true,
        category : category
    })
   } catch (error) {
    logger.error("Error during view category:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error});
   }
}


export const deletedCategory= async(req:Request, res:Response)=>{
    const {categoryId, categoryName, categoryDescription} =req.body;
   try {
    const category = await deleteCategory(categoryId);
    res.status(StatusCodes.OK).json({message : "category dleted successfully"})
   } catch (error) {
    logger.error("Error during delete category:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error});
   }
}