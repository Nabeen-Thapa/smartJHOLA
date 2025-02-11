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
const logger_1 = __importDefault(require("../../common/utils/logger"));
const http_status_codes_1 = require("http-status-codes");
const db_connection_config_1 = require("../../common/db/db-connection-config");
const userDetails_1 = require("../entities/userDetails");
const valid_phoneNumber_1 = require("../../common/middleware/valid-phoneNumber");
const valid_email_1 = require("../../common/middleware/valid-email");
const user_register_validate_1 = require("../utils/user-register-validate");
const updateUser = express_1.default.Router();
updateUser.patch("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password, email, phone, age, gender } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded image filename
    if (!image) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Image is required.' });
        return;
    }
    if (!name || !username || !email || !phone) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "name, username, email phone number are required" });
        return;
    }
    const { error } = user_register_validate_1.userValidationSchema.validate(req.body);
    if (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            message: "user registration Validation failed",
            details: error.details.map((detail) => detail.message),
        });
        return;
    }
    try {
        if (!(0, valid_email_1.isValidEmail)(email)) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "email is not valid" });
            return;
        }
        if (!(0, valid_phoneNumber_1.isValidNumber)(phone)) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "phone number is not valid" });
            return;
        }
        const getdbUserDetails = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
        const isExistUser = yield getdbUserDetails.findOne({ where: { username }, });
        if (isExistUser) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message: "this user is already exist" });
            return;
        }
        const addNewUser = getdbUserDetails.create({
            name,
            username,
            password,
            email,
            phone,
            gender,
            age,
            image: undefined,
        });
        yield getdbUserDetails.save(addNewUser);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "update successful check your email for the password" });
    }
    catch (error) {
        logger_1.default.error("error duirng user update: ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}));
exports.default = updateUser;
