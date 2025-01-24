import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartAdmin } from "../entities/adminDetails";
import { getMaxListeners } from "events";
import { generateUniquePwd } from "../../common/utils/otp-generator";
import { sendEmail } from "../../common/utils/email-sender";
import bcrypt from "bcrypt";
const forgetPassword:Router = express.Router();

forgetPassword.post("/forgetpwd", async(req:Request, res:Response):Promise<void>=>{
    const {email} = req.body;

    if(!email){
        res.status(StatusCodes.NO_CONTENT).json({message :"enter email"});
        return;
    }
    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
        const isEmailExist = await getAdminRepo.findOne({where : {email}});
        if(!isEmailExist){
            res.status(StatusCodes.NOT_FOUND).json({message :"emai is not exist"});
            return;
        }
        const username = isEmailExist.username;

        const otp =await generateUniquePwd();
        try {
            await sendEmail({
                to:email,
                subject:"Password Reset",
            text: `The password for your Typescript API account.\n\n
            Your username: ${username}\n
            Your OTP is: ${otp}\n\n
            Please use this OTP to log in or reset your password.\n`,
            })
        } catch (error) {
            if (error instanceof Error) {
                // Check if the error is an instance of Error
                logger.error("Email sending failed:", error.message);
                res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
              } else {
                // Handle non-Error cases (unlikely, but good practice)
                logger.error("Unexpected email sending error:", error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Unexpected error occurred while sending email." });
              }
              return;
        }
        const hashedOtp = await bcrypt.hash(otp, 10);
        await getAdminRepo.update({ email }, { password: hashedOtp });

        //delete form readis




        res.status(StatusCodes.OK).json({ message: "successfully forget password check your gmail for password and login to continue" });
        return;
    } catch (error) {
        logger.error("forget password error : ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "forget password"});
    }

})