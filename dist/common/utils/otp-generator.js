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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniquePwd = void 0;
const userDetails_1 = require("../../users/entities/userDetails");
const db_connection_config_1 = require("../db/db-connection-config");
const otplib_1 = require("otplib");
const generateUniquePwd = () => __awaiter(void 0, void 0, void 0, function* () {
    let password;
    let userWithSameOtp;
    //chekc in db
    const smartUserRepo = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
    do {
        password = otplib_1.authenticator.generateSecret().slice(0, 6); //for 6 characater
        userWithSameOtp = yield smartUserRepo.findOne({
            where: { password: password },
        });
    } while (userWithSameOtp);
    return password;
});
exports.generateUniquePwd = generateUniquePwd;
