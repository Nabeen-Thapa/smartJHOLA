import { DataSource } from "typeorm";

import dotnev from "dotenv";
import { smartUser } from "../../users/db/userDetails";
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
    entities : [smartUser],
})