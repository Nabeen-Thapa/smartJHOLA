import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const viewAdmin: Router = express.Router();

viewAdmin.get("/view-admin", async(req:Request, res:Response):Promise<void>=>{
    const {username} = req.body;

    if(!username){
        res.status(StatusCodes.BAD_REQUEST);
        return;
    }

});

export default viewAdmin;