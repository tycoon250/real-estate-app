import express from'express'
import { authenticateToken, authenticateAdminToken } from "../middlewares/auth.middleware.js";
import { applyForSeller, getSellerApplications, updateSellerApplication } from '../controlers/seller.controller.js'
import { isAdmin, isSeller } from "../middlewares/admin.middleware.js";
import { uploadSellerMiddleware } from "../utils/sellerUpload.js";


export const sellerRouter = express.Router()




sellerRouter.post(
    "/apply-seller",
    authenticateToken,
    uploadSellerMiddleware,
    applyForSeller
  );

  sellerRouter.get(
    "/admin/seller-applications",
    authenticateAdminToken,
    isAdmin,
    getSellerApplications
  );
    

  sellerRouter.put(
    "/admin/seller-applications/:userId",
    authenticateAdminToken,
    isAdmin,
    updateSellerApplication
  );

  sellerRouter.get(
    "/dashboard",
    authenticateToken,
    isSeller,
    (req, res) => {
      res.json({ message: "Welcome to your seller dashboard" });
    }
  );