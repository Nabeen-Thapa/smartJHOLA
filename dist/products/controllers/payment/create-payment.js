"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const payment = express_1.default.Router();
// Initialize Stripe with Secret Key and Config
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia", // Update to the correct version
});
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
payment.post("/payment", async (req, res) => {
    try {
        const { amount, currency } = req.body;
        if (!amount || !currency) {
            res.status(400).json({ error: "Amount and currency are required." });
            return;
        }
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents (e.g., 1000 for $10)
            currency,
            payment_method_types: ["card"],
        });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            message: "Payment intent created successfully.",
        });
    }
    catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = payment;
