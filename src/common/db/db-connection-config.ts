import { DataSource } from "typeorm";

import dotnev from "dotenv";
dotnev.config();

export const smartConnection = new DataSource({
    type : "postgres",
    host : process.env.HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username : process.env.username,
    password : process.env.password,
    database : process.env.database,
    synchronize: true,
    logging: false,
    entities : [],
})