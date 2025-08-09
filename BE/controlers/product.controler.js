import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import asyncHandler from "express-async-handler";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Product } from "../models/product.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import { User } from "../models/user.model.js";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
//create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      type,
      category,
      status,
      location,
      beds,
      baths,
      specifications
    } = req.body;

    if (!req.files || !req.files.displayImage || !req.files.images) {
      return res
        .status(400)
        .json({ message: "Display image and product images are required" });
    }

    // Generate slug
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    // Get file paths
    const displayImage = {
      path: req.files.displayImage[0].key, // AWS S3 resolved path
      public_id: req.files.displayImage[0].location // AWS S3 key
    };
    
    const images = req.files.images.map((file) => ({
      path: file.key, // AWS S3 resolved path
      public_id: file.location // AWS S3 key
    }));
    // Create the product
    const product = new Product({
      title,
      slug,
      description,
      price,
      type,
      category: category.split(","), // Assuming category is passed as a comma-separated string
      displayImage,
      image: images,
      status,
      location,
      specifications: typeof specifications === "string" ? JSON.parse(specifications) : specifications,
      beds: beds ? Number(beds) : undefined,
      baths: baths ? Number(baths) : undefined,
      createdBy: req.userId, // Added user reference
    });

    await product.save();

    // Populate creator info in response
    const populatedProduct = await Product.findById(product._id).populate(
      "createdBy",
      "name email"
    );

    res
      .status(201)
      .json({
        message: "Product created successfully",
        product: populatedProduct,
      });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search, sort, type } = req.query;

    // Convert query parameters to proper formats
    const pageNumber = Math.max(1, parseInt(page, 10)); // Ensure positive integer
    const limitNumber = Math.max(1, parseInt(limit, 10)); // Ensure positive integer
    const skip = (pageNumber - 1) * limitNumber;

    // Build filter object dynamically
    const filter = {};

    if (category) {
      filter.category = { $in: category.split(",") }; // Supports multiple categories
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    if (type) {
      filter.type = type; // Filter by type (e.g., "House", "Apartment")
    }

    // Sorting configuration
    const sortOptions = {};
    if (sort) {
      const [key, order] = sort.split(":"); // Example: sort=price:asc or sort=price:desc
      sortOptions[key] = order === "desc" ? -1 : 1;
    }

    // Fetch products with filtering, pagination, and sorting
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    // Get total count of products matching the filter
    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      message: "Products retrieved successfully",
      products,
      pagination: {
        total: totalProducts,
        page: pageNumber,
        pages: Math.ceil(totalProducts / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "An error occurred while fetching products",
      error: error.message,
    });
  }
};

//get seller products
export const getSellerProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search, sort, type, status } = req.query;
    const sellerId = req.user._id;

    // Convert query parameters to proper formats
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * limitNumber;

    // Build filter object - always include the seller's ID
    const filter = {
      createdBy: sellerId // Only show products created by this seller
    };

    // Add additional filters if provided
    if (category) {
      filter.category = { $in: category.split(",") };
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (type) {
      filter.type = type;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    // Sorting configuration
    const sortOptions = {};
    if (sort) {
      const [key, order] = sort.split(":");
      sortOptions[key] = order === "desc" ? -1 : 1;
    }
    // Fetch products with filtering, pagination, and sorting
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber)
      .populate('createdBy', sellerId);

    // Get total count of products matching the filter
    const totalProducts = await Product.countDocuments(filter);
    res.status(200).json({
      message: "Products retrieved successfully",
      products,
      pagination: {
        total: totalProducts,
        page: pageNumber,
        pages: Math.ceil(totalProducts / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "An error occurred while fetching products",
      error: error.message,
    });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      type,
      category,
      status,
      location,
      beds,
      baths,
      specifications,
    } = req.body;
    let { removedImages } = req.body;

    if (typeof removedImages === "string") {
      removedImages = JSON.parse(removedImages);
    }
    removedImages = Array.isArray(removedImages) ? removedImages : [];

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (title) {
      product.slug = title.toLowerCase().replace(/\s+/g, "-");
    }

    // Delete removed images from AWS S3
    if (removedImages && removedImages.length > 0) {
      for (const image of removedImages) {
        try {
          // Remove image from AWS S3
          product.image = product.image.filter((img) => img.path !== image.path);
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: image.path,
            })
          );
          // Remove image from product's image array
        } catch (err) {
          console.error(`Failed to delete image ${image.path} from AWS S3:`, err.message);
        }
      }
    }

    // Assign the new display image to the product
    if (req.files && req.files.displayImage) {
      const newDisplayImage = {
        path: req.files.displayImage[0].key, // AWS S3 resolved path
        public_id: req.files.displayImage[0].location, // AWS S3 key
      };
      product.displayImage = newDisplayImage;
    }

    // Add new images to the product
    if (req.files && req.files.images) {
      const images = req.files.images.map((file) => ({
        path: file.key, // AWS S3 resolved path
        public_id: file.location, // AWS S3 key
      }));
      images.forEach((image) => {
        if (!product.image.some((img) => img.path === image.path)) {
          product.image.push(image);
        }
      });
    }

    // Update other fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.type = type || product.type;
    product.category = category ? category.split(",") : product.category;
    product.status = status || product.status;
    product.location = location || product.location;
    product.beds = !isNaN(beds) && beds !== "" ? Number(beds) : product.beds;
    product.baths = !isNaN(baths) && baths !== "" ? Number(baths) : product.baths;
    product.specifications =
      typeof specifications === "string"
        ? JSON.parse(specifications)
        : specifications || product.specifications;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

