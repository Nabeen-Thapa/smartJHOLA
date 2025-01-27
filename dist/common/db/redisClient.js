"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../common/utils/logger"));
const redis_1 = require("redis");
//create redis client
const redisClient = (0, redis_1.createClient)();
redisClient.on('connect', () => {
    logger_1.default.info("connected to redis");
});
redisClient.on('error', (err) => {
    logger_1.default.error("redis error:", err);
});
//connect to redis
redisClient.connect();
exports.default = redisClient;
