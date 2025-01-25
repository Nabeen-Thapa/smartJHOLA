import express, { Response } from "express";
import { smartConnection } from "../db/db-connection-config";
import { smartToken } from "../../users/entities/smartUserToken";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";
import { uploadLoggedInDataInRedis } from "../utils/update-data-in-redis";
import { isRegister } from "./check-registration";

export const isLoggedIn = async (username: string, res: Response): Promise<void> => {
    try {
        const getTokenRepo = smartConnection.getRepository(smartToken);

        const isExist = await getTokenRepo.findOne({ where: { username } });
        if (!isExist) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "you are not logged in" });
            return;
        }
        res.status(StatusCodes.OK);
    } catch (error) {
        logger.error("error duirng login chacking: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}