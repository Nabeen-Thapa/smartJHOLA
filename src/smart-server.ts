import express from "express";
import dotenv from "dotenv";
import logger from "./common/utils/logger";
import userRoutes from "./users/routes/user-routes";
import { smartConnection } from "./common/db/db-connection-config";
import adminRoutes from "./admin/routes/admin-routes";
import commonRoutes from "./common/routes/common-router";
// import productRoutes from "./products/routers/product-routes";
import cookieParser from "cookie-parser";
import session from "express-session";
import categoryRouter from "./store/routes/category.routers";
import productRouter from "./store/routes/product.routers";
dotenv.config();
const app = express();


app.use(express.urlencoded({ extended: true })); // For form data (URL-encoded)
app.use(cookieParser());
app.use(express.json());



smartConnection.initialize()
  .then(() => {
    logger.info("Database connected successfully!");
  })
  .catch((error) => {
    logger.error("Error during Data Source initialization:", error);
  });

  app.use(
    session({
      secret: 'yourSecretKey', // Change this to a strong secret key
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24, // Session expiration (1 day)
      },
    })
  );
  
  //routes
app.use("/smartjhola", userRoutes);
app.use("/smartjhola", adminRoutes);
app.use("/smartjhola",commonRoutes);
//app.use("/smartjhola",productRoutes);


// app.use("/smartjhola/store/category", categoryRouter);
// app.use("/smartjhola/store/product", productRouter);

const port = process.env.PORT || 5500;
app.listen(port, ()=>{
    logger.info(`smart jhola server is running at ${port}`);
});