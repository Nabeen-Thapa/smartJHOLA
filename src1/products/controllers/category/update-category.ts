import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../../common/utils/logger";
import { smartConnection } from "../../../common/db/db-connection-config";
import { smartAdmin } from "../../../admin/entities/adminDetails";
import { smartCategory } from "../../entities/productsCategory";

const updateCategory:Router = express.Router();

updateCategory.patch("/update-category", async(req:Request, res:Response):Promise<void>=>{
    const {adminId, username,categoryId, categoryName, categoryDescription } = req.body;
    if(!username || !categoryName){
        res.status(StatusCodes.BAD_REQUEST).json({message :"all data are required"});
        return;
    }
    try {
       const getAdminRepo = smartConnection.getRepository(smartAdmin);
       const getCategoryRepo = smartConnection.getRepository(smartCategory);

       const isAdminLoggedIn = await getAdminRepo.findOne({where: {username,adminId}});

       if(!isAdminLoggedIn){
        res.status(StatusCodes.NOT_FOUND).json({message : "you are not logged in, login first"});
        return;
       }

       const isCategoryExist = await getCategoryRepo.findOne({where : {categoryId, categoryName}});

       if(!isCategoryExist){
        res.status(StatusCodes.NOT_FOUND).json({message : "category is not exist"});
        return;         
       }

       //update product on db
       const updateCategoryRepo ={
            categoryName,
            categoryDescription
       }
       await getCategoryRepo.update({categoryId},updateCategoryRepo);
    } catch (error) {
        logger.error("update category error :" , error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : "update category error :" , error});
    }

});

export default updateCategory;