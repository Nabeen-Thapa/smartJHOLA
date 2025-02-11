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
const db_connection_config_1 = require("../../../common/db/db-connection-config");
const AddToCart_1 = require("../../entities/AddToCart");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const acceptCartItem = express_1.default.Router();
acceptCartItem.post("/accept-item", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, productName } = req.body;
    try {
        const getCartRepo = db_connection_config_1.smartConnection.getRepository(AddToCart_1.addToCart);
        const isExistProductInCart = yield getCartRepo.findOne({ where: { product: productId } });
        if (!isExistProductInCart) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "product not found in the product cart" });
            return;
        }
        isExistProductInCart.status = "verified";
        yield getCartRepo.save(isExistProductInCart);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED);
    }
    catch (error) {
        logger_1.default.error("erro duirng accept cart item :", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}));
exports.default = acceptCartItem;
