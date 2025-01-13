import express from "express";
import dotenv from "dotenv";
import logger from "./common/utils/logger";
import userRoutes from "./users/routes/user-routes";
import { smartConnection } from "./common/db/db-connection-config";
dotenv.config();
const app = express();

app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form data (URL-encoded)

smartConnection.initialize()
  .then(() => {
    logger.info("Database connected successfully!");
  })
  .catch((error) => {
    logger.error("Error during Data Source initialization:", error);
  });


  //routes
app.use("/", userRoutes);


const port = process.env.PORT ||5500;
app.listen(port, ()=>{
    logger.info(`smart jhola server is running at ${port}`);
});