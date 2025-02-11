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
const db_connection_config_1 = require("../../common/db/db-connection-config");
const adminDetails_1 = require("../entities/adminDetails");
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const logger_1 = __importDefault(require("../../common/utils/logger"));
const updateAdmin = express_1.default.Router();
updateAdmin.patch("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId, name, username, email, phone } = req.body;
    if (!adminId) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "admin id is requred" });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const getTokenRepo = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isAdminExist = yield getAdminRepo.findOne({ where: { adminId } });
        if (!isAdminExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
            return;
        }
        const isAdminLoggedIn = yield getTokenRepo.findOne({ where: { userId: adminId } });
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
        yield getAdminRepo.update({ adminId }, updateOldAdmin);
        res.status(http_status_codes_1.StatusCodes.OK);
    }
    catch (error) {
        logger_1.default.error("update admin error : ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "admin update error", error });
    }
}));
exports.default = updateAdmin;
