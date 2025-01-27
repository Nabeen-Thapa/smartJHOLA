"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const db_connection_config_1 = require("../../../common/db/db-connection-config");
const adminDetails_1 = require("../../../admin/entities/adminDetails");
const productsCategory_1 = require("../../entities/productsCategory");
const updateCategory = express_1.default.Router();
updateCategory.patch("/update-category", async (req, res) => {
    const { adminId, username, categoryId, categoryName, categoryDescription } = req.body;
    if (!username || !categoryName) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "all data are required" });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const getCategoryRepo = db_connection_config_1.smartConnection.getRepository(productsCategory_1.smartCategory);
        const isAdminLoggedIn = await getAdminRepo.findOne({ where: { username, adminId } });
        if (!isAdminLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "you are not logged in, login first" });
            return;
        }
        const isCategoryExist = await getCategoryRepo.findOne({ where: { categoryId, categoryName } });
        if (!isCategoryExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "category is not exist" });
            return;
        }
        //update product on db
        const updateCategoryRepo = {
            categoryName,
            categoryDescription
        };
        await getCategoryRepo.update({ categoryId }, updateCategoryRepo);
    }
    catch (error) {
        logger_1.default.error("update category error :", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "update category error :", error });
    }
});
exports.default = updateCategory;
