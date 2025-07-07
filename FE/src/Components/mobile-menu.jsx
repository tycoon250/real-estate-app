import { useState } from "react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { UserMenu } from "./user-menu"; // adjust path if needed

export const MobileMenu = ({
  isOpen,
  onClose,
  user,
  onLogout,
  navItems = []
}) => {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div
      className={`fixed inset-0 bg-gray-800/50 transition-opacity duration-200 lg:hidden ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white overflow-y-auto shadow-xl transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>

          {/* 🔹 Categories Section */}
          <div className="mt-12 space-y-2">
            <p className="text-sm font-semibold text-gray-500 px-2">Browse</p>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  location.pathname.startsWith(item.path)
                    ? "bg-gray-100 text-blue-600"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 🔹 User Menu Section */}
          <div className="mt-8 border-t pt-4 space-y-2">
            {user ? (
              <>
                <UserMenu
                  lastName={user.name || "User"}
                  isOpen={userMenuOpen}
                  onToggle={() => setUserMenuOpen(!userMenuOpen)}
                  onLogout={() => {
                    onLogout?.();
                    onClose(); // optional: close on logout
                  }}
                />
              </>
            ) : (
              <Link
                to="/auth"
                onClick={onClose}
                className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
              >
                Sign In
              </Link>
            )}

            {/* Always Show Sell */}
            <Link
              to="/sell"
              onClick={onClose}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sell
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
