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
exports.isLoggedIn = void 0;
const db_connection_config_1 = require("../db/db-connection-config");
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utils/logger"));
const isLoggedIn = (username, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTokenRepo = db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isExist = yield getTokenRepo.findOne({ where: { username } });
        if (!isExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "you are not logged in" });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK);
    }
    catch (error) {
        logger_1.default.error("error duirng login chacking: ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.isLoggedIn = isLoggedIn;
