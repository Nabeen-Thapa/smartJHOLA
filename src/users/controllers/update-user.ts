import express, { Request, Response, Router } from "express";
import logger from "../../common/utils/logger";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../entities/userDetails";
import { isValidNumber } from "../../common/middleware/valid-phoneNumber";
import { isValidEmail } from "../../common/middleware/valid-email";
import { userValidationSchema } from "../utils/user-register-validate";

const updateUser :Router = express.Router();

updateUser.patch("/update", async(req:Request, res:Response):Promise<void>=>{
    const { name, username, password, email, phone, age, gender } = req.body;
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
        const isExistUser = await getdbUserDetails.findOne({ where: {username},});
        if (isExistUser) {
            res.status(StatusCodes.CONFLICT).json({ message: "this user is already exist" });
            return;
        }
       
        const addNewUser = getdbUserDetails.create({
            name,
            username,
            password,
            email,
            phone,
            gender,
            age
        });
        await getdbUserDetails.save(addNewUser);

        res.status(StatusCodes.CREATED).json({ message: "update successful check your email for the password" });
    } catch (error) {
        logger.error("error duirng user update: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
})

export default updateUser;