import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { DropdownMenu } from "./dropdown-menu";
import { MobileMenu } from "./mobile-menu";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./user-menu";
import Logo from "../Assets/Logo.png"

const CATEGORIES = ["Product","For Buy", "For Sale", "Rental", "Service", "About Us", "Help Center", ]

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
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
    handleScroll(); // trigger on mount
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

          <div className="flex-1 max-w-[70%] overflow-hidden relative">
            {/* Scroll Shadows */}
           

            {/* Scroll Buttons */} 
            <button onClick={() => scrollNav("left")} className="absolute left-0 z-20 h-full px-2">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <button onClick={() => scrollNav("right")} className="absolute right-0 z-20 h-full px-2">
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>

            {/* Scrollable Category Bar */}
            <div
              ref={scrollRef}
              className="relative z-10 flex overflow-x-auto scroll-smooth gap-6 px-8"
              style={{ scrollbarWidth: "none" }}
              onScroll={() => setOpenDropdown(null)}
            >
              {CATEGORIES.map((item, index) => (
                <div key={index} className="relative flex-shrink-0">
                  
                    {item}
                  
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/sell" className="hidden  lg:block text-sm font-medium text-dack hover:text-orange-100">Sell</Link>

          {!loading && (
            user ? (
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
                className="hidden  lg:block text-sm font-medium text-dack hover:text-orange-100"
              >
                Sign in
              </Link>
            )
          )}

          <button className="lg:hidden p-1 hover:bg-orange-100 text-white rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={[]}
        currentLanguage={selectedLanguage}
        onLanguageSelect={setSelectedLanguage}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
};
