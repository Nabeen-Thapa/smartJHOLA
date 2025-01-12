import express from "express";
import dotenv from "dotenv";
import logger from "./common/utils/logger";
dotenv.config();
const app = express();

const port = process.env.PORT ||5500;
app.listen(port, ()=>{
    logger.info(`smart jhola server is running at ${port}`);
});