import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// Import controllers
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  addToWishlist,
  removeFromWishlist,
  getAllWishlist,
  getProductByDId,
  getSellerProducts,
  searchProperties,
  BrowseProperties,
} from "../controlers/product.controler.js";
import {
  authenticate,
  authenticateAdminToken,
  authenticateUserOrAdmin,
} from "../middlewares/auth.middleware.js";
import { cloudinaryStorage } from "../controlers/upload.controller.js";

export const productRouter = express.Router();


const upload = multer({ storage: cloudinaryStorage });

// Product creation route
productRouter.post(
  "/new",
  authenticateUserOrAdmin,
  upload.fields([
    { name: "displayImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  createProduct
);

//update product
productRouter.put(
  "/update/:id",
  upload.fields([
    { name: "displayImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "newImages", maxCount: 10 },
  ]),
  updateProduct
);

//get all products
productRouter.get("/all", getAllProducts);
productRouter.get("/seller/all", authenticate, getSellerProducts);

//get single product
productRouter.get("/single/:id", getProductById);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/details/:slug", getProductBySlug);
productRouter.get("/details/i/:id", getProductByDId);

//wishlist

// Add to wishlist
productRouter.post("/wishlist/add-to-wishlist", authenticate, addToWishlist);

// Remove from wishlist
productRouter.delete(
  "/wishlist/remove/:productId",
  authenticate,
  removeFromWishlist
);

// Get user's wishlist
productRouter.get("/wishlist/all", authenticate, getAllWishlist);
productRouter.post("/search/:needle?", searchProperties);
productRouter.post("/browse",BrowseProperties)

