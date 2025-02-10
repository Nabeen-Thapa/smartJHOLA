import { DataSource } from "typeorm";

import dotnev from "dotenv";
import { smartUser } from "../../users/entities/userDetails";
import { smartToken } from "../../users/entities/smartUserToken";
import { smartAdmin } from "../../admin/entities/adminDetails";
import { smartCategory } from "../../store/entities/productsCategory";
import { smartProduct } from "../../store/entities/produstDetails";
import { smartCart } from "../../store/entities/AddToCart";


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
    entities : [smartUser, smartToken, smartAdmin, smartCategory, smartProduct, smartCart],
})