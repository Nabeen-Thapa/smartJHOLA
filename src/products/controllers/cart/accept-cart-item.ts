import express, { Request, Response, Router } from "express";

const acceptCartItem :Router = express.Router();

acceptCartItem.post("/accept-item", async(req:Request, res:Response):Promise<void>=>{

});

export default acceptCartItem;