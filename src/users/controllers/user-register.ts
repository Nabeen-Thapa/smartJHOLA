import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../entities/userDetails";
import { generateUniquePwd } from "../../common/utils/otp-generator";
import bcrypt from "bcrypt";
import multer from "multer";
import logger from "../../common/utils/logger";
import { sendEmail } from "../../common/utils/email-sender";
import { userValidationSchema } from "../utils/user-register-validate";
import { errorMessage } from "../../types/errorMessage.enum";
import { userRegisterEmail } from "../../store/utils/userRegisterEmail.emitter";

const userRegister: Router = express.Router();
//user inputes type
interface userTypes {
    name: string,
    username: string,
    password: string,
    email: string,
    phone: string,
    age: number,
    gender: string
}
userRegister.post("/register", async (req: Request, res: Response): Promise<void> => {
    const { name, username, email, phone, age, gender }: userTypes = req.body;

    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "user registration Validation failed",
            details: error.details.map((detail) => detail.message),
        });
        return;
    }
    try {
        const getdbUserDetails = smartConnection.getRepository(smartUser);
        const isExistUser = await getdbUserDetails.findOne({ where: { email } });
        if (isExistUser) {
            res.status(StatusCodes.CONFLICT).json({ message: errorMessage.ALREADY_EXIST });
            return;
        }

        const password = await generateUniquePwd();
        const hashedPassword = await bcrypt.hash(password, 10);

        const addNewUser = getdbUserDetails.create({
            name,
            username,
            password: hashedPassword,
            email,
            phone,
            gender,
            age
        });
        await getdbUserDetails.save(addNewUser);

        res.status(StatusCodes.CREATED).json({ message: "Registration successful check your email for the password" });

        //send mail
        const to = email;
       const subject= "smartJHOLA password";
       const  text= `Welcome to smartJHOLA,buy our products get your products.\n\n`;
        userRegisterEmail.emit("sendRegisterMail", {to, subject, text, username, password})
        // try {
        //     await sendEmail({
        //         to: email,
        //         subject: "smartJHOLA password",
        //         text: `Welcome to smartJHOLA,buy our products get your products.\n\n
        // Your username: ${username}
        // Your password is: ${password}\n\n
        // Please use this OTP to log in and  reset your password.\n`,
        //     });
        // } catch (error) {
        //     if (error instanceof Error) {
        //         // Check if the error is an instance of Error
        //         logger.error("Email sending failed:", error.message);
        //         res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        //         return;
        //     } else {
        //         // Handle non-Error cases (unlikely, but good practice)
        //         logger.error("Unexpected email sending error:", error);
        //         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Unexpected error occurred while sending email." });
        //         return;
        //     }
        // }
        
    } catch (error) {
        logger.error("error duirng registration: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
})

export default userRegister;