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
const db_connection_config_1 = require("../db/db-connection-config");
const userDetails_1 = require("../../users/entities/userDetails");
const accressTokenGenerator_1 = require("../../users/utils/accressTokenGenerator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const adminDetails_1 = require("../../admin/entities/adminDetails");
const check_registration_1 = require("../middleware/check-registration");
const update_data_in_redis_1 = require("../utils/update-data-in-redis");
const redisClient_1 = __importDefault(require("../db/redisClient"));
const smartUserLogin = express_1.default.Router();
smartUserLogin.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, userType } = req.body;
    if (!username || !password || !userType) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "Username and password required" });
        return;
    }
    try {
        const isUserLoggedInRedis = yield (0, update_data_in_redis_1.uploadLoggedInDataInRedis)(username);
        if (isUserLoggedInRedis) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "This user is already logged in" });
            return;
        }
        //isLoggedIn(username, res);
        yield (0, check_registration_1.isRegister)(username, res);
        let getdbUserDetails;
        if (userType === "admin") {
            getdbUserDetails = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        }
        else {
            getdbUserDetails = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
        }
        const isRegisteredUser = yield getdbUserDetails.findOne({ where: { username } });
        if (!isRegisteredUser) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "User not found" });
            return;
        }
        let isPasswordMatch;
        if (userType === "admin") {
            isPasswordMatch = password === isRegisteredUser.password;
        }
        else {
            isPasswordMatch = yield bcrypt_1.default.compare(password, isRegisteredUser.password);
        }
        if (!isPasswordMatch) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: "Invalid password" });
            return;
        }
        const userId = userType === "admin" ? isRegisteredUser.adminId : isRegisteredUser.userId;
        const userEmail = isRegisteredUser.email;
        const smartJwtData = {
            username,
            userId,
            password,
        };
        const accessToken = (0, accressTokenGenerator_1.generateAccessToken)(smartJwtData);
        const envRefreshToken = process.env.REFRESH_KEY;
        const refreshToken = jsonwebtoken_1.default.sign(smartJwtData, envRefreshToken);
        const userTokens = {
            userId,
            username,
            password: isRegisteredUser.password,
            userEmail,
            accessToken,
            refreshToken,
        };
        // Store user data in Redis
        yield redisClient_1.default.set(`username:${username}`, JSON.stringify({
            userId,
            userEmail,
            username,
            accessToken,
            refreshToken,
        }), { EX: 60 * 60 * 24 * 10 } // Expiry time: 10 days
        );
        const getdbToken = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isUserLoggedIn = yield getdbToken.findOne({ where: { userId, username } });
        if (isUserLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message: "User is already logged in" });
            return;
        }
        const newUserToken = getdbToken.create(userTokens);
        yield getdbToken.save(newUserToken);
        // Check if session is available
        if (!req.session) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Session is unavailable" });
            return;
        }
        // Store data in session
        req.session.userId = userId;
        req.session.username = username;
        req.session.userEmail = userEmail;
        // Store session data in cookies
        res.cookie("username", username, { httpOnly: true, maxAge: 3600000 });
        res.cookie("userId", userId, { httpOnly: true, maxAge: 3600000 });
        res.json({
            message: "Login successful",
            name: username,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        logger_1.default.error("Login error: ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during login." });
    }
}));
exports.default = smartUserLogin;
