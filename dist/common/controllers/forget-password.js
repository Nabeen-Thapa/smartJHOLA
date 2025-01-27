"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../common/utils/logger"));
const db_connection_config_1 = require("../../common/db/db-connection-config");
const otp_generator_1 = require("../../common/utils/otp-generator");
const email_sender_1 = require("../../common/utils/email-sender");
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminDetails_1 = require("../../admin/entities/adminDetails");
const delete_from_redis_1 = require("../utils/delete-from-redis");
const smartUserToken_1 = require("../../users/entities/smartUserToken");
const forgetPassword = express_1.default.Router();
forgetPassword.post("/forgetpwd", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: "enter email" });
        return;
    }
    try {
        const getAdminRepo = db_connection_config_1.smartConnection.getRepository(adminDetails_1.smartAdmin);
        const isEmailExist = await getAdminRepo.findOne({ where: { email } });
        if (!isEmailExist) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "emai is not exist" });
            return;
        }
        const username = isEmailExist.username;
        const otp = await (0, otp_generator_1.generateUniquePwd)();
        try {
            await (0, email_sender_1.sendEmail)({
                to: email,
                subject: "Password Reset",
                text: `The password for your Typescript API account.\n\n
            Your username: ${username}\n
            Your OTP is: ${otp}\n\n
            Please use this OTP to log in or reset your password.\n`,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                // Check if the error is an instance of Error
                logger_1.default.error("Email sending failed:", error.message);
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
            }
            else {
                // Handle non-Error cases (unlikely, but good practice)
                logger_1.default.error("Unexpected email sending error:", error);
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Unexpected error occurred while sending email." });
            }
            return;
        }
        const hashedOtp = await bcrypt_1.default.hash(otp, 10);
        await getAdminRepo.update({ email }, { password: hashedOtp });
        //delete form readis
        const deleteRedisKey = await (0, delete_from_redis_1.findAndDeleteKey)(username);
        const getTokenTable = await db_connection_config_1.smartConnection.getRepository(smartUserToken_1.smartToken);
        const isLoggedIn = await getTokenTable.findOne({ where: { username } });
        if (isLoggedIn) {
            const userId = isLoggedIn.userId;
            await getTokenTable.delete({ userId });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "successfully forget password check your gmail for password and login to continue" });
        return;
    }
    catch (error) {
        logger_1.default.error("forget password error : ", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "forget password" });
    }
});
exports.default = forgetPassword;
