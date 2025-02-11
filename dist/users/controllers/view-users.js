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
const db_connection_config_1 = require("../../common/db/db-connection-config");
const userDetails_1 = require("../entities/userDetails");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../common/utils/logger"));
const adminDetails_1 = require("../../admin/entities/adminDetails");
const check_login_1 = require("../../common/middleware/check-login");
const check_registration_1 = require("../../common/middleware/check-registration");
const viewSmartUsers = express_1.default.Router();
viewSmartUsers.get('/view', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "enter username and password" });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        (0, check_registration_1.isRegister)(username, res);
        (0, check_login_1.isLoggedIn)(username, res);
        const admin = yield getAdminRepo.findOne({ where: { username, password } });
        if (username !== (admin === null || admin === void 0 ? void 0 : admin.username) && password !== (admin === null || admin === void 0 ? void 0 : admin.password)) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "username and password are not match" });
            return;
        }
        //accessing users form database
        const userRepositery = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
        const users = yield userRepositery.find();
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
}));
exports.default = viewSmartUsers;
