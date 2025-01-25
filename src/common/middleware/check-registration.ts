import express, { Response } from "express";
import { smartConnection } from "../db/db-connection-config";
import { smartAdmin } from "../../admin/entities/adminDetails";
import { smartUser } from "../../users/entities/userDetails";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";

export const isRegister = async (username: string, res: Response): Promise<void> => {
    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
        const getUserRepo = smartConnection.getRepository(smartUser);

        let isExist = await getAdminRepo.findOne({ where: { username } });
        if (!isExist) {
            let isExist = await getUserRepo.findOne({ where: { username } });
            if (!isExist) {
                res.status(StatusCodes.NOT_FOUND).json({message :"you are not registered"});;
                return;
            }
        }
        res.status(StatusCodes.OK);
    } catch (error) {
        logger.error("error duirng register chacking: ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        return;
    }
}