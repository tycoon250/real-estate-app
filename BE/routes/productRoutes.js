import multer from "multer";
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
import { multerUpload } from "../controlers/upload.controller.js";

export const productRouter = express.Router();

// Use multerUpload for S3 file uploads
const upload = multerUpload;

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

// Update product route
productRouter.put(
  "/update/:id",
  upload.fields([
    { name: "displayImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "newImages", maxCount: 10 },
  ]),
  updateProduct
);

// Get all products
productRouter.get("/all", getAllProducts);
productRouter.get("/seller/all", authenticate, getSellerProducts);

// Get single product
productRouter.get("/single/:id", getProductById);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/details/:slug", getProductBySlug);
productRouter.get("/details/i/:id", getProductByDId);

// Wishlist routes
productRouter.post("/wishlist/add-to-wishlist", authenticate, addToWishlist);
productRouter.delete(
  "/wishlist/remove/:productId",
  authenticate,
  removeFromWishlist
);
productRouter.get("/wishlist/all", authenticate, getAllWishlist);

// Search and browse properties
productRouter.post("/search/:needle?", searchProperties);
productRouter.post("/browse", BrowseProperties);

