import express, { Request, Response, Router } from "express";

const updateUser :Router = express.Router();

updateUser.patch("/update-user", async(req:Request, res:Response):Promise<void>=>{

})

export default updateUser;