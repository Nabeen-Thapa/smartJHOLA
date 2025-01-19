import express, { Router } from "express";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const sessionData :Router = express.Router();

sessionData.use(session({
    secret: process.env.SESSION_SECRET || 'sesson123', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

export default sessionData;