import { User } from "../models/user.model.js";
import fs from "fs";
import path from "path";

export const applyForSeller = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.sellerStatus === "pending") {
      return res.status(400).json({ message: "Application already pending" });
    }
    if (user.sellerStatus === "approved") {
      return res
        .status(400)
        .json({ message: "You are already an approved seller" });
    }

    // Extract additional seller application fields from the request body
    const {
      licenseNumber,
      agencyName,
      yearsOfExperience,
      officeAddress,
      website,
    } = req.body;

    // Update user's seller application data
    user.sellerStatus = "approved";
    user.role = "seller";
    user.sellerApplication = {
      licenseNumber,
      agencyName,
      yearsOfExperience,
      officeAddress,
      website,
      document: `/uploads/sellerDocuments/${req.file.filename}`,
      submittedAt: new Date(),
    };

    await user.save();

    res
      .status(200)
      .json({ message: "Seller application submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSellerApplications = async (req, res) => {
  try {
    // Only return users with a pending seller application
    const applications = await User.find({ sellerStatus: "pending" }).select(
      "-password"
    );
    res.json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateSellerApplication = async (req, res) => {
  const { status } = req.body; // expected: "approved" or "rejected"
  const { userId } = req.params;
  console.log(req.body);
  console.log(status);
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.sellerStatus !== "pending") {
      return res.status(404).json({ message: "No pending application for this user" });
    }

    if (status === "approved") {
      // If approved, update sellerStatus and set the role to seller.
      user.sellerStatus = "approved";
      user.role = "seller";
    } else if (status === "rejected") {
      // If rejected, first remove the uploaded document from disk if it exists.
      if (user.sellerApplication && user.sellerApplication.document) {
        const filePath = path.join(process.cwd(), user.sellerApplication.document);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting document file:", err);
          } else {
            console.log("Document file deleted successfully");
          }
        });
      }
      // Set a cooldown period for reapplication (e.g., 3 days)
      const reapplyAfter = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

      // Instead of completely clearing sellerApplication, we store a reapplyAfter timestamp.
      user.sellerApplication = {
        // You could store additional data here if needed:
        rejectedAt: new Date(),
        reapplyAfter,
      };
      user.sellerStatus = "rejected";
    } else {
      return res.status(400).json({ message: "Invalid status value" });
    }

    await user.save();
    // Optionally, return the reapplyAfter date in the response when rejected.
    const message =
      user.sellerStatus === "rejected"
        ? `Seller application rejected. You can reapply after ${user.sellerApplication.reapplyAfter.toLocaleDateString()}`
        : `Seller application ${user.sellerStatus}`;
    res.json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
