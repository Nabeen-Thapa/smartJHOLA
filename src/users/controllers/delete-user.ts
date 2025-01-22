import express, { Request, Response, Router } from "express";

const deleteUser :Router = express.Router();

deleteUser.delete("/delete-user", async(req:Request, res:Response):Promise<void>=>{

})

export default deleteUser;