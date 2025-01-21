"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_category_1 = __importDefault(require("../controllers/add-category"));
const add_products_1 = __importDefault(require("../controllers/add-products"));
const view_category_1 = __importDefault(require("../controllers/view-category"));
const view_product_1 = __importDefault(require("../controllers/view-product"));
const productRoutes = express_1.default.Router();
productRoutes.use("/smartjhola", add_category_1.default);
productRoutes.use("/smartjhola", add_products_1.default);
productRoutes.use("/smartjhola", view_category_1.default);
productRoutes.use("/smartjhola", view_product_1.default);
exports.default = productRoutes;
