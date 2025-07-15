import { DateTime } from "luxon";
import  Conversation  from "../models/conversation.model.js"; // Assuming you have a Conversation model
import { Product } from "../models/product.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import { User } from "../models/user.model.js";
export const geSellerDashboardStats = async (req, res) => {
    try {
      const userId = req.user._id;

      // Count products created by the user
      const productCount = await Product.countDocuments({ createdBy: userId });

      // Count conversations where the user is a participant
      const conversationCount = await Conversation.countDocuments({
        participants: userId,
      });
      const recentConversations = await Conversation.find({
        participants: userId
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("participants", "name") // Assumes User model has 'name'
        .select("participants createdAt")
        .lean(); // Convert to plain objects for easy mutation
  
      const cleanedConversations = recentConversations.map(conv => {
        // Filter out the current user
        const otherParticipants = conv.participants.filter(p => p._id.toString() !== userId.toString());
  
        return {
          participants: otherParticipants,
          createdAt: DateTime.fromJSDate(conv.createdAt).toFormat("dd LLL yyyy") // or "LLL dd, yyyy"
        };
      });

      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);  // Jan 1st 00:00
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1);  // Jan 1st next year
      
      const groupedConversations = await Conversation.aggregate([
        {
          $match: {
            participants: userId,
            createdAt: {
              $gte: startOfYear,
              $lt: endOfYear
            }
          }
        },
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            date: {
              $concat: [
                {
                  $arrayElemAt: [
                    ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    "$_id.month"
                  ]
                },
                "-",
                { $toString: "$_id.year" }
              ]
            },
            count: 1,
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
      
      const userProductIds = await Product.find({ createdBy: userId }).distinct('_id');
      const wishlistCount = await Wishlist.countDocuments({ product: { $in: userProductIds } });      
      
      

      res.status(200).json({
        productCount,
        conversationCount,
        recentConversations:cleanedConversations,
        groupedConversations,
        wishlistCount
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({
        message: "An error occurred while fetching dashboard stats",
        error: error.message,
      });
    }
  };
export const getAdminDashboardStats = async (req, res) => {
    try {
        const userId = req.userId;
        if (!req.userRole || req.userRole != 'admin') return res.status(403).json({ message: "Invalid or expired admin token" });
        const sellerCount = await User.countDocuments({ role: "seller" });
        const buyerCount = await User.countDocuments({ role: "user" });
        const productCount = await Product.countDocuments();
        const conversationCount = await Conversation.countDocuments();
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

        const groupedSellers = await User.aggregate([
        {
            $match: {
            role: "seller",
            createdAt: { $gte: startOfYear, $lt: endOfYear }
            }
        },
        {
            $group: {
            _id: {
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" }
            },
            count: { $sum: 1 }
            }
        },
        {
            $project: {
            date: {
                $concat: [
                {
                    $arrayElemAt: [
                    ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    "$_id.month"
                    ]
                },
                "-",
                { $toString: "$_id.year" }
                ]
            },
            count: 1
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);
        const recentConversations = await Conversation.find({
            participants: userId
          })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("participants", "name") // Assumes User model has 'name'
            .select("participants createdAt")
            .lean(); // Convert to plain objects for easy mutation
      
          const cleanedConversations = recentConversations.map(conv => {
            // Filter out the current user
            const otherParticipants = conv.participants.filter(p => p._id.toString() !== userId.toString());
      
            return {
              participants: otherParticipants,
              createdAt: DateTime.fromJSDate(conv.createdAt).toFormat("dd LLL yyyy") // or "LLL dd, yyyy"
            };
          });
        res.status(200).json({
        sellerCount,
        buyerCount,
        productCount,
        conversationCount,
        groupedSellers,
        recentConversations: cleanedConversations
        });
    } catch (error) {
        console.error("Error fetching admin dashboard stats:", error);
        res.status(500).json({
        message: "Failed to load admin dashboard data",
        error: error.message
        });
    }
};
  