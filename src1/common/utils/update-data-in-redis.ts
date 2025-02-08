import { smartToken } from "../../users/entities/smartUserToken";
import { smartConnection } from "../db/db-connection-config";
import redisClient from "../db/redisClient";
import logger from "./logger";

export const uploadLoggedInDataInRedis = async (username: string): Promise<boolean> => {
    try {
        const isExistUserInRedis = await redisClient.EXISTS(`username:${username}`);        
        if (!isExistUserInRedis) {
            const getTokenRepo = smartConnection.getRepository(smartToken);
            const isUserLoggedIn = await getTokenRepo.findOne({ where: { username }});
            if (!isUserLoggedIn) {
               return false;
            }
            await redisClient.set(`username:${username}`, JSON.stringify({
                userId: isUserLoggedIn?.userId,
                    userEmail: isUserLoggedIn.userEmail,
                    username: isUserLoggedIn.username,
                    accessToken: isUserLoggedIn.accessToken,
                    refreshToken: isUserLoggedIn.refreshToken,
            }), { EX: 60 * 60 * 24 * 10 });
            return true  
        }
        return true;
    } catch (error) {
        if (error instanceof Error) {
            logger.error("user update error:", error.message);
            return false;
        } else {
            logger.error("Unexpected error type while updating user:", error);
            return false; 
        }
    }

}
