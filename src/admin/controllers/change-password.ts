import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartAdmin } from "../entities/adminDetails";
import bcrypt from "bcrypt";
const forgetPassword:Router = express.Router();

forgetPassword.post("/changepwd", async(req:Request, res:Response):Promise<void>=>{
    const {email, oldPassword, newPassword, confirmPassword} = req.body;

    if(!email || !oldPassword || !newPassword || !confirmPassword){
        res.status(StatusCodes.NO_CONTENT).json({message :"enter email, old passsowrd, new password and confirm"});
        return;
    }

    if(newPassword !== confirmPassword){
        res.status(StatusCodes.NOT_ACCEPTABLE).json({message :" new password and confirm not matched"});
        return;
    }
    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
        const isPasswordExist = await getAdminRepo.findOne({where : { password:oldPassword}});
        if(isPasswordExist?.email !== email){
            res.status(StatusCodes.NOT_FOUND).json({message :"email is not exist"});
            return;
        }
        if(!isPasswordExist){
            res.status(StatusCodes.NOT_FOUND).json({message :"old password not match"});
            return;
        }
        const hashedOtp = await bcrypt.hash(newPassword, 10);
        await getAdminRepo.update({ email }, { password: hashedOtp });

        //delete form readis




        res.status(StatusCodes.OK).json({ message: "successfully forget password check your gmail for password and login to continue" });
        return;
    } catch (error) {
        logger.error("forget password error : ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "forget password"});
    }

})