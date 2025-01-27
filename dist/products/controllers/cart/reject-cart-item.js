"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const db_connection_config_1 = require("../../../common/db/db-connection-config");
const AddToCart_1 = require("../../entities/AddToCart");
const rejectCartItem = express_1.default.Router();
rejectCartItem.post("/reject-item", async (req, res) => {
    const { productId, productName } = req.body;
    try {
        const getCartRepo = db_connection_config_1.smartConnection.getRepository(AddToCart_1.addToCart);
        const isExistProductInCart = await getCartRepo.findOne({ where: { product: productId } });
        if (!isExistProductInCart) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "product not found in the product cart" });
            return;
        }
        isExistProductInCart.status = "rejected";
        await getCartRepo.save(isExistProductInCart);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED);
    }
    catch (error) {
        logger_1.default.error("erro duirng accept cart item :", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.default = rejectCartItem;
