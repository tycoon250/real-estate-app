import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs"

import asyncHandler from "express-async-handler";
import { config } from "dotenv";
import Partner from "../models/Partner.js";
import { multerUpload } from "./upload.controller.js";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
config()



export const sendEmail = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Create a transporter using your email service (example uses Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  // Setup email data
  const mailOptions = {
    from: email, 
    to: process.env.EMAIL_USER, 
    subject: `New Enquiry from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error.toString() });
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});


// Set up storage engine using diskStorage



// Filter to accept only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  };

  
// Use multerUpload for S3 file uploads
export const uploadLogo = multerUpload.single("logo");



export const uploadPartnerLogo = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }
  const { name } = req.body; 
  if (!name) {
    res.status(400);
    throw new Error("Partner name is required");
  }
  // Extract S3 file details
  const { location: logoPath, key: fileId } = req.file;
  // Save to the database
  const newPartner = await Partner.create({
    name,
    logo: {
      path: fileId,
      file_id: logoPath,
    },
  });
  // Save to the database

  res.status(201).json({
    message: "Logo uploaded successfully",
    partner: newPartner,
  });
});

// DELETE controller to remove a partner and their logo
export const deletePartnerLogo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const partner = await Partner.findById(id);

  if (!partner) {
    res.status(404);
    throw new Error("Partner not found");
  }

  // Delete the partner from the database
  await partner.deleteOne();

  // Remove logo file from S3
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: partner.logo.path,
  };
  await s3.send(new DeleteObjectCommand(deleteParams));

  res.json({ message: "Partner and logo deleted successfully" });
});


export const getPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find();
  res.status(200).json(partners);
});
