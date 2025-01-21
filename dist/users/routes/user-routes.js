"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_register_1 = __importDefault(require("../controllers/user-register"));
const smart_login_1 = __importDefault(require("../../common/controllers/smart-login"));
const smart_logout_1 = __importDefault(require("../controllers/smart-logout"));
const view_users_1 = __importDefault(require("../../admin/controllers/view-users"));
const userRoutes = express_1.default.Router();
userRoutes.use("/smartjhola", user_register_1.default);
userRoutes.use("/smartjhola", smart_login_1.default);
userRoutes.use("/smartjhola", smart_logout_1.default);
userRoutes.use("/smartjhola", view_users_1.default);
exports.default = userRoutes;
