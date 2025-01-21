"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const smart_login_1 = __importDefault(require("../controllers/smart-login"));
const commonRoutes = express_1.default.Router();
commonRoutes.use("/", smart_login_1.default);
exports.default = commonRoutes;
