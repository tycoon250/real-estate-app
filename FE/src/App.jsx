import React from "react";
import { BrowserRouter, Routes, Route, useLocation, matchPath  } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./Pages/Home/Home";
import AllProducts from "./Pages/Home/AllProducts";
import ContactPage from "./Pages/Home/ContactUs";
import Sell from "./Pages/Home/Sell";
import Auth from "./Pages/auth";
import ProductDetails from "./Pages/product/Pdetails";
import ResidentialListings from "./Pages/Home/residential";
import CommercialListings from "./Pages/Home/commercial";
import VacationListings from "./Pages/Home/Vacation";
import BuyHouse from "./Pages/Home/BuyHouse";
import BuyLand from "./Pages/Home/BuyLand";
import BuyApartment from "./Pages/Home/BuyApartment";
import BuyResidential from "./Pages/Home/BuyResidential";
import WishList from "./Components/wishlist/WishList";
import { Navbar } from "./Components/NavBar";
import ProfilePage from "./Pages/userPages/ProfilePage";
import ChatPage from "./Pages/ChatPage";
import ClientChatPage from "./Pages/ClientChatPage";
import Chat from "./Components/chats/Chat";
import Dashboard from "./Pages/sellerPages/dashboard";
import DashboardLayout from "./Components/sellerComponents/DashboardLayout";
import {
  ProtectedRoute,
  ProtectedSellerRoute,
} from "./Components/sellerComponents/ProtectedRoute";
import { AuthProvider } from "./Components/sellerComponents/AuthContext";
import SellerProfile from "./Components/sellerComponents/sellerProfile";
import SellerProperties from "./Pages/sellerPages/AllProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateProductForm from "./Pages/sellerPages/create-new";
import SellerChatPage from "./Pages/sellerPages/sellerChatPage";
import AboutUs from "./Pages/footerPage/AboutUs";
import HelpCenter from "./Pages/footerPage/HelpCenter";
import Services from "./Pages/footerPage/Services";
import News from "./Pages/footerPage/News";
import FAQ from "./Pages/footerPage/Faqs";
import PrivacyPolicy from "./Pages/footerPage/PrivacyPolicy";
import TermsOfUse from "./Pages/footerPage/TermsOfUse";
import SearchPage from "./Pages/search-page";
import UpdateProduct from "./Pages/sellerPages/updateProduct";
import Browse from "./Pages/browse-page";

const AppRoutes = () => {
  const location = useLocation();
  // Define paths where you don't want the Navbar
  const hideNavbarPaths = [
    "/dashboard",
    "/seller/profile",
    "/all-products",
    "/new-product",
    "/messages",
    "/update-product",
  ]; // add more if needed
  const isUpdateProductRoute = matchPath("/update-product/*", location.pathname);
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname) || isUpdateProductRoute;

  return (
    <>
      {/* Render Navbar only if current pathname is not in hideNavbarPaths */}
      {!shouldHideNavbar && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* rental pages */}
        <Route path="/rent/residential" element={<ResidentialListings />} />
        <Route path="/rent/commercial" element={<CommercialListings />} />
        <Route path="/rent/vacation" element={<VacationListings />} />
        {/* buy pages */}
        <Route path="/buy/houses" element={<BuyHouse />} />
        <Route path="/buy/land" element={<BuyLand />} />
        <Route path="/buy/apartment" element={<BuyApartment />} />
        <Route path="/buy/residential" element={<BuyResidential />} />
        {/* wishlist page */}
        {/* end of wishlist page */}
        <Route path="/all" element={<AllProducts />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/browse/:btype/:category/:type?" element={<Browse />} />

        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/Sell" element={<Sell />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/services" element={<Services />} />
        <Route path="/news" element={<News />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        {/* chat page */}
        {/* seller pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/client/deals" element={<Chat />} />
          <Route path="/chat/:conversationId" element={<ChatPage />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route element={<ProtectedSellerRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/seller/profile" element={<SellerProfile />} />
              <Route path="/all-products" element={<SellerProperties />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/new-product" element={<CreateProductForm />} />
              <Route path="/messages" element={<SellerChatPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
