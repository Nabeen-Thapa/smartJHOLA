import { smartUser } from "../../users/entities/userDetails";
import { smartConnection } from "../db/db-connection-config";
import {authenticator} from "otplib";

export const generateUniquePwd = async ():Promise<string>=>{
    let password: string;
    let userWithSameOtp: smartUser | null;

    //chekc in db
    const smartUserRepo = smartConnection.getRepository(smartUser);

    do{
        password = authenticator.generateSecret().slice(0,6); //for 6 characater
        userWithSameOtp = await smartUserRepo.findOne({
            where :{password: password},})
    }while(userWithSameOtp);
    return password;
}