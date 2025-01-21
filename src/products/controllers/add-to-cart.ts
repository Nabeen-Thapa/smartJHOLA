import express, { Request, Response, Router } from "express";
import { smartConnection } from "../../common/db/db-connection-config";
import { addToCart } from "../entities/AddToCart";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { smartUser } from "../../users/entities/userDetails";
import { smartProduct } from "../entities/produstDetails";

const addToProductCart: Router = express.Router();
interface AddToCartTypes {
    user: smartUser;
    product: smartProduct;
    quantity: number;
    price: number;
    total_price: number;
    added_at: Date;
}
addToProductCart.post("/add-to-cart", async (req: Request, res: Response): Promise<void> => {
    const { user, product, quantity, price, total_price, added_at }:AddToCartTypes = req.body;

    try {
        const getAddToCartRepo = smartConnection.getRepository(addToCart);
    const isProductExistOfSameUser = await getAddToCartRepo.findOne({ where: { user, product }, })

    if (isProductExistOfSameUser) {
        res.status(StatusCodes.CONFLICT).json({ message: "you already have add this item" });
        return;
    }

    // add to caddToCart table
    const newCartItem = await getAddToCartRepo.create({
        user,
        product,
        quantity,
        price,
        total_price,
        added_at,
    });
    await getAddToCartRepo.save(newCartItem);
    res.status(StatusCodes.ACCEPTED);
    } catch (error) {
        logger.error("add to cart error:" , error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message :"add to cart error : ", error});
    }

});

export default addToProductCart;