import express, { Request, Response, Router } from "express";
import { smartConnection } from "../../common/db/db-connection-config";
import { addToCart } from "../entities/AddToCart";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";

const addToProductCart: Router = express.Router();

addToProductCart.post("/add-to-cart", async (req: Request, res: Response): Promise<void> => {
    const { user, product, qunatity, price, total_price, added_at } = req.body;

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
        qunatity,
        price,
        total_price,
        added_at,
    });
    } catch (error) {
        logger.error("add to cart error:" , error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message :"add to cart error : ", error});
    }

});

export default addToProductCart;