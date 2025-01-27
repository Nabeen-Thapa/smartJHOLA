"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLoggedInDataInRedis = void 0;
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const db_connection_config_1 = require("../db/db-connection-config");
const redisClient_1 = __importDefault(require("../db/redisClient"));
const logger_1 = __importDefault(require("./logger"));
const uploadLoggedInDataInRedis = async (username) => {
    try {
        const isExistUserInRedis = await redisClient_1.default.EXISTS(`username:${username}`);
        if (!isExistUserInRedis) {
            const getTokenRepo = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
            const isUserLoggedIn = await getTokenRepo.findOne({ where: { username } });
            if (!isUserLoggedIn) {
                return false;
            }
            await redisClient_1.default.set(`username:${username}`, JSON.stringify({
                userId: isUserLoggedIn?.userId,
                userEmail: isUserLoggedIn.userEmail,
                username: isUserLoggedIn.username,
                accessToken: isUserLoggedIn.accessToken,
                refreshToken: isUserLoggedIn.refreshToken,
            }), { EX: 60 * 60 * 24 * 10 });
            return true;
        }
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error("user update error:", error.message);
            return false;
        }
        else {
            logger_1.default.error("Unexpected error type while updating user:", error);
            return false;
        }
    }
};
exports.uploadLoggedInDataInRedis = uploadLoggedInDataInRedis;
