"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => {
    const secretAccessToken = process.env.ACCESS_KEY;
    if (!secretAccessToken) {
        throw new Error("access token key is not defined in environment variables.");
    }
    return jsonwebtoken_1.default.sign(user, secretAccessToken, { expiresIn: '120m' });
};
exports.generateAccessToken = generateAccessToken;
