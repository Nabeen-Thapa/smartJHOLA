import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartAdmin } from "../entities/adminDetails";
import { smartToken } from "../../users/entities/smartUserToken";
import logger from "../../common/utils/logger";

const updateAdmin: Router = express.Router();

updateAdmin.patch("/update", async(req:Request, res:Response):Promise<void>=>{
    const {adminId, name,username,email, phone} =req.body;
    
    if(!adminId){
        res.status(StatusCodes.BAD_REQUEST).json({message:"admin id is requred"});
        return;
    }

    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
    const getTokenRepo = smartConnection.getRepository(smartToken);

    const isAdminExist = await getAdminRepo.findOne({where : {adminId}});
    if(!isAdminExist){
        res.status(StatusCodes.NOT_FOUND);
        return;
    }

    const isAdminLoggedIn = await getTokenRepo.findOne({where : {userId:adminId }});
    if(!isAdminLoggedIn){
        res.status(StatusCodes.NOT_FOUND);
        return;
    }

    const updateOldAdmin = {
        name,
        username,
        email,
        phone
    }
    await getAdminRepo.update({adminId}, updateOldAdmin);
    res.status(StatusCodes.OK);
    
    } catch (error) {
        logger.error("update admin error : ", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : "admin update error", error})
    }
});

export default updateAdmin;