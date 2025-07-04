import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import housevia from "../Assets/housevia.png";
import house from "../Assets/house-2.png";
import cars from "../Assets/cars.jpeg";
import carRental from "../Assets/car-rental.png"
import clothes from "../Assets/clothes.png"
import electronicDevices from "../Assets/electronic-devices.png";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  const [filters, setFilters] = useState({
    lookingFor: "",
    location: "",
    propertyType: "",
    propertySize: "",
    budget: "",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0),
  [SearchVal,setSearchVal] = useState("");
  const demoPlaceholders = [
    "spider hoodie",
    "gaming laptop",
    "leather office chair",
    "wireless earbuds",
    "smart home kit"
  ];

  const slides = [
    { image: house, title: "Market-backed valuations Rental yield data on every listing" },
    { image: carRental, title: "Whether a week or a lifetime, your car awaits." },
    { image: clothes, title: "Size-inclusive fits, fresh drops weekly." },
    { image: electronicDevices, title: "Mobiles, appliances, office tech — one checkout, fast delivery." },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      // Don't change placeholder if user is typing
      if (!SearchVal.trim()) {
        setPlaceholderIndex((prev) => (prev + 1) % demoPlaceholders.length);
      }
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
  
    return () => clearInterval(interval);
  }, [slides.length, SearchVal]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) queryParams.append(key, val);
    });
    navigate(`/search/${SearchVal}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[100vh] overflow-hidden mt-[-112px]">
        {/* Slideshow */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>

        {/* Hero Text */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 sm:px-6 lg:px-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
            {slides[currentSlide].title}
          </h1>
        </div>

        {/* Alibaba-style Search Bar */}
        <div className="absolute top-2/3 w-full flex justify-center px-4 sm:px-6 lg:px-10">
          <form
            onSubmit={handleSearch}
            className="w-full max-w-3xl mx-auto mt-4 flex rounded-full overflow-hidden bg-white shadow-2xl border border-orange-500"
          >
            <div className="relative flex-grow">
            <input
                type="text"
                placeholder={demoPlaceholders[placeholderIndex]}
                value={SearchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full px-6 py-4 text-lg text-gray-700 focus:outline-none placeholder-gray-500 transition duration-300"
              />

            </div>

            <button
              type="button"
              className="px-5 flex items-center justify-center border-l border-gray-200 bg-white hover:bg-gray-100"
              title="Visual Search (coming soon)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V12m0 0V7.5m0 4.5h4.5M12 12H7.5m13.5 0A9 9 0 1112 3a9 9 0 0113.5 9z" />
              </svg>
            </button>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 font-semibold text-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

