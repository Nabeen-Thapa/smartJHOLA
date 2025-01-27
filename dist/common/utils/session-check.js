"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionCheck = express_1.default.Router();
sessionCheck.get('/checkout', async (req, res) => {
    if (!req.session.username) {
        res.status(401).send('Please log in to proceed to checkout');
        return;
    }
    res.send('Proceeding to checkout...');
});
