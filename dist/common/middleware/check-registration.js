"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegister = void 0;
const db_connection_config_1 = require("../db/db-connection-config");
const adminDetails_1 = require("../../admin/entities/adminDetails");
const userDetails_1 = require("../../users/entities/userDetails");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utils/logger"));
const isRegister = async (username, res) => {
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const getUserRepo = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
        let isExist = await getAdminRepo.findOne({ where: { username } });
        if (!isExist) {
            let isExist = await getUserRepo.findOne({ where: { username } });
            if (!isExist) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "you are not registered" });
                ;
                return;
            }
        }
        res.status(http_status_codes_1.StatusCodes.OK);
    }
    catch (error) {
        logger_1.default.error("error duirng register chacking: ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        return;
    }
};
exports.isRegister = isRegister;
