"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const db_connection_config_1 = require("../../common/db/db-connection-config");
const adminDetails_1 = require("../entities/adminDetails");
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const logger_1 = __importDefault(require("../../common/utils/logger"));
const updateAdmin = express_1.default.Router();
updateAdmin.patch("/update", async (req, res) => {
    const { adminId, name, username, email, phone } = req.body;
    if (!adminId) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "admin id is requred" });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const getTokenRepo = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isAdminExist = await getAdminRepo.findOne({ where: { adminId } });
        if (!isAdminExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
            return;
        }
        const isAdminLoggedIn = await getTokenRepo.findOne({ where: { userId: adminId } });
        if (!isAdminLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
            return;
        }
        const updateOldAdmin = {
            name,
            username,
            email,
            phone
        };
        await getAdminRepo.update({ adminId }, updateOldAdmin);
        res.status(http_status_codes_1.StatusCodes.OK);
    }
    catch (error) {
        logger_1.default.error("update admin error : ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "admin update error", error });
    }
});
exports.default = updateAdmin;
