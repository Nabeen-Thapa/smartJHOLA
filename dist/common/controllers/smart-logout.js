"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connection_config_1 = require("../db/db-connection-config");
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utils/logger"));
const smartUserLogout = express_1.default.Router();
smartUserLogout.post("/logout", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "enter you refresh token" });
    }
    try {
        const getdbToken = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isTokenExists = await getdbToken.findOne({ where: { refreshToken }, });
        if (!isTokenExists) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "you are not logged in" });
            return;
        }
        //destroy from session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Could not log out');
            }
            res.clearCookie('username'); // Clear the cookie
            res.send('Logged out successfully');
        });
        const userId = isTokenExists.userId;
        await getdbToken.delete(userId);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: "delete success" });
        return;
    }
    catch (error) {
        logger_1.default.error("logout error:", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred during logout." });
    }
});
exports.default = smartUserLogout;
