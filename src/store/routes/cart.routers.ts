import express, { Router } from "express";
import { addToCartController, removeCartItemController, viewCartController } from "../controllers/cart.controller";

const CartRouter:Router = express.Router();

CartRouter.post("cart/add", addToCartController);
CartRouter.post("cart/view", viewCartController);
CartRouter.post("cart/remove", removeCartItemController);

export default CartRouter;
