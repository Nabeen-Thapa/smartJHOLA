"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "HH:mm:ss" }), winston_1.format.colorize(), winston_1.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}]:${message}`;
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "logs/app.log" }),
    ],
});
exports.default = logger;
