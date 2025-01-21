import express, { Router } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
const sessionData :Router = express.Router();
sessionData.use(cookieParser());
sessionData.use(session({
    secret: process.env.SESSION_SECRET || 'sesson123', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: isProduction, // Set to true in production (requires HTTPS)
        httpOnly: true, // Prevent access from JavaScript
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },}))
export default sessionData;