//get single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters

    // Find the product by its ID
    const product = await Product.findById(id);

    // If no product is found, return a 404 response
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the found product
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "An error occurred while fetching the product",
      error: error.message,
    });
  }
};

// Delete a product and its images
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from the filesystem
    const deleteFile = (filePath) => {
      const fullPath = path.join(__dirname, "..", "public", filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    };

    // Delete display image
    deleteFile(product.displayImage);

    // Delete all product images
    product.image.forEach((img) => deleteFile(img));

    // Delete the product from the database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Get product details by slug
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the product by slug
    const product = await Product.findOne({ slug });

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
// Get product details by id
export const getProductByDId = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by slug
    const product = await Product.findById(id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

//add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const existingWishlistItem = await Wishlist.findOne({
      user: userId,
      product: productId,
    });
    if (existingWishlistItem) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const wishlistItem = new Wishlist({ user: userId, product: productId });
    await wishlistItem.save();

    // Update user's wishlist array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: productId } }, // $addToSet prevents duplicates
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(201)
      .json({ message: "Product added to wishlist", wishlistItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

//remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlistItem = await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });
    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    // Remove from user's wishlist array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true }
    );

    res.status(200).json({
      message: "Product removed from wishlist",
      userWishlist: user.wishlist,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

//get all wishlists for the current user
export const getAllWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlistItems = await Wishlist.find({ user: userId }).populate(
      "product"
    );
    res.status(200).json({ wishlistItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};


// @route  GET /api/properties/search
export const searchProperties = asyncHandler(async (req, res) => {
  const { needle } = req.params,
  {filters} = req.body

  const query = {};

  if (needle) {
    query.$or = [
      { title: { $regex: needle, $options: "i" } },
      { description: { $regex: needle, $options: "i" } },
      { type: { $regex: needle, $options: "i" } },
      { category: { $elemMatch: { $regex: needle, $options: "i" } } },
    ];
  }

  if (filters) {
    if (filters.category) {
      query.category = { $in: [filters.category] }; // Match category exactly
    }
    if (filters.type) {
      query.type = filters.type; // Match type exactly
    }
    if (filters.status) {
      query.status = filters.status; // Match status exactly
    }
  }
  // Execute the query
  const properties = await Product.find(query);

  res.json(properties);
});
export const BrowseProperties = asyncHandler(async (req, res) => {
    const { budget } = req.query,
    {btype, categoryData,typeData} = req.body
    const query = {};
    // if (location) {
    //   query.location = { $regex: location, $options: "i" };
    // }
  
    // if (propertyType) {
    //   query.type = propertyType;
    // }
    if (btype) {
        if (btype == 'type') {
            query.category = { $in: [categoryData.name] }
            if (Object.keys(typeData).length) {
                query.type = typeData.label 
            }
        }else if (btype == 'availability') {
            query.status = categoryData
        }
    }
    if (budget) {
      const maxPrice = Number(budget);
      if (!isNaN(maxPrice)) {
        query.price = { $lte: maxPrice };
      }
    }
  
    // if (lookingFor) {
    //   query.status = lookingFor;
    // }
  
    // Optionally filter by property size (if interpreted as minimum number of beds)
    // if (propertySize) {
    //   const minBeds = Number(propertySize);
    //   if (!isNaN(minBeds)) {
    //     query.beds = { $gte: minBeds };
    //   }
    // }
    // Execute the query
    const properties = await Product.find(query).collation({ locale: "en", strength: 2 });
  
    res.json(properties);
  });