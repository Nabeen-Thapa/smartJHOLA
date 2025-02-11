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
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const http_status_codes_1 = require("http-status-codes");
const db_connection_config_1 = require("../../../common/db/db-connection-config");
const adminDetails_1 = require("../../../admin/entities/adminDetails");
const produstDetails_1 = require("../../entities/produstDetails");
const updateProduct = express_1.default.Router();
updateProduct.patch("/update-product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId, username, productId, productName, price, brand, stockQuanity, productDescription, discount, image } = req.body;
    if (!username || !productName) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "all data are required" });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const getProductRepo = db_connection_config_1.smartConnection.getRepository(produstDetails_1.smartProduct);
        const isAdminLoggedIn = yield getAdminRepo.findOne({ where: { username, adminId } });
        if (!isAdminLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "you are not logged in, login first" });
            return;
        }
        const isProductExist = yield getProductRepo.findOne({ where: { productId, productName } });
        if (!isProductExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "product is not exist" });
            return;
        }
        //update product on db
        const updateproductRepo = {
            productName,
            price,
            brand,
            stockQuanity,
            productDescription,
            discount,
            image
        };
        yield getProductRepo.update({ productId }, updateproductRepo);
    }
    catch (error) {
        logger_1.default.error("update product error :", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "update product error :", error });
    }
}));
exports.default = updateProduct;
