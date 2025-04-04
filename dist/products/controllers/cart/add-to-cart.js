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
const AddToCart_1 = require("../../entities/AddToCart");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../../common/utils/logger"));
const userDetails_1 = require("../../../users/entities/userDetails");
const addToProductCart = express_1.default.Router();
addToProductCart.post("/add-to-cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, product, quantity, price, total_price, added_at } = req.body;
    try {
        const getAddToCartRepo = db_connection_config_1.smartConnection.getRepository(AddToCart_1.addToCart);
        const getuserRepo = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
        //const isUserLoggedIn = getuserRepo.findOne({where : {userId :user}})
        // if(!isUserLoggedIn){
        //     res.status(StatusCodes.NOT_FOUND).json({message: "you are not logged in, login first"});
        //     return;
        // }
        const isProductExistOfSameUser = yield getAddToCartRepo.findOne({ where: { user, product }, });
        if (isProductExistOfSameUser) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message: "you already have add this item" });
            return;
        }
        // add to caddToCart table
        const newCartItem = yield getAddToCartRepo.create({
            user,
            product,
            quantity,
            price,
            total_price,
            added_at,
        });
        yield getAddToCartRepo.save(newCartItem);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED);
    }
    catch (error) {
        logger_1.default.error("add to cart error:", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "add to cart error : ", error });
    }
}));
exports.default = addToProductCart;
