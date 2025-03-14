import express from "express";
import dotenv from "dotenv";
import logger from "./common/utils/logger";
import userRoutes from "./users/routes/user-routes";
import adminRoutes from "./admin/routes/admin-routes";
import commonRoutes from "./common/routes/common-router";
import cookieParser from "cookie-parser";
import categoryRouter from "./store/routes/category.routers";
import productRouter from "./store/routes/product.routers";
import CartRouter from "./store/routes/cart.routers";
import couponRoute from "./store/routes/coupon.route";
import "reflect-metadata";
import session from "express-session";
//import {sessionSetup } from "./common/utils/session.setup";
dotenv.config();
import cors from "cors";
const app = express();


app.use(express.urlencoded({ extended: true })); // For form data (URL-encoded)
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }));

   const session_key = process.env.SESSION_SECRET || "session123";
      session({
        secret: 'session_key', // Change this to a strong secret key
        resave: false,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          secure: false, // Set to true if using HTTPS
          maxAge: 1000 * 60 * 60 * 24, // Session expiration (1 day)
        },
      })

  
  //routes
app.use("/smartjhola", userRoutes);
app.use("/smartjhola", adminRoutes);
app.use("/smartjhola",commonRoutes);

app.use("/smartjhola/store/category", categoryRouter);
app.use("/smartjhola/store/product", productRouter);
app.use("/smartjhola/store/cart", CartRouter);
app.use("/smartjhola/store/coupon", couponRoute);


const port = process.env.PORT || 5500;
app.listen(port, ()=>{
    logger.info(`smart jhola server is running at ${port}`);
});