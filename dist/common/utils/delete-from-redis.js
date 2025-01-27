"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRedis = deleteRedis;
exports.findAndDeleteKey = findAndDeleteKey;
const redisClient_1 = __importDefault(require("../db/redisClient"));
async function deleteRedis(key) {
    try {
        const deleteData = await redisClient_1.default.del(key);
        return deleteData > 0;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to delete key ${key} from Redis: ${error.message}`);
        }
        else {
            throw new Error(`Failed to delete key ${key} from Redis: Unknown error`);
        }
    }
}
async function findAndDeleteKey(Username) {
    try {
        const keys = await redisClient_1.default.keys('username:*');
        for (const key of keys) {
            const storedData = await redisClient_1.default.get(key);
            const parsedData = storedData ? JSON.parse(storedData) : null;
            if (parsedData?.username === Username) {
                await deleteRedis(key);
                return key;
            }
        }
        return null; // No matching key found
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to delete key  from Redis: ${error.message}`);
        }
        else {
            throw new Error(`Failed to delete key from Redis: Unknown error`);
        }
    }
}
