import express, { Request, Response, Router } from "express";

const deleteAdmin: Router = express.Router();

deleteAdmin.delete("/delete", async(req:Request, res:Response):Promise<void>=>{
    
});

export default deleteAdmin;