import express, { Request, Response, Router } from "express";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../entities/userDetails";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { isLoggedIn } from "../../common/middleware/check-login";
import { isRegister } from "../../common/middleware/check-registration";

const viewMyDetail:Router = express.Router();

viewMyDetail.get('/view', async(req:Request, res:Response):Promise<void>=>{
    const {username, password} =req.body;
    if(!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json({message : "enter username and password"});
        return;
    }   
    try {
       const getUserRepo = smartConnection.getRepository(smartUser);
       isRegister(username, res);
       isLoggedIn(username, res);

       const userDetails = await getUserRepo.findOne({where : {username, password}})
       if(username !== userDetails?.username && password !==userDetails?.password){
        res.status(StatusCodes.BAD_REQUEST).json({message :"username and password are not match"});
        return;
    }

    const users =await getUserRepo.find();
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
export default viewMyDetail;