import express, { Request, Response, Router } from "express";

const deleteProduct :Router = express.Router();

deleteProduct.delete("/delete-Product", async(req:Request, res:Response):Promise<void>=>{

})

export default deleteProduct;