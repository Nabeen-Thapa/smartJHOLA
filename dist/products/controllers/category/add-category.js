"use strict";
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
addCategory.post("/add-category", async (req, res) => {
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
        const isCategoryExist = await getCategoryRepo.findOne({ where: { categoryName }, });
        if (isCategoryExist) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ Message: "categoryName already exist" });
            return;
        }
        const newCategory = await getCategoryRepo.create({
            categoryName,
            categoryDescription
        });
        await getCategoryRepo.save(newCategory);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED);
    }
    catch (error) {
        logger_1.default.error("add category error: ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error duirng add category", error });
    }
});
exports.default = addCategory;
