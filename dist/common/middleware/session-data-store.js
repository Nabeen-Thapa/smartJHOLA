"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
const sessionData = express_1.default.Router();
// Middleware for parsing cookies
sessionData.use((0, cookie_parser_1.default)());
// Middleware for managing sessions
sessionData.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "session123", // Use a strong, unique secret in production
    resave: false, // Avoid unnecessary session saving
    saveUninitialized: false, // Don't save empty sessions
    cookie: {
        secure: isProduction, // Use HTTPS in production
        httpOnly: true, // Prevent JavaScript access
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    },
}));
exports.default = sessionData;
