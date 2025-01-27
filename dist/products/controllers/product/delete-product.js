"use strict";
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
const deleteProduct = express_1.default.Router();
deleteProduct.delete("/delete-Product", async (req, res) => {
    const { adminId, productId, productName } = req.body;
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const getProductRepo = db_connection_config_1.smartConnection.getRepository(produstDetails_1.smartProduct);
        const isAdminLoggedIn = await getAdminRepo.findOne({ where: { adminId } });
        if (!isAdminLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "you are not logged in, login first" });
            return;
        }
        const isproductExist = await getProductRepo.findOne({ where: { productId, productName } });
        if (!isproductExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "product is not exist" });
            return;
        }
        await getProductRepo.delete({ productId });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "product delete successfully" });
    }
    catch (error) {
        logger_1.default.error("update product error :", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "update product error :", error });
    }
});
exports.default = deleteProduct;
