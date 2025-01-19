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
const smartUserLogin : Router = express.Router();

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

   
    let userId:any;
    let userEmail :any;
    if(userType === "admin"){
         userId = isRegisteredUser.adminId;
     userEmail = isRegisteredUser.email;
    }else{
         userId = isRegisteredUser.userId;
         userEmail = isRegisteredUser.email;
    }
    if(!isPasswordMatch){
        res.status(StatusCodes.BAD_REQUEST).json({Message : "invalid password"});
        return;
    }
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
    const isUserLoggedIn = await getdbToken.findOne({where: {userId, username}});
    if(isUserLoggedIn){
        res.status(StatusCodes.CONFLICT).json({Message : "user is already logged in"});
        return;
    }
    const newUserToken = await getdbToken.create(userTokens);
    await getdbToken.save(newUserToken);
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