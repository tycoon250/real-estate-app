import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
// import api from "../utils/api";
import axios from "axios";
import DashboardCard from "../../Components/sellerComponents/DashboardCard";
import { useAuthContext } from "../../Components/sellerComponents/AuthContext";
import ConversationChart from "../../Components/conversationChart";

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([
    {
      title: "Total Products",
      value: "Loading...",
      icon: <Package size={22} className="text-blue-600" />,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Total Deals",
      value: "Loading...",
      icon: <ShoppingCart size={22} className="text-emerald-600" />,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Total Likes",
      value: "Loading...",
      icon: <Users size={22} className="text-purple-600" />,
      trend: { value: 0, isPositive: true },
    }
  ]);
  const [recentConvs, setRecentConvs] = useState([]);
  const [groupedConvs,setGroupedConvs] = useState([])
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes] = await Promise.all([
          axios.get(API_URL+"/api/product/seller/all", {
            withCredentials: true,
          }),
        ]);
        const {data} = await axios.get(API_URL+"/api/dashboard/seller", {
          withCredentials: true,
        });
        setRecentConvs(data.recentConversations);
        setGroupedConvs(data.groupedConversations)
        setSummaryData([
          {
            title: "Total Products",
            value: data.productCount.toLocaleString(),
            icon: <Package size={22} className="text-blue-600" />,
            trend: { value: Math.random() * 10, isPositive: true },
          },
          {
            title: "Total Deals",
            value: data.conversationCount.toLocaleString(), // Replace with actual order data if available
            icon: <ShoppingCart size={22} className="text-emerald-600" />,
            trend: { value: Math.random() * 10, isPositive: true },
          },
          {
            title: "Total Likes",
            value: data.wishlistCount.toLocaleString(),
            icon: <Users size={22} className="text-purple-600" />,
            trend: { value: Math.random() * 10, isPositive: true },
          },
          
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Overview of your store performance
          </p>
        </div>
      </header>

      <main className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              trend={item.trend}
            />
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Deals Overview</h2>
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                Monthly <BarChart3 size={14} />
              </button>
            </div>
            <div className="p-6 h-64 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {!groupedConvs.length ?
                  (<div className="text-center">
                    <TrendingUp size={32} className="mx-auto mb-2" />
                      <p>nothing here !</p>
                    </div>)
                   :
                   <ConversationChart data={groupedConvs}/> }
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Recent Deals</h2>
              <Link
                to="/messages"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentConvs.map((item,index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between mb-1">
                    <p className="font-medium text-sm text-gray-800">
                      Deal with
                    </p>
                    <span className="text-xs font-medium px-2 py-1  text-gray-800">
                      On
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">
                      {item.participants[0]?.name}
                    </p>
                    <p className="text-gray-700 font-medium">
                      {item?.createdAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Link
                to="/messages"
                className="text-sm text-center block w-full py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                View All Deals
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <Link
              to="/new-product"
              className="p-6 text-center border-r border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Package size={24} />
              </div>
              <h3 className="font-medium text-gray-800">Add Product</h3>
              <p className="text-xs text-gray-500 mt-1">Create a new product</p>
            </Link>

            <Link
              to="/orders"
              className="p-6 text-center border-r border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                <ShoppingCart size={24} />
              </div>
              <h3 className="font-medium text-gray-800">Vie Orders</h3>
              <p className="text-xs text-gray-500 mt-1">
                Manage pending orders
              </p>
            </Link>

            <Link
              to="/customers"
              className="p-6 text-center border-r border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <Users size={24} />
              </div>
              <h3 className="font-medium text-gray-800">View Customers</h3>
              <p className="text-xs text-gray-500 mt-1">
                Manage customer accounts
              </p>
            </Link>

            <Link
              to="/analytics"
              className="p-6 text-center border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <h3 className="font-medium text-gray-800">View Analytics</h3>
              <p className="text-xs text-gray-500 mt-1">
                Check performance metrics
              </p>
            </Link>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
