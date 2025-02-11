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
const express_1 = __importDefault(require("express"));
const db_connection_config_1 = require("../../../common/db/db-connection-config");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const productsCategory_1 = require("../../entities/productsCategory");
const viewCategory = express_1.default.Router();
viewCategory.get('/viewCategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {username, password} =req.body;
    // if(!username || !password){
    //     res.status(StatusCodes.BAD_REQUEST).json({message : "enter username and password"});
    //     return;
    // } 
    // if(username !== "admin" && password !=="admin12"){
    //     res.status(StatusCodes.BAD_REQUEST).json({message :"username and password are not match"});
    //     return;
    // }
    try {
        //accessing users form database
        const categoryRepositery = db_connection_config_1.smartConnection.getRepository(productsCategory_1.smartCategory);
        const categories = yield categoryRepositery.find();
        if (categories.length === 0) {
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: "No catagories found" });
            return;
        }
        res.status(200).json({
            success: true,
            data: categories
        });
        return;
    }
    catch (error) {
        logger_1.default.error("view user error : ", error);
        res.status(500).json({ message: "fail to view users, error during view users" });
        return;
    }
}));
exports.default = viewCategory;
