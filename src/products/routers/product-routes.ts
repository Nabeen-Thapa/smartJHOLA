import express, { Router } from "express";
import addToProductCart from "../controllers/cart/add-to-cart";
import viewCart from "../controllers/cart/view-cart";
import addCategory from "../controllers/category/add-category";
import addProduct from "../controllers/product/add-products";
import viewCategory from "../controllers/category/view-category";
import viewProduct from "../controllers/product/view-product";
import updateCategory from "../controllers/category/update-category";
import updateProduct from "../controllers/product/update-product";
import deleteCategory from "../controllers/category/delete-category";
import deleteProduct from "../controllers/product/delete-product";

const productRoutes:Router = express.Router();

productRoutes.use("/smartjhola",addCategory);
productRoutes.use("/smartjhola",addProduct);
productRoutes.use("/smartjhola",viewCategory);
productRoutes.use("/smartjhola",viewProduct);
productRoutes.use("/smartjhola",addToProductCart);
productRoutes.use("/smartjhola",viewCart);
productRoutes.use("/smartjhola",updateProduct);
productRoutes.use("/smartjhola",updateCategory);
productRoutes.use("/smartjhola",deleteCategory);
productRoutes.use("/smartjhola",deleteProduct);


export default productRoutes;
