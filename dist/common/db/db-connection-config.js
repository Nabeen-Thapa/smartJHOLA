"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartConnection = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const userDetails_1 = require("../../users/db/userDetails");
dotenv_1.default.config();
exports.smartConnection = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    synchronize: true,
    logging: false,
    entities: [userDetails_1.smartUser],
});
