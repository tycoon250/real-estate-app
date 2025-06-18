import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SellerApplication from "../../Components/SellerApplication";
import { useAuth } from "../../hooks/useAuth";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ApplicationStatus from "../../Components/ApplicationStatus";
import RejectedStatus from "../../Components/RejectedStatus";

const Sell = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleReapply = () => {
    // Reset the seller status to allow reapplication
    user.sellerStatus = "none";
    navigate("/sell",replace);
    toast.success("You can now submit a new application!");
  };

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login first!");
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!user) return null;

  // If the user is already a seller, navigate to dashboard.
  if (user.role === "seller") {
    navigate("/dashboard");
    return null;
  }

  if (user.sellerStatus === "pending") {
    const submittedAt = new Date(user.sellerApplication.submittedAt);

    return (
      <ApplicationStatus
        applicationDate={submittedAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
        applicationId={user.sellerApplication.licenseNumber}
      />
    );
  }

  if (user.sellerStatus === "rejected") {
    const submittedAt = new Date(user.sellerApplication.submittedAt);
    const rejectedAt = new Date(user.sellerApplication.rejectedAt);
    const reapplyAfter = new Date(user.sellerApplication.reapplyAfter);

    return (
      <RejectedStatus
        applicationDate={submittedAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
        applicationId={user.sellerApplication.licenseNumber}
        rejectionDate={rejectedAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
        rejectionReason={user.sellerApplication.rejectionReason}
        reapplyAfter={reapplyAfter}
        onReapply={handleReapply}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <header className="py-6 px-4 border-b border-border/40 bg-white/70 backdrop-blur-md">
        <div className="container max-w-7xl mx-auto flex justify-between items-center">
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4">
        <motion.div
          className="w-full max-w-4xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Become a Seller
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Join our marketplace and reach thousands of potential customers.
            Complete the application below to get started.
          </p>
        </motion.div>

        <div className="w-full flex justify-center">
          <SellerApplication />
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-border/40 bg-white/70 backdrop-blur-md">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg mr-2">
                  S
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  SellerHub
                </h3>
              </div>
              <p className="text-sm text-foreground/70">
                The premier platform for property professionals to connect with
                buyers and renters.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Listings
                </a>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm text-foreground/70">
                <p>1234 Market Street, Suite 100</p>
                <p>San Francisco, CA 94103</p>
                <p>Email: info@sellerhub.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/40 text-center text-sm text-foreground/60">
            <p>© {new Date().getFullYear()} SellerHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sell;
