import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartAdmin } from "../entities/adminDetails";
import { isLoggedIn } from "../../common/middleware/check-login";
import { isRegister } from "../../common/middleware/check-registration";

const viewAdmin: Router = express.Router();

viewAdmin.get("/view-admin", async(req:Request, res:Response):Promise<void>=>{
    const {username} = req.body;

    if(!username){
        res.status(StatusCodes.BAD_REQUEST);
        return;
    }
    try {
         const getAdminRepo = smartConnection.getRepository(smartAdmin);
       
        isRegister(username, res); //check register or not
        isLoggedIn(username,req, res); //check logged or not

        const adminDetail = await getAdminRepo.find();
        res.status(StatusCodes.OK).json({
            success:true,
            data :adminDetail
        });

    } catch (error) {
        logger.error("error duirng view admin: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

export default viewAdmin;