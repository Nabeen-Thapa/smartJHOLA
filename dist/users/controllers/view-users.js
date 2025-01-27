"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connection_config_1 = require("../../common/db/db-connection-config");
const userDetails_1 = require("../entities/userDetails");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../common/utils/logger"));
const adminDetails_1 = require("../../admin/entities/adminDetails");
const check_login_1 = require("../../common/middleware/check-login");
const check_registration_1 = require("../../common/middleware/check-registration");
const viewSmartUsers = express_1.default.Router();
viewSmartUsers.get('/view', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "enter username and password" });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        (0, check_registration_1.isRegister)(username, res);
        (0, check_login_1.isLoggedIn)(username, res);
        const admin = await getAdminRepo.findOne({ where: { username, password } });
        if (username !== admin?.username && password !== admin?.password) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "username and password are not match" });
            return;
        }
        //accessing users form database
        const userRepositery = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
        const users = await userRepositery.find();
        if (users.length === 0) {
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: "No users found" });
            return;
        }
        res.status(200).json({
            success: true,
            data: users
        });
        return;
    }
    catch (error) {
        logger_1.default.error("view user error : ", error);
        res.status(500).json({ message: "fail to view users, error during view users" });
        return;
    }
});
exports.default = viewSmartUsers;
