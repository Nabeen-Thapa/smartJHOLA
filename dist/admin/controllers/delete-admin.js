"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteAdmin = express_1.default.Router();
deleteAdmin.delete("/delete", async (req, res) => {
});
exports.default = deleteAdmin;
