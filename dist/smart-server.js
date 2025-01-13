"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./common/utils/logger"));
const user_routes_1 = __importDefault(require("./users/routes/user-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//routes
app.use("/smartjhola", user_routes_1.default);
const port = process.env.PORT || 5500;
app.listen(port, () => {
    logger_1.default.info(`smart jhola server is running at ${port}`);
});
