"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const http_status_codes_1 = require("http-status-codes");
const db_connection_config_1 = require("../../../common/db/db-connection-config");
const produstDetails_1 = require("../../entities/produstDetails");
const smartUserToken_1 = require("../../../users/entities/smartUserToken");
const viewCart = express_1.default.Router();
viewCart.get("/view-cart", async (req, res) => {
    const { adminId, username, productId, prodictName, quantity } = req.body;
    try {
        const getProductRepo = db_connection_config_1.smartConnection.getRepository(produstDetails_1.smartProduct);
        const getTokenRepo = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isAdminLoggedIn = getTokenRepo.findOne({ where: { userId: adminId, username } });
        if (!isAdminLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "you are not logged in" });
            return;
        }
        //get cart items
        const cartItems = await getProductRepo.find();
        if (cartItems.length === 0) {
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: "No catagories found" });
            return;
        }
        //view items
        res.status(200).json({
            success: true,
            data: cartItems
        });
    }
    catch (error) {
        logger_1.default.error("view cart error: ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.default = viewCart;
