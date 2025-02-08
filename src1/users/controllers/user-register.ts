import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../entities/userDetails";
import { isValidEmail } from "../../common/middleware/valid-email";
import { isValidNumber } from "../../common/middleware/valid-phoneNumber";
import { generateUniquePwd } from "../../common/utils/otp-generator";
import bcrypt from "bcrypt";
import multer from "multer";
import logger from "../../common/utils/logger";
import { sendEmail } from "../../common/utils/email-sender";
import { userValidationSchema } from "../utils/user-register-validate";
import { equal } from "joi";

const userRegister: Router = express.Router();
const upload = multer({ dest: 'uploads/' });
//user inputes type
interface userTypes {
    name: string,
    username: string,
    password: string,
    email: string,
    phone: string,
    age: number,
    gender: string,
    image?: string | null
}
userRegister.post("/register",upload.single('image'), async (req: Request, res: Response): Promise<void> => {
    const { name, username, password, email, phone, age, gender }: userTypes = req.body;
    const image = req.file ? req.file.filename : null;  // Get the uploaded image filename

    if (!image) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'Image is required.' });
        return;
    }
    if (!name || !username || !email || !phone) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "name, username, email phone number are required" });
            return;
    }
    
    const {error } = userValidationSchema.validate(req.body);
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "user registration Validation failed",
        details: error.details.map((detail) => detail.message),
      });
      return;
    }
    try {
        if (!isValidEmail(email)) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "email is not valid" });
            return;
        }
        if (!isValidNumber(phone)) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "phone number is not valid" });
            return;
        }
        
        const getdbUserDetails = smartConnection.getRepository(smartUser);
        const isExistUser = await getdbUserDetails.findOne({ where: { email, phone, username }, });
        if (isExistUser) {
            res.status(StatusCodes.CONFLICT).json({ message: "this user is already exist" });
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
            age,
            image :undefined,
        });
        await getdbUserDetails.save(addNewUser);

        res.status(StatusCodes.CREATED).json({ message: "Registration successful check your email for the password" });

         //send mail
         try {
            await sendEmail({
                to: email,
                subject: "smartJHOLA password",
                text: `Welcome to smartJHOLA,buy our products get your products.\n\n
        Your username: ${username}
        Your password is: ${password}\n\n
        Please use this OTP to log in and  reset your password.\n`,
            });
        } catch (error) {
            if (error instanceof Error) {
                // Check if the error is an instance of Error
                logger.error("Email sending failed:", error.message);
                res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
                return;
            } else {
                // Handle non-Error cases (unlikely, but good practice)
                logger.error("Unexpected email sending error:", error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Unexpected error occurred while sending email." });
                return;
            }
        }
    } catch (error) {
        logger.error("error duirng registration: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
})

export default userRegister;