import express, { Request, Response, Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const payment: Router = express.Router();

// Initialize Stripe with Secret Key and Config
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia",  // Update to the correct version
  });
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
payment.post("/payment", async (req: Request, res: Response): Promise<void> => {
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
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default payment;
