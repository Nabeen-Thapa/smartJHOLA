import express, { Router } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const sessionData: Router = express.Router();

// Middleware for parsing cookies
sessionData.use(cookieParser());

// Middleware for managing sessions
sessionData.use(
  session({
    secret: process.env.SESSION_SECRET || "session123", // Use a strong, unique secret in production
    resave: false, // Avoid unnecessary session saving
    saveUninitialized: false, // Don't save empty sessions
    cookie: {
      secure: isProduction, // Use HTTPS in production
      httpOnly: true, // Prevent JavaScript access
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    },
  })
);

export default sessionData;
