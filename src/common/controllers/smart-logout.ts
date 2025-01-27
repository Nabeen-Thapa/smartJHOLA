import express, { Request, Response, Router } from "express";
import { smartConnection } from "../db/db-connection-config";
import { smartToken } from "../../users/entities/smartUserToken";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";



const smartUserLogout :Router = express.Router();

smartUserLogout.post("/logout", async(req:Request, res:Response):Promise<void>=>{
    const {refreshToken} = req.body;

    if(!refreshToken){
        res.status(StatusCodes.BAD_REQUEST).json({message: "enter you refresh token"});
    }
    try {
        const getdbToken = smartConnection.getRepository(smartToken);
    const isTokenExists = await getdbToken.findOne({where: {refreshToken},});
    if(!isTokenExists){
        res.status(StatusCodes.NOT_FOUND).json({message : "you are not logged in"});
        return;
    }

    //destroy from session
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Could not log out');
        }
        res.clearCookie('username');  // Clear the cookie
        res.send('Logged out successfully');
      });

    const userId = isTokenExists.userId;
    await getdbToken.delete(userId);
    res.status(StatusCodes.NO_CONTENT).json({message : "delete success"})
    return;
    } catch (error) {
        logger.error("logout error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during logout." });
    }
});

export default smartUserLogout;