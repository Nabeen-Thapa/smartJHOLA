import express, { Request, Response, Router } from "express";
import { smartConnection } from "../../common/db/db-connection-config";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { smartCategory } from "../entities/productsCategory";

const viewCategory:Router = express.Router();

viewCategory.get('/viewCategory', async(req:Request, res:Response):Promise<void>=>{


    // const {username, password} =req.body;
    // if(!username || !password){
    //     res.status(StatusCodes.BAD_REQUEST).json({message : "enter username and password"});
    //     return;
    // } 

    // if(username !== "admin" && password !=="admin12"){
    //     res.status(StatusCodes.BAD_REQUEST).json({message :"username and password are not match"});
    //     return;
    // }
    try {
        
    //accessing users form database
    const categoryRepositery = smartConnection.getRepository(smartCategory);
    const categories =await categoryRepositery.find();
    if (categories.length === 0) {
        res.status(StatusCodes.NO_CONTENT).json({message: "No catagories found"});
        return;
    }
    res.status(200).json({
        success: true,
        data:categories
    });
    return;
    } catch (error) {
        logger.error("view user error : ",error);
        res.status(500).json({message: "fail to view users, error during view users"});
        return;
    }

});

export default viewCategory;