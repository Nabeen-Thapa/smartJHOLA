import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../entities/userDetails";

import bcrypt from "bcrypt";
const smartUserLogin : Router = express.Router();

interface loginTypes{
    username:string,
    password:string
}
smartUserLogin.post("/user-login", async(req: Request, res:Response):Promise<void>=>{
    const {username, password}:loginTypes = req.body; 
    if(!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json({message : "username and password rewuired"});
        return;
    }
    try {
        const getdbUserDetails = smartConnection.getRepository(smartUser);
    const isRegisteredUser = await getdbUserDetails.findOne({where : {username, password},});

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
    const smartJwtData = {
        username : username,userId:userId, password:password
    }
    const accessToken = generateAccessToken(smartJwtData);


    } catch (error) {
        
    }

});

export default smartUserLogin;