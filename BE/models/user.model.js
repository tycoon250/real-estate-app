import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    phoneNumber: Number,
    address: {
      city: String,
      street: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    profileImage: String,
    role: {
      type: String,
      enum: ["user", "admin","seller"],
      default: "user",
    },
    lastAccessedAt: Date,
    active: {
      type: Boolean,
      default: true,
    },
    twoFactorCode: String,
    twoFactorExpires: Date,
    is2FAVerified: { type: Boolean, default: false },
    // for seller
    sellerStatus: {
      type: String,
      enum: ["none","pending", "approved", "rejected"],
      default: "none",
    },
    sellerApplication: {
      licenseNumber: String,
      agencyName: String,
      yearsOfExperience: Number,
      officeAddress: String,
      website: String,
      document: String, 
      submittedAt: Date,
      rejectedAt: Date,
      reapplyAfter: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
