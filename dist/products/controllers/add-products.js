"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const adminDetails_1 = require("../../admin/entities/adminDetails");
const db_connection_config_1 = require("../../common/db/db-connection-config");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../common/utils/logger"));
const produstDetails_1 = require("../entities/produstDetails");
const productsCategory_1 = require("../entities/productsCategory");
const addProduct = express_1.default.Router();
const productImageUpload = (0, multer_1.default)({ dest: '../product_images/' });
addProduct.post("/add-product", productImageUpload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, category, productName, price, brand, stockQuanity, productDescription, discount } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded image filename
    if (!image) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Image is required.' });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const getProductRepo = db_connection_config_1.smartConnection.getRepository(produstDetails_1.smartProduct);
        const getCategoryRepo = db_connection_config_1.smartConnection.getRepository(productsCategory_1.smartCategory);
        // const username = req.session.username;
        const isAdminLoggedIn = yield getAdminRepo.findOne({ where: { username }, });
        if (!isAdminLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "user on this username is not logged in, log in first" });
            return;
        }
        const productCategory = yield getCategoryRepo.findOne({
            where: { categoryName: category },
        });
        if (!productCategory) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "porduct category in not found" });
            return;
        }
        //check the same porduct is exist or not 
        const isProductExist = yield getProductRepo.findOne({ where: { productName, brand }, });
        if (isProductExist) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message: "this product is alrady exists" });
            return;
        }
        //const categoryId = productCategory.products;
        const newProduct = getProductRepo.create({
            category,
            productName,
            price,
            brand,
            stockQuanity,
            productDescription,
            discount,
            image
        });
        yield getProductRepo.save(newProduct);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED);
    }
    catch (error) {
        logger_1.default.error("add product error :", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "server error during adding products" });
    }
}));
exports.default = addProduct;
