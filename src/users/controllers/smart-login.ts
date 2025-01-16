import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../entities/userDetails";
import {generateAccessToken} from "../utils/accressTokenGenerator"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../../common/utils/logger";
import { smartToken } from "../entities/smartUserToken";
const smartUserLogin : Router = express.Router();

interface loginTypes{
    username:string,
    password:string
}
smartUserLogin.post("/user-login", async(req: Request, res:Response):Promise<void>=>{
    const {username, password}:loginTypes = req.body; 
    if(!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json({message : "username and password required"});
        return;
    }
    try {
        const getdbUserDetails = smartConnection.getRepository(smartUser);
    const isRegisteredUser = await getdbUserDetails.findOne({where : {username},});

    if(!isRegisteredUser){
        res.status(StatusCodes.CONFLICT).json({message : "invalid username or password"});
        return;
    }
    const isPasswordMatch = await bcrypt.compare(password, isRegisteredUser.password);
    if(!isPasswordMatch){
        res.status(StatusCodes.BAD_REQUEST).json({Message : "invalid password"});
        return;
    }

    const userId = isRegisteredUser.userId;
    const userEmail = isRegisteredUser.email;
    const registeredPwd = isRegisteredUser.password;
    const smartJwtData = {
        username : username,userId:userId, password:password
    }
    const accessToken = generateAccessToken(smartJwtData);
    const envRefreshToken :any = process.env.REFRESH_KEY;
    const refreshToken = jwt.sign(smartJwtData, envRefreshToken);
    const userTokens ={
        userId: userId,
        username:username,
        password:registeredPwd,
        userEmail: userEmail,
        accessToken: accessToken,
        refreshToken: refreshToken
    }

    const getdbToken = smartConnection.getRepository(smartToken);
    const isUserLoggedIn = await getdbToken.findOne({where: {userId}});
    if(isUserLoggedIn){
        res.status(StatusCodes.CONFLICT).json({Message : "user is already logged in"});
        return;
    }
    const newUserToken = await getdbToken.create(userTokens);
    await getdbToken.save(newUserToken);
    res.json({
        message: "login successfully",
        accessToken: accessToken,
        refreshToken: refreshToken
    });
    } catch (error) {
        logger.error("login error : ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during login." });
    }

});

export default smartUserLogin;