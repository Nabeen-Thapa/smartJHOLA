import { Request, Response } from "express";
//import { addCategory, viewCategory,updateCategory, deleteCategory } from "../services/category.services";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { CategoryServiceClass } from "../services/category.services";

export class CategoryControllerClass {
    
    CatogoryServices : CategoryServiceClass
    constructor(CatogoryServices: CategoryServiceClass) {
        this.CatogoryServices = CatogoryServices;
    }

 createCategory = async(req:Request, res:Response)=>{
    const { categoryName, categoryDescription } = req.body;
    try {
        const categoryAddResult = await this.CatogoryServices.addCategory(categoryName, categoryDescription);
        res.status(StatusCodes.CREATED).json(categoryAddResult);
    } catch (error) {
        logger.error("Error during add category:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
    }
}

 readCategory = async(req:Request, res:Response)=>{
    const {categoryId} =req.body;
   try {
    const category = await this.CatogoryServices.viewCategory(categoryId);
    res.status(StatusCodes.OK).json({
        success :true,
        category : category
    });
   } catch (error) {
    logger.error("Error during view category:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
   }
}

 updatedCategord = async(req:Request, res:Response)=>{
    const {categoryId, categoryName, categoryDescription} =req.body;
   try {
    const category = await this.CatogoryServices.updateCategory(categoryId,categoryName, categoryDescription);
    res.status(StatusCodes.OK).json({
        success :true,
        category : category
    })
   } catch (error) {
    logger.error("Error during view category:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error});
   }
}

 deletedCategory= async(req:Request, res:Response)=>{
    const {categoryId, categoryName, categoryDescription} =req.body;
   try {
    const category = await this.CatogoryServices.deleteCategory(categoryId);
    res.status(StatusCodes.OK).json({message : "category dleted successfully"})
   } catch (error) {
    logger.error("Error during delete category:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error});
   }
}
}