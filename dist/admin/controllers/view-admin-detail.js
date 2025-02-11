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
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../common/utils/logger"));
const db_connection_config_1 = require("../../common/db/db-connection-config");
const adminDetails_1 = require("../entities/adminDetails");
const check_login_1 = require("../../common/middleware/check-login");
const check_registration_1 = require("../../common/middleware/check-registration");
const viewAdmin = express_1.default.Router();
viewAdmin.get("/view-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    if (!username) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        (0, check_registration_1.isRegister)(username, res); //check register or not
        (0, check_login_1.isLoggedIn)(username, res); //check logged or not
        const adminDetail = yield getAdminRepo.find();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            data: adminDetail
        });
    }
    catch (error) {
        logger_1.default.error("error duirng view admin: ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}));
exports.default = viewAdmin;
