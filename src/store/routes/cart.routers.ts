import express, { Router } from "express";
import { addToCartController, removeCartItemController, viewCartController } from "../controllers/cart.controller";

const CartRouter:Router = express.Router();

CartRouter.post("/add", addToCartController);
CartRouter.post("/view", viewCartController);
CartRouter.post("/remove", removeCartItemController);

export default CartRouter;
