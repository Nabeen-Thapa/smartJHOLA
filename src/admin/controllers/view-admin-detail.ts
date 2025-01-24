import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartAdmin } from "../entities/adminDetails";
import { smartToken } from "../../users/entities/smartUserToken";

const viewAdmin: Router = express.Router();

viewAdmin.get("/view-admin", async(req:Request, res:Response):Promise<void>=>{
    const {username} = req.body;

    if(!username){
        res.status(StatusCodes.BAD_REQUEST);
        return;
    }
    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
        const getTokenRepo = smartConnection.getRepository(smartToken);
        const isAdminRegistered = await getAdminRepo.findOne({where : {username}});
        if(!isAdminRegistered){
            res.status(StatusCodes.NOT_FOUND);
            return;
        }

        const isAdminLoggedIn = await getTokenRepo.find({where: {username}});
        if(!isAdminLoggedIn){
            res.status(StatusCodes.NOT_FOUND).json({Message: "you are not logged in"});
            return;
        }
        const adminDetail = await getAdminRepo.find();
        res.status(StatusCodes.OK).json({
            success:true,
            data :adminDetail;
        });

    } catch (error) {
        logger.error("error duirng view admin: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

export default viewAdmin;