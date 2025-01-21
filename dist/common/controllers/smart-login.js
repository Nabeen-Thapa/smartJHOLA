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
//import sessionData from "../middleware/session-data-store";
const express_session_1 = __importDefault(require("express-session"));
const smartUserLogin = express_1.default.Router();
smartUserLogin.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'sesson123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true in production with HTTPS
}));
smartUserLogin.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, userType } = req.body;
    if (!username || !password || !userType) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "username and password required" });
        return;
    }
    try {
        let getdbUserDetails;
        if (userType === "admin") {
            getdbUserDetails = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        }
        else {
            getdbUserDetails = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
        }
        const isRegisteredUser = yield getdbUserDetails.findOne({ where: { username }, });
        if (!isRegisteredUser) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message: "invalid username or password" });
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
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ Message: "invalid password" });
            return;
        }
        let userId;
        let userEmail;
        if (userType === "admin") {
            userId = isRegisteredUser.adminId;
            userEmail = isRegisteredUser.email;
        }
        else {
            userId = isRegisteredUser.userId;
            userEmail = isRegisteredUser.email;
        }
        const registeredPwd = isRegisteredUser.password;
        const smartJwtData = {
            username: username, userId: userId, password: password
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
        const getdbToken = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isUserLoggedIn = yield getdbToken.findOne({ where: { userId, username } });
        if (isUserLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ Message: "user is already logged in" });
            return;
        }
        const newUserToken = yield getdbToken.create(userTokens);
        yield getdbToken.save(newUserToken);
        //Store username and userId in session
        req.session.username = username;
        req.session.userId = userId;
        res.json({
            message: "login successfully",
            name: username,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    catch (error) {
        logger_1.default.error("login error : ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during login." });
    }
}));
exports.default = smartUserLogin;
