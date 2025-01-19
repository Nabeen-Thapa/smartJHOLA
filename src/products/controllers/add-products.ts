import { promises } from "dns";
import express, { Request, Response, Router } from "express";
import multer from "multer";
import { smartAdmin } from "../../admin/entities/adminDetails";
import { smartConnection } from "../../common/db/db-connection-config";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger";
import { smartProduct } from "../entities/produstDetails";
import { smartCategoy } from "../entities/productsCategory";
const addProduct: Router = express.Router();
const productImageUpload = multer({ dest: '../product_images/' });

interface addProductTypes {
    username: string,
    category: string,
    productName: string,
    price: string,
    brand: string,
    stockQuanity: number,
    productDescription: string,
    discount: string
}
addProduct.post("/add-product", productImageUpload.single('porductImage'), async (req: Request, res: Response): Promise<void> => {
    const { username, category, productName, price, brand, stockQuanity, productDescription, discount }: addProductTypes = req.body;

    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
        const getProductRepo = smartConnection.getRepository(smartProduct);
        const getCategoryRepo = smartConnection.getRepository(smartCategoy);

        const isAdminLoggedIn = await getAdminRepo.findOne({ where: { username }, });
        if (!isAdminLoggedIn) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "user on this username is not logged in, log in first" });
            return;  
        }
        const productCategory = await getProductRepo.findOne({where : {categoryId :category},});
        if(!productCategory){
            res.status(StatusCodes.NOT_FOUND).json({message: "porduct category in not found"});
            return;
        }
        const newProduct = getAdminRepo.create({
            category: productCategory,
            productName,
            price,
            brand,
            stockQuanity,
            productDescription,
            discount
        })

    } catch (error) {
        logger.error("add product error :", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "server error during adding products" });
    }



});

export default addProduct;