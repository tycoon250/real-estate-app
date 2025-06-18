import { User } from "../models/user.model.js";

export const isAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      code: "FORBIDDEN",
      message: "Admin privileges required",
    });
  }
  next();
};

export const isSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.sellerStatus === "approved") {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Access denied. Seller privileges required." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
