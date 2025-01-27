"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connection_config_1 = require("../../../common/db/db-connection-config");
const produstDetails_1 = require("../../entities/produstDetails");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const viewProduct = express_1.default.Router();
viewProduct.get("/view-product", async (req, res) => {
    try {
        const getProductRepo = db_connection_config_1.smartConnection.getRepository(produstDetails_1.smartProduct);
        const products = await getProductRepo.find();
        if (products.length === 0) {
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: "No porducts found" });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            data: products
        });
    }
    catch (error) {
        logger_1.default.error("view product error:", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "view product error: ", error });
    }
});
exports.default = viewProduct;
