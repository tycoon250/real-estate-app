import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { NavLink } from "./nav-link";
import { DropdownMenu } from "./dropdown-menu";
import { LanguageSelector } from "./language-selector";
import { MobileMenu } from "./mobile-menu";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./user-menu";

const buyOptions = [
  { id: "houses", label: "Houses", href: "/buy/houses" },
  { id: "apartment", label: "Apartments", href: "/buy/apartment" },
  { id: "land", label: "Land", href: "/buy/land" },
  { id: "residential", label: "Residential", href: "/buy/residential" },
];

const rentOptions = [
  { id: "residential", label: "Residential", href: "/rent/residential" },
  { id: "commercial", label: "Commercial", href: "/rent/commercial" },
  { id: "Vacation Rentals", label: "Vacation", href: "/rent/vacation" },
];

const navItems = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "buy",
    label: "Buy",
    href: "/buy",
    children: buyOptions,
  },
  {
    id: "rent",
    label: "Rent",
    href: "/rent",
    children: rentOptions,
  },
  { id: "auction", label: "Auction", href: "/auction" },
  { id: "contact", label: "Contact", href: "/contact-us" },
];
const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Personal Care",
  "Health & Wellness",
  "Sports & Outdoors",
  "Baby & Kids",
  "Groceries & Food",
  "Books & Stationery",
  "Automotive",
  "Pets Supplies",
  "Tools & Hardware",
  "Gifts & Special Occasions",
];
const TYPES = CATEGORIES.map((category,index) => {
  const options = {
    Electronics: [
      { id: "mobile-phones", label: "Mobile Phones & Accessories", href: "/electronics/mobile-phones" },
      { id: "computers", label: "Computers & Tablets", href: "/electronics/computers" },
      { id: "tvs-audio", label: "TVs & Audio", href: "/electronics/tvs-audio" },
      { id: "cameras-drones", label: "Cameras & Drones", href: "/electronics/cameras-drones" },
      { id: "gaming-consoles", label: "Gaming Consoles", href: "/electronics/gaming-consoles" },
    ],
    Fashion: [
      { id: "mens-clothing", label: "Men’s Clothing", href: "/fashion/mens-clothing" },
      { id: "womens-clothing", label: "Women’s Clothing", href: "/fashion/womens-clothing" },
      { id: "kids-clothing", label: "Kids' Clothing", href: "/fashion/kids-clothing" },
      { id: "shoes-footwear", label: "Shoes & Footwear", href: "/fashion/shoes-footwear" },
      { id: "bags-accessories", label: "Bags & Accessories", href: "/fashion/bags-accessories" },
      { id: "jewelry-watches", label: "Jewelry & Watches", href: "/fashion/jewelry-watches" },
    ],
    "Home & Living": [
      { id: "furniture", label: "Furniture", href: "/home-living/furniture" },
      { id: "home-decor", label: "Home Décor", href: "/home-living/home-decor" },
      { id: "kitchenware", label: "Kitchenware", href: "/home-living/kitchenware" },
      { id: "bedding-linen", label: "Bedding & Linen", href: "/home-living/bedding-linen" },
      { id: "lighting", label: "Lighting", href: "/home-living/lighting" },
    ],
    "Beauty & Personal Care": [
      { id: "skincare", label: "Skincare", href: "/beauty/skincare" },
      { id: "makeup", label: "Makeup", href: "/beauty/makeup" },
      { id: "hair-care", label: "Hair Care", href: "/beauty/hair-care" },
      { id: "fragrances", label: "Fragrances", href: "/beauty/fragrances" },
      { id: "mens-grooming", label: "Men's Grooming", href: "/beauty/mens-grooming" },
    ],
    "Health & Wellness": [
      { id: "supplements", label: "Supplements & Vitamins", href: "/health/supplements" },
      { id: "fitness-equipment", label: "Fitness Equipment", href: "/health/fitness-equipment" },
      { id: "medical-supplies", label: "Medical Supplies", href: "/health/medical-supplies" },
      { id: "ppe", label: "Personal Protective Equipment", href: "/health/ppe" },
    ],
    "Sports & Outdoors": [
      { id: "fitness-equipment", label: "Fitness Equipment", href: "/sports/fitness-equipment" },
      { id: "outdoor-gear", label: "Outdoor Gear", href: "/sports/outdoor-gear" },
      { id: "bicycles", label: "Bicycles & Accessories", href: "/sports/bicycles" },
      { id: "camping-hiking", label: "Camping & Hiking", href: "/sports/camping-hiking" },
    ],
    "Baby & Kids": [
      { id: "baby-clothing", label: "Baby Clothing", href: "/baby-kids/baby-clothing" },
      { id: "toys-games", label: "Toys & Games", href: "/baby-kids/toys-games" },
      { id: "baby-gear", label: "Baby Gear (Strollers, Car Seats)", href: "/baby-kids/baby-gear" },
      { id: "school-supplies", label: "School Supplies", href: "/baby-kids/school-supplies" },
    ],
    "Groceries & Food": [
      { id: "fresh-produce", label: "Fresh Produce", href: "/groceries/fresh-produce" },
      { id: "snacks-beverages", label: "Snacks & Beverages", href: "/groceries/snacks-beverages" },
      { id: "health-foods", label: "Health Foods", href: "/groceries/health-foods" },
      { id: "organic-products", label: "Organic Products", href: "/groceries/organic-products" },
    ],
    "Books & Stationery": [
      { id: "fiction", label: "Fiction & Non-Fiction", href: "/books/fiction" },
      { id: "academic-books", label: "Academic Books", href: "/books/academic-books" },
      { id: "office-supplies", label: "Office Supplies", href: "/books/office-supplies" },
      { id: "art-supplies", label: "Art Supplies", href: "/books/art-supplies" },
    ],
    Automotive: [
      { id: "car-accessories", label: "Car Accessories", href: "/automotive/car-accessories" },
      { id: "motorbike-accessories", label: "Motorbike Accessories", href: "/automotive/motorbike-accessories" },
      { id: "tools-equipment", label: "Tools & Equipment", href: "/automotive/tools-equipment" },
      { id: "vehicle-electronics", label: "Vehicle Electronics", href: "/automotive/vehicle-electronics" },
    ],
    "Pets Supplies": [
      { id: "pet-food", label: "Pet Food", href: "/pets/pet-food" },
      { id: "toys-accessories", label: "Toys & Accessories", href: "/pets/toys-accessories" },
      { id: "pet-care-products", label: "Pet Care Products", href: "/pets/pet-care-products" },
    ],
    "Tools & Hardware": [
      { id: "power-tools", label: "Power Tools", href: "/tools/power-tools" },
      { id: "hand-tools", label: "Hand Tools", href: "/tools/hand-tools" },
      { id: "building-materials", label: "Building Materials", href: "/tools/building-materials" },
      { id: "electrical-equipment", label: "Electrical Equipment", href: "/tools/electrical-equipment" },
    ],
    "Gifts & Special Occasions": [
      { id: "gift-cards", label: "Gift Cards", href: "/gifts/gift-cards" },
      { id: "seasonal-items", label: "Seasonal Items (e.g. Christmas, Valentine's Day)", href: "/gifts/seasonal-items" },
      { id: "personalized-gifts", label: "Personalized Gifts", href: "/gifts/personalized-gifts" },
    ],
  };
  return { category, children: options[category], id : index || [] };
});
export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const scrollRef = useRef();

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

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl justify-between px-4 py-4">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold">[logo]</Link>

          <div className="relative hidden lg:block w-[800px]">
            {/* Left fade shadow */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-10 z-20 bg-gradient-to-r from-white via-white to-transparent" />
            {/* Right fade shadow */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-10 z-20 bg-gradient-to-l from-white via-white to-transparent" />

            {/* Left scroll button */}
            <button
              onClick={() => scrollNav("left")}
              className="absolute left-0 z-30 h-full px-2"
              style={{ top: 0 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>

            {/* Scrollable menu */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 scroll-smooth px-8 relative z-10"
              style={{ scrollbarWidth: "none" }}
              onScroll={() => setOpenDropdown(null)}
            >
              {TYPES.map((item, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <button
                    className="dropdown-trigger whitespace-nowrap flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === item.id ? null : item.id);
                    }}
                  >
                    {item.category}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.id ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown rendered outside overflow-hidden area */}
                  {openDropdown === item.id && (
                    <div className="absolute top-full left-0 z-40">
                      <DropdownMenu items={item.children} isOpen={true} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right scroll button */}
            <button
              onClick={() => scrollNav("right")}
              className="absolute right-0 z-30 h-full px-2"
              style={{ top: 0 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>

        </div>

        <div className="flex items-center gap-4">
          <Link to="/sell" className="hidden lg:block text-sm font-medium text-blue-600 hover:text-blue-700">Sell</Link>

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
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >Sign in</Link>
            )
          )}

          <button className="lg:hidden p-1 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
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