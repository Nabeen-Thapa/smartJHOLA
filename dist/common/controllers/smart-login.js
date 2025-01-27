"use strict";
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
//import sessionData from "../middleware/session-data-store";
const check_registration_1 = require("../middleware/check-registration");
const check_login_1 = require("../middleware/check-login");
const update_data_in_redis_1 = require("../utils/update-data-in-redis");
const redisClient_1 = __importDefault(require("../db/redisClient"));
const smartUserLogin = express_1.default.Router();
smartUserLogin.post("/login", async (req, res) => {
    const { username, password, userType } = req.body;
    if (!username || !password || !userType) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "username and password required" });
        return;
    }
    try {
        const isUserLoggedInRedis = await (0, update_data_in_redis_1.uploadLoggedInDataInRedis)(username);
        if (isUserLoggedInRedis) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "This user is not logged in." });
            return;
        }
        (0, check_login_1.isLoggedIn)(username, res);
        await (0, check_registration_1.isRegister)(username, res);
        let getdbUserDetails;
        if (userType === "admin") {
            getdbUserDetails = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        }
        else {
            getdbUserDetails = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
        }
        const isRegisteredUser = await getdbUserDetails.findOne({ where: { username }, });
        let isPasswordMatch;
        let id;
        if (userType === "admin") {
            isPasswordMatch = password === isRegisteredUser.password;
        }
        else {
            isPasswordMatch = await bcrypt_1.default.compare(password, isRegisteredUser.password);
        }
        if (!isPasswordMatch) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ Message: "invalid password" });
            return;
        }
        const userId = userType === "admin" ? isRegisteredUser.adminId : isRegisteredUser.userId;
        const userEmail = isRegisteredUser.email;
        //check logged in
        (0, check_login_1.isLoggedIn)(username, res);
        const registeredPwd = isRegisteredUser.password;
        const smartJwtData = {
            username,
            userId,
            password
        };
        const accessToken = (0, accressTokenGenerator_1.generateAccessToken)(smartJwtData);
        const envRefreshToken = process.env.REFRESH_KEY;
        const refreshToken = jsonwebtoken_1.default.sign(smartJwtData, envRefreshToken);
        const userTokens = {
            userId: userId,
            username: username,
            password: registeredPwd,
            userEmail: userEmail,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        //store user data in redis
        await redisClient_1.default.set(`username:${username}`, JSON.stringify({
            userId: userId,
            userEmail: userEmail,
            username: username,
            accessToken: accessToken,
            refreshToken: refreshToken,
        }), { EX: 60 * 60 * 24 * 10 });
        const getdbToken = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isUserLoggedIn = await getdbToken.findOne({ where: { userId, username } });
        if (isUserLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ Message: "user is already logged in" });
            return;
        }
        const newUserToken = getdbToken.create(userTokens);
        await getdbToken.save(newUserToken);
        res.json({
            message: "login successfully",
            name: username,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
        const session = req.session;
        session.username = username;
        session.userId = userId;
        // Store session data in cookies
        res.cookie('username', username, { httpOnly: true, maxAge: 3600000 });
        res.cookie('userId', userId, { httpOnly: true, maxAge: 3600000 });
    }
    catch (error) {
        logger_1.default.error("login error : ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during login." });
    }
});
exports.default = smartUserLogin;
