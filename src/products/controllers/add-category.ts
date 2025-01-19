import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartCategoy } from "../entities/productsCategory";
import logger from "../../common/utils/logger";

const addCategory:Router =express.Router();

addCategory.post("/add-category", async(req:Request, res:Response):Promise<void> =>{
    const {categoryName, categoryDescription} = req.body;

    const username =req.session.username;
    const userId = req.session.userId;

    if(!username && !userId){
        res.status(StatusCodes.NOT_FOUND).json({Message :"u are not logged in, login first"});
        return;
    }

    if(!categoryName || !categoryDescription){
        res.status(StatusCodes.BAD_REQUEST).json({Message :"categoryName and categoryDescription reduired"});
        return;
    }
    try {
        const getCategoryRepo = smartConnection.getRepository(smartCategoy);
        const isCategoryExist = await getCategoryRepo.findOne({where : {categoryName},});
        if(isCategoryExist){
            res.status(StatusCodes.BAD_REQUEST).json({Message :"categoryName already exist"});
            return; 
        }
        const newCategory = await getCategoryRepo.create({
            categoryName,
             categoryDescription
        });
        await getCategoryRepo.save(newCategory);

        res.status(StatusCodes.ACCEPTED);
    } catch (error) {
        logger.error("add category error: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "error duirng add category", error})
    }
});

export default addCategory;
