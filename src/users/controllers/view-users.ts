import express, { Request, Response, Router } from "express";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../entities/userDetails";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";

const viewSmartUsers:Router = express.Router();

viewSmartUsers.get('/viewUsers', async(req:Request, res:Response):Promise<void>=>{
    
    try {
        
    //accessing users form database
    const userRepositery = smartConnection.getRepository(smartUser);
    const users =await userRepositery.find();
    if (users.length === 0) {
        res.status(StatusCodes.NO_CONTENT).json({message: "No users found"});
        return;
    }
    res.status(200).json({
        success: true,
        data:users
    });
    return;
    } catch (error) {
        logger.error("view user error : ",error);
        res.status(500).json({message: "fail to view users, error during view users"});
        return;
    }

});

export default viewSmartUsers;