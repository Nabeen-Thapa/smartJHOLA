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
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminDetails_1 = require("../../admin/entities/adminDetails");
const redisClient_1 = __importDefault(require("../db/redisClient"));
const changePassword = express_1.default.Router();
changePassword.post("/changepwd", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, oldPassword, newPassword, confirmPassword } = req.body;
    if (!username || !oldPassword || !newPassword || !confirmPassword) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: "enter username, old passsowrd, new password and confirm" });
        return;
    }
    if (newPassword !== confirmPassword) {
        res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({ message: " new password and confirm not matched" });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const isPasswordExist = yield getAdminRepo.findOne({ where: { password: oldPassword } });
        if ((isPasswordExist === null || isPasswordExist === void 0 ? void 0 : isPasswordExist.username) !== username) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "username is not exist" });
            return;
        }
        if (!isPasswordExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "old password not match" });
            return;
        }
        const hashedOtp = yield bcrypt_1.default.hash(newPassword, 10);
        yield getAdminRepo.update({ username }, { password: hashedOtp });
        //delete form readis
        const checkInRedis = yield redisClient_1.default.keys('username:*');
        let redisData;
        let deleteFromRedis = null;
        for (const key of checkInRedis) {
            // Retrieve data from Redis and parse it
            const storedData = yield redisClient_1.default.get(key);
            const parsedData = storedData ? JSON.parse(storedData) : null;
            //JSON.parse(storedData) to properly parse the stringified JSON when retrieving the data from Redis. because in redis data are stored using (JSON.stringify({...}))
            if ((parsedData === null || parsedData === void 0 ? void 0 : parsedData.username) === username) {
                redisData = key;
                deleteFromRedis = key;
                break; // Exit loop once token match is found
            }
        }
        //delete form redis if exist
        if (deleteFromRedis) {
            const delResult = yield redisClient_1.default.del(deleteFromRedis);
            if (delResult) {
                logger_1.default.info(`Redis data for user removed successfully`);
            }
            else {
                logger_1.default.info(`Failed to delete Redis data for user `);
            }
        }
        else {
            logger_1.default.info("No matching Redis key found for the provided token");
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "successfully change password check your gmail for password and login to continue" });
        return;
    }
    catch (error) {
        logger_1.default.error("change password error : ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "change password" });
    }
}));
exports.default = changePassword;
