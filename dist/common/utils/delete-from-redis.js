"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRedis = deleteRedis;
exports.findAndDeleteKey = findAndDeleteKey;
const redisClient_1 = __importDefault(require("../db/redisClient"));
function deleteRedis(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteData = yield redisClient_1.default.del(key);
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
    });
}
function findAndDeleteKey(Username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keys = yield redisClient_1.default.keys('username:*');
            for (const key of keys) {
                const storedData = yield redisClient_1.default.get(key);
                const parsedData = storedData ? JSON.parse(storedData) : null;
                if ((parsedData === null || parsedData === void 0 ? void 0 : parsedData.username) === Username) {
                    yield deleteRedis(key);
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
    });
}
