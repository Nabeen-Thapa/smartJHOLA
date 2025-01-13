import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../db/userDetails";
import { isValidEmail } from "../../common/middleware/valid-email";
import { isValidNumber } from "../../common/middleware/valid-phoneNumber";
import { generateUniquePwd } from "../../common/utils/otp-generator";
import bcrypt from "bcrypt";
import logger from "../../common/utils/logger";

const userRegister: Router = express.Router();

//user inputes type
interface userTypes {
    name: string,
    username: string,
    password: string,
    email: string,
    phone: string,
    age: number,
    gender: string,
    image: string
}
userRegister.post("/", async (req: Request, res: Response): Promise<void> => {
    const { name, username, password, email, phone, age, gender, image }: userTypes = req.body;

    if (!name && !username && !email && !phone) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "name, username, email phone number are required" });
    }
    try {
        if (!isValidEmail(email)) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "email is not valid" });
        }
        if (!isValidNumber(phone)) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "phone number is not valid" });
        }
        const getdbUserDetails = smartConnection.getRepository(smartUser);
        const isExistUser = await getdbUserDetails.findOne({ where: { email, phone, username }, });
        if (isExistUser) {
            res.status(StatusCodes.CONFLICT).json({ message: "this user is laready exist" });
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
            image,
        });
        await getdbUserDetails.save(addNewUser);

        res.status(StatusCodes.CREATED).json({ message: "Registration successful check your eail for the password" });
    } catch (error) {
        logger.error("error duirng registration: ",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
})

export default userRegister;