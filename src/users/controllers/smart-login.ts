import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartUser } from "../entities/userDetails";

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
    const getdbUserDetails = smartConnection.getRepository(smartUser);
    const isRegisteredUser = await getdbUserDetails.findOne({where : {username, password},});

    if(!isRegisteredUser){
        res.status(StatusCodes.CONFLICT).json({message : "invalid username or password"});
        return;
    }
    
});

export default smartUserLogin;