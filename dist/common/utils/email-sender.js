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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//sending function
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL, // Ensure this is set in your .env file
            pass: process.env.EMAIL_PASSWORD, // Ensure this is set in your .env file
        },
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: options.to,
        subject: options.subject,
        text: options.text,
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Email sending error:", error);
        // Check for specific email error conditions
        if (error.response) {
            const response = error.response;
            if (response.includes("550") || response.includes("5.1.1")) {
                throw new Error(`Address not found: The email ${options.to} is not valid.`);
            }
        }
        throw new Error("Failed to send email. Please check the email address and try again.");
    }
});
exports.sendEmail = sendEmail;
