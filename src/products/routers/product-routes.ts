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
import acceptCartItem from "../controllers/cart/accept-cart-item";
import rejectCartItem from "../controllers/cart/reject-cart-item";

const productRoutes:Router = express.Router();

productRoutes.use("/product",addCategory);
productRoutes.use("/product",addProduct);
productRoutes.use("/product",viewCategory);
productRoutes.use("/product",viewProduct);
productRoutes.use("/product",addToProductCart);
productRoutes.use("/product",viewCart);
productRoutes.use("/product",updateProduct);
productRoutes.use("/product",updateCategory);
productRoutes.use("/product",deleteCategory);
productRoutes.use("/product",deleteProduct);
productRoutes.use("/product",acceptCartItem);
productRoutes.use("/product",rejectCartItem);


export default productRoutes;
