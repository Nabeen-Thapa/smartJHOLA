import express, { Request, Response } from "express";
import { smartConnection } from "../db/db-connection-config";
import { smartToken } from "../../users/entities/smartUserToken";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";
import { uploadLoggedInDataInRedis } from "../utils/update-data-in-redis";
import { isRegister } from "./check-registration";

export const isLoggedIn = async (username: string, req: Request, res: Response): Promise<void> => {
    try {
        // Ensure session exists
        if (!req.session) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Session not found" });
            return;
        }
        const session = req.session as { username?: string };
        // Ensure the session contains username
        if (!session.username || session.username !== username) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not logged in" });
            return;
        }

        res.status(StatusCodes.OK).json({ message: "User is logged in", user: req.session });
    } catch (error) {
        logger.error("Error during login checking: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
