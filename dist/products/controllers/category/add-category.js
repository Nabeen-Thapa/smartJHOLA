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
const http_status_codes_1 = require("http-status-codes");
const db_connection_config_1 = require("../../../common/db/db-connection-config");
const productsCategory_1 = require("../../entities/productsCategory");
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const addCategory = express_1.default.Router();
addCategory.post("/add-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, categoryName, categoryDescription } = req.body;
    //const username =req.session.username;
    //const userId = req.session.userId;
    // if(!username && !userId){
    //     res.status(StatusCodes.NOT_FOUND).json({Message :"u are not logged in, login first"});
    //     return;
    // }
    if (!username || !categoryName || !categoryDescription) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ Message: "categoryName and categoryDescription reduired" });
        return;
    }
    try {
        const getCategoryRepo = db_connection_config_1.smartConnection.getRepository(productsCategory_1.smartCategory);
        const isCategoryExist = yield getCategoryRepo.findOne({ where: { categoryName }, });
        if (isCategoryExist) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ Message: "categoryName already exist" });
            return;
        }
        const newCategory = yield getCategoryRepo.create({
            categoryName,
            categoryDescription
        });
        yield getCategoryRepo.save(newCategory);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED);
    }
    catch (error) {
        logger_1.default.error("add category error: ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error duirng add category", error });
    }
}));
exports.default = addCategory;
