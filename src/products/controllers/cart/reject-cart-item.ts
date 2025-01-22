import express, { Request, Response, Router } from "express";

const rejectCartItem :Router = express.Router();

rejectCartItem.post("/reject-item", async(req:Request, res:Response):Promise<void>=>{

});

export default rejectCartItem;