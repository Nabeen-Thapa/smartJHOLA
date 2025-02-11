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
const adminDetails_1 = require("../../../admin/entities/adminDetails");
const productsCategory_1 = require("../../entities/productsCategory");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const deleteCategory = express_1.default.Router();
deleteCategory.delete("/delete-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId, categoryId, categoryName } = req.body;
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const getCategoryRepo = db_connection_config_1.smartConnection.getRepository(productsCategory_1.smartCategory);
        const isAdminLoggedIn = yield getAdminRepo.findOne({ where: { adminId } });
        if (!isAdminLoggedIn) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "you are not logged in, login first" });
            return;
        }
        const isCategoryExist = yield getCategoryRepo.findOne({ where: { categoryId, categoryName } });
        if (!isCategoryExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "category is not exist" });
            return;
        }
        yield getCategoryRepo.delete({ categoryId });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "category delete successfully" });
    }
    catch (error) {
        logger_1.default.error("update category error :", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "update category error :", error });
    }
}));
exports.default = deleteCategory;
