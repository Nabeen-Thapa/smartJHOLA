"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniquePwd = void 0;
const userDetails_1 = require("../../users/entities/userDetails");
const db_connection_config_1 = require("../db/db-connection-config");
const otplib_1 = require("otplib");
const generateUniquePwd = async () => {
    let password;
    let userWithSameOtp;
    //chekc in db
    const smartUserRepo = db_connection_config_1.smartConnection.getRepository(userDetails_1.smartUser);
    do {
        password = otplib_1.authenticator.generateSecret().slice(0, 6); //for 6 characater
        userWithSameOtp = await smartUserRepo.findOne({
            where: { password: password },
        });
    } while (userWithSameOtp);
    return password;
};
exports.generateUniquePwd = generateUniquePwd;
