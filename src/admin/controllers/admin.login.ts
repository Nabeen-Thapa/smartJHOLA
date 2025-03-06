import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../../users/utils/accressTokenGenerator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import session from "express-session";
import { uploadLoggedInDataInRedis } from "../../common/utils/update-data-in-redis";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartAdmin } from "../entities/adminDetails";
import { isRegister } from "../../common/middleware/check-registration";
import { smartToken } from "../../users/entities/smartUserToken";
import redisClient from "../../common/db/redisClient";
import logger from "../../common/utils/logger";

const smartUserLogin: Router = express.Router();

interface LoginTypes {
    username: string;
    password: string;
    userType: string;
}

smartUserLogin.post("/login", async (req: Request, res: Response): Promise<void> => {
    const { username, password, userType }: LoginTypes = req.body;

    if (!username || !password || !userType) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Username and password required" });
        return;
    }

    try {
        const isUserLoggedInRedis = await uploadLoggedInDataInRedis(username);
        if (isUserLoggedInRedis) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "This user is already logged in" });
            return;
        }

        //isLoggedIn(username, res);
        await isRegister(username, res);
          const getdbUserDetails = smartConnection.getRepository(smartAdmin);
        

        const isRegisteredUser = await getdbUserDetails.findOne({ where: { username } });

        if (!isRegisteredUser) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
            return;
        }
         const isPasswordMatch = password === isRegisteredUser.password;
        

        if (!isPasswordMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid password" });
            return;
        }

        const userId =  isRegisteredUser.adminId;
        const userEmail = isRegisteredUser.email;

        const smartJwtData = {
            username,
            userId,
            password,
        };

        const accessToken = generateAccessToken(smartJwtData);
        const envRefreshToken: any = process.env.REFRESH_KEY;
        const refreshToken = jwt.sign(smartJwtData, envRefreshToken);

        const userTokens = {
            userId,
            username,
            password: isRegisteredUser.password,
            userEmail,
            accessToken,
            refreshToken,
        };

       

        const getdbToken = smartConnection.getRepository(smartToken);
        const isUserLoggedIn = await getdbToken.findOne({ where: { userId, username } });

        if (isUserLoggedIn) {
            res.status(StatusCodes.CONFLICT).json({ message: "User is already logged in" });
            return;
        }

        const newUserToken = getdbToken.create(userTokens);
        await getdbToken.save(newUserToken);

        // Check if session is available
        if (!req.session) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Session is unavailable" });
            return;
        }

        // Store data in session
        (req.session as any).userId = userId;
        (req.session as any).username = username;
        (req.session as any).userEmail = userEmail;

        // Store session data in cookies
        res.cookie("username", username, { httpOnly: true, maxAge: 3600000 });
        res.cookie("userId", userId, { httpOnly: true, maxAge: 3600000 });

        res.json({
            session :req.session,
            message: "Login successful",
            name: username,
            accessToken,
            refreshToken,
        });
         // Store user data in Redis
         await redisClient.set(
            `username:${username}`,
            JSON.stringify({
                userId,
                userEmail,
                username,
                accessToken,
                refreshToken,
            }),
            { EX: 60 * 60 * 24 * 10 } // Expiry time: 10 days
        );
    } catch (error) {
        logger.error("Login error: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during login." });
    }
});

export default smartUserLogin;
