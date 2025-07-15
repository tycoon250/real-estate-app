import express from "express";
import { adminAuth, authenticate, authenticateAdminToken, authenticateUserOrAdmin } from "../middlewares/auth.middleware.js";
import { geSellerDashboardStats, getAdminDashboardStats } from "../controlers/stats.controller.js";
export const DashRouter = express.Router();

DashRouter.get('/seller',authenticate,geSellerDashboardStats)
DashRouter.get('/admin',authenticateAdminToken,getAdminDashboardStats)