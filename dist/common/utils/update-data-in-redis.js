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
exports.uploadLoggedInDataInRedis = void 0;
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const db_connection_config_1 = require("../db/db-connection-config");
const redisClient_1 = __importDefault(require("../db/redisClient"));
const logger_1 = __importDefault(require("./logger"));
const uploadLoggedInDataInRedis = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExistUserInRedis = yield redisClient_1.default.EXISTS(`username:${username}`);
        if (!isExistUserInRedis) {
            const getTokenRepo = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
            const isUserLoggedIn = yield getTokenRepo.findOne({ where: { username } });
            if (!isUserLoggedIn) {
                return false;
            }
            yield redisClient_1.default.set(`username:${username}`, JSON.stringify({
                userId: isUserLoggedIn === null || isUserLoggedIn === void 0 ? void 0 : isUserLoggedIn.userId,
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
});
exports.uploadLoggedInDataInRedis = uploadLoggedInDataInRedis;
