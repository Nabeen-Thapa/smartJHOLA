import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { smartConnection } from "../../common/db/db-connection-config";
import bcrypt from "bcrypt";
import { isRegister } from "../../common/middleware/check-registration";
import { smartAdmin } from "../../admin/entities/adminDetails";
import redisClient from "../db/redisClient";
const changePassword:Router = express.Router();

changePassword.post("/changepwd", async(req:Request, res:Response):Promise<void>=>{
    const {username,  oldPassword, newPassword, confirmPassword} = req.body;

    if(!username || !oldPassword || !newPassword || !confirmPassword){
        res.status(StatusCodes.NO_CONTENT).json({message :"enter username, old passsowrd, new password and confirm"});
        return;
    }

    if(newPassword !== confirmPassword){
        res.status(StatusCodes.NOT_ACCEPTABLE).json({message :" new password and confirm not matched"});
        return;
    }
    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
        const isPasswordExist = await getAdminRepo.findOne({where : { password:oldPassword}});
        if(isPasswordExist?.username !== username){
            res.status(StatusCodes.NOT_FOUND).json({message :"username is not exist"});
            return;
        }
        if(!isPasswordExist){
            res.status(StatusCodes.NOT_FOUND).json({message :"old password not match"});
            return;
        }
        const hashedOtp = await bcrypt.hash(newPassword, 10);
        await getAdminRepo.update({ username }, { password: hashedOtp });

        //delete form readis
        const checkInRedis = await redisClient.keys('username:*');
        let redisData;
        let deleteFromRedis:any = null;

        for (const key of checkInRedis) {
            // Retrieve data from Redis and parse it
            const storedData = await redisClient.get(key);
            const parsedData = storedData ? JSON.parse(storedData) : null;
            //JSON.parse(storedData) to properly parse the stringified JSON when retrieving the data from Redis. because in redis data are stored using (JSON.stringify({...}))
            if (parsedData?.username === username) {
                redisData = key;
                deleteFromRedis = key;
                break; // Exit loop once token match is found
            }
        }
        //delete form redis if exist
        if (deleteFromRedis) {
            const delResult = await redisClient.del(deleteFromRedis);
            if (delResult) {
                logger.info(`Redis data for user removed successfully`);
            } else {
                logger.info(`Failed to delete Redis data for user `);
            }
        } else {
            logger.info("No matching Redis key found for the provided token");
        }



        res.status(StatusCodes.OK).json({ message: "successfully change password check your gmail for password and login to continue" });
        return;
    } catch (error) {
        logger.error("change password error : ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "change password"});
    }

})

export default changePassword;