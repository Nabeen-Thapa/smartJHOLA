"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const view_users_1 = __importDefault(require("../controllers/view-users"));
const add_category_1 = __importDefault(require("../../products/controllers/add-category"));
const adminRoutes = express_1.default.Router();
adminRoutes.use("/smartjhola", view_users_1.default);
adminRoutes.use("/smartjhola", add_category_1.default);
exports.default = adminRoutes;
