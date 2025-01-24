import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../db/db-connection-config";
import { smartUser } from "../../users/entities/userDetails";
import {generateAccessToken} from "../../users/utils/accressTokenGenerator"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { smartToken } from "../../users/entities/smartUserToken";
import { smartAdmin } from "../../admin/entities/adminDetails";
//import sessionData from "../middleware/session-data-store";
import session from "express-session";
import sessionData from "../middleware/session-data-store";
const smartUserLogin : Router = express.Router();

smartUserLogin.use(sessionData);
interface loginTypes{
    username:string,
    password:string,
    userType:string
}
smartUserLogin.post("/login", async(req: Request, res:Response):Promise<void>=>{
    const {username, password, userType}:loginTypes = req.body; 
    if(!username || !password || !userType){
        res.status(StatusCodes.BAD_REQUEST).json({message : "username and password required"});
        return;
    }
    try {
        let getdbUserDetails:any;
        if(userType === "admin"){
             getdbUserDetails = smartConnection.getRepository(smartAdmin);
        }else{
            getdbUserDetails = smartConnection.getRepository(smartUser);
        }
    const isRegisteredUser = await getdbUserDetails.findOne({where : {username},});

    if(!isRegisteredUser){
        res.status(StatusCodes.CONFLICT).json({message : "invalid username or password"});
        return;
    }
    let isPasswordMatch: boolean;
    if(userType === "admin"){
        isPasswordMatch = password === isRegisteredUser.password;
    }else{
        isPasswordMatch = await bcrypt.compare(password, isRegisteredUser.password);
    }
    if(!isPasswordMatch){
        res.status(StatusCodes.BAD_REQUEST).json({Message : "invalid password"});
        return;
    }

    const userId = userType === "admin" ? isRegisteredUser.adminId : isRegisteredUser.userId;
    const userEmail = isRegisteredUser.email;
   
    const registeredPwd = isRegisteredUser.password;
    const smartJwtData = {
        username,
        userId, 
        password
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
    const isUserLoggedIn = await getdbToken.findOne({where: {userId, username}});
    if(isUserLoggedIn){
        res.status(StatusCodes.CONFLICT).json({Message : "user is already logged in"});
        return;
    }
    const newUserToken = getdbToken.create(userTokens);
    await getdbToken.save(newUserToken);

   // Store username and userId in session
//    req.session.username = username;
//    req.session.userId = userId;
//    //set cookie
//    res.cookie("username", username, {
//      httpOnly: true,
//      maxAge: 24 * 60 * 60 * 1000, // 1 day
//    });

    res.json({
        message: "login successfully",
        name : username,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
    } catch (error) {
        logger.error("login error : ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during login." });
    }

});

export default smartUserLogin;