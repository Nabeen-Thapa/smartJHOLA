import express, { Request, Response, Router } from "express";

const smartLogout:Router = express.Router();

smartLogout.post("/logout", async(req:Request, res:Response):Promise<void>=>{
    
});

export default smartLogout;