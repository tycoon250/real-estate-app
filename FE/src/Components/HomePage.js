import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import housevia from "../Assets/housevia.png";
import house from "../Assets/house-2.png";
import cars from "../Assets/cars.jpeg";
import carRental from "../Assets/car-rental.png"
import clothes from "../Assets/clothes.png"
import electronicDevices from "../Assets/electronic-devices.png";


const HomePage = () => {
  const [filters, setFilters] = useState({
    lookingFor: "",
    location: "",
    propertyType: "",
    propertySize: "",
    budget: "",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: house, title: "Market-backed valuations Rental yield data on every listing" },
    { image: carRental, title: "Whether a week or a lifetime, your car awaits." },
    { image: clothes, title: "Size-inclusive fits, fresh drops weekly." },
    { image: electronicDevices, title: "	Mobiles, appliances, office tech—one checkout, fast delivery." },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSearch = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (filters.lookingFor) queryParams.append("lookingFor", filters.lookingFor);
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.propertyType) queryParams.append("propertyType", filters.propertyType);
    if (filters.propertySize) queryParams.append("propertySize", filters.propertySize);
    if (filters.budget) queryParams.append("budget", filters.budget);

    navigate(`/search?${queryParams.toString()}`);
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[100vh] overflow-hidden mt-[-70px]">
        {/* Slideshow */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>

        {/* Hero Text */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 sm:px-6 lg:px-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center">
            {slides[currentSlide].title}
          </h1>
        </div>
          <div className="absolute top-2/3 left-1/2  transform -translate-x-1/2 -translate-y-1/4 px-4 sm:px-6 lg:px-10">
            <div className="max-w-4xl mx-auto text-white">
                    <div className="p-6 sm:p-10 bg-white/30 backdrop-blur-md  rounded-3xl shadow-2xl border border-white/20">
                      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
                      {/* <div className="flex flex-col">
                        <label className="mb-2 text-sm text-white font-bold">Looking for</label>
                        <select
                        className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
                        value={filters.lookingFor}
                        onChange={(e) => setFilters({ ...filters, lookingFor: e.target.value })}
                        >
                        <option value="">Choose</option>
                        <option value="Available">Available</option>
                        <option value="For Sale">Buy</option>
                        <option value="Rental">Rent</option>
                        </select>
                      </div> */}

                      <div className="flex flex-col">
                        <label className="mb-2 text-sm text-white font-bold">Name</label>
                        <input
                        type="text"
                        placeholder="Name"
                        className="p-2 border rounded-md border-gray-300 text-gray-800 "
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        />
                      </div>

                      {/* <div className="flex flex-col">
                        <label className="mb-2 text-sm text-white font-bold">Property Type</label>
                        <select
                        className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
                        value={filters.propertyType}
                        onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                        >
                        <option value="">Select type</option>
                        <option value="House">House</option>
                        <option value="Office">Office</option>
                        <option value="Land">Land</option>
                        <option value="Apartment/Condo">Apartment</option>
                        <option value="Commercial Space">Commercial</option>
                        <option value="Industrial Property">Industrial Property</option>
                        </select>
                      </div> */}

                      {/* <div className="flex flex-col">
                        <label className="mb-2 text-sm text-white font-bold">Property size</label>
                        <input
                        type="text"
                        placeholder="Any size"
                        className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
                        value={filters.propertySize}
                        onChange={(e) => setFilters({ ...filters, propertySize: e.target.value })}
                        />
                      </div> */}
{/* 
                      <div className="flex flex-col">
                        <label className="mb-2 text-sm text-white font-bold">Your Budget</label>
                        <input
                        type="text"
                        placeholder="Enter budget"
                        className="p-2 border rounded-md border-gray-300 text-gray-800 h-full w-full"
                        value={filters.budget}
                        onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                        />
                      </div> */}

                      <div className="flex flex-col">
                        <label className="mb-2 text-sm text-white font-bold">&nbsp;</label>
                        <button
                        type="submit"
                        className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full"
                        >
                        <Search className="h-5 w-5" />
                        <span>Search </span>
                        </button>
                      </div>
                      </form>
                    </div>
                    </div>
                  </div>

                  {/* Scroll Button */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          Scroll Down
        </button>
      </div>
    </div>
  );
};

export default HomePage;
