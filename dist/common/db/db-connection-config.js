"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartConnection = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const userDetails_1 = require("../../users/entities/userDetails");
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const adminDetails_1 = require("../../admin/entities/adminDetails");
const productsCategory_1 = require("../../products/entities/productsCategory");
const produstDetails_1 = require("../../products/entities/produstDetails");
dotenv_1.default.config();
exports.smartConnection = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOST || "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.password,
    database: process.env.database,
    synchronize: true,
    logging: false,
    entities: [userDetails_1.smartUser, smartUserToken_1.smartToken, adminDetails_1.smartAdmin, productsCategory_1.smartCategory, produstDetails_1.smartProduct],
});
