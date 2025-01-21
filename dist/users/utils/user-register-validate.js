"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidationSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    username: joi_1.default.string().alphanum().trim().min(4).max(100).required(),
    email: joi_1.default.string().email().trim().required(),
    phone: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.number()).custom((value) => String(value)).required(),
    age: joi_1.default.number().integer().allow(null, " ").optional(),
    gender: joi_1.default.string().allow(null, " ").optional(),
    image: joi_1.default.string().allow(null, "").optional(),
    status: joi_1.default.string().valid("active", "deactive").default("Deactive"),
});
