import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./user-menu";
import Logo from "../Assets/Logo.png";

const CATEGORIES = ["For Buy", "For Rent", "Services", "About Us", "Help Center"];

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const scrollRef = useRef();
  const isHome = location.pathname === "/";

  const scrollNav = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-trigger")) {
        setOpenDropdown(null);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isHome
          ? scrolled
            ? "bg-white text-black shadow-md"
            : "bg-transparent text-white"
          : "bg-white text-black shadow-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl justify-between px-4 py-4">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold">
            <img src={Logo} alt="Logo" className="h-20" />
          </Link>

          <div className="hidden lg:flex flex-1 overflow-hidden relative">
            <div ref={scrollRef} className="relative z-10 flex gap-6 px-8">
              {CATEGORIES.map((item, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <Link
                    to={
                      index < 2
                        ? `/browse/availability/${item.replace(/\s+/g, "-").toLowerCase()}`
                        : `/${item.replace(/\s+/g, "-").toLowerCase()}`
                    }
                    className="text-sm font-medium text-white-700 hover:text-orange-100"
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/sell" className="hidden lg:block text-sm font-medium text-dack hover:text-orange-100">
            Sell
          </Link>

          {!loading &&
            (user ? (
              <UserMenu
                lastName={user.name || ""}
                isOpen={isUserMenuOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setOpenDropdown(null);
                }}
                onLogout={handleLogout}
              />
            ) : (
              <Link
                to="/auth"
                className="hidden lg:block text-sm font-medium text-dack hover:text-orange-100"
              >
                Sign in
              </Link>
            ))}

            <button
              className={`lg:hidden p-1 rounded-lg hover:bg-orange-100 transition-colors ${
                isHome && !scrolled ? "text-white" : "text-black"
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={CATEGORIES.map((item, index) => ({
          label: item,
          path:
            index < 2
              ? `/browse/availability/${item.replace(/\s+/g, "-").toLowerCase()}`
              : `/${item.replace(/\s+/g, "-").toLowerCase()}`
        }))}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
};
