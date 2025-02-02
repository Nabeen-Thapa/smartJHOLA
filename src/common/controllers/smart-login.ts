import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../db/db-connection-config";
import { smartUser } from "../../users/entities/userDetails";
import { generateAccessToken } from "../../users/utils/accressTokenGenerator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { smartToken } from "../../users/entities/smartUserToken";
import { smartAdmin } from "../../admin/entities/adminDetails";
import session from "express-session";
import { isRegister } from "../middleware/check-registration";
import { isLoggedIn } from "../middleware/check-login";
import { uploadLoggedInDataInRedis } from "../utils/update-data-in-redis";
import redisClient from "../db/redisClient";

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
            res.status(StatusCodes.BAD_REQUEST).json({ message: "This user is already logged in." });
            return;
        }

        isLoggedIn(username, res);
        await isRegister(username, res);

        let getdbUserDetails: any;
        if (userType === "admin") {
            getdbUserDetails = smartConnection.getRepository(smartAdmin);
        } else {
            getdbUserDetails = smartConnection.getRepository(smartUser);
        }

        const isRegisteredUser = await getdbUserDetails.findOne({ where: { username } });

        if (!isRegisteredUser) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
            return;
        }

        let isPasswordMatch: boolean;
        if (userType === "admin") {
            isPasswordMatch = password === isRegisteredUser.password;
        } else {
            isPasswordMatch = await bcrypt.compare(password, isRegisteredUser.password);
        }

        if (!isPasswordMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid password" });
            return;
        }

        const userId = userType === "admin" ? isRegisteredUser.adminId : isRegisteredUser.userId;
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
            message: "Login successful",
            name: username,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        logger.error("Login error: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during login." });
    }
});

export default smartUserLogin;
