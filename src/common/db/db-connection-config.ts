import { DataSource } from "typeorm";

import dotnev from "dotenv";
import { smartUser } from "../../users/entities/userDetails";
import { smartToken } from "../../users/entities/smartUserToken";
import { smartAdmin } from "../../admin/entities/adminDetails";
import { smartCategory } from "../../products/entities/productsCategory";
import { smartProduct } from "../../products/entities/produstDetails";

dotnev.config();

export const smartConnection = new DataSource({
    type:"postgres",
    host : process.env.HOST ||"localhost",
    port: 5432,
    username :"postgres",
    password : process.env.password ,
    database : process.env.database,
    synchronize: true,
    logging: false,
    entities : [smartUser, smartToken, smartAdmin, smartCategory, smartProduct],
})