"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNumber = void 0;
const isValidNumber = (phone) => {
    const numberRegex = /^(98|97)\d{8}$/;
    return numberRegex.test(phone);
};
exports.isValidNumber = isValidNumber;
