import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MessageCircle, User } from 'lucide-react';
import RENT from '../Assets/RENT.jpg'; // Ensure this path is correct
import BUY from '../Assets/BUY.jpg'; // Ensure this path is correct
import SERVICE from '../Assets/SERVICE.jpg'; // Ensure this path is correct
import SELL from '../Assets/SELL.svg'; // Ensure this path is correct

export default function ServicesCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      id: 1,
      title: "rent",
      image: RENT,
      description: "Items must be returned in original condition. Late returns incur fees. Renters and owners must agree on period, usage terms, and responsibility for damages.",
      link: "Read more »"
    },
    {
      id: 2,
      title: "Buy",
      image: BUY,
      description: "All purchases are final unless seller offers return policy. Buyers must verify product details. Chika is not liable for disputes use verified sellers for safety.",
      link: "Read more »"
    },
    {
      id: 3,
      title: "Sell",
      image: SELL,
      description: "Sellers must list accurate product details and deliver on time. Fraud or misleading ads will be removed. Chika may suspend accounts violating marketplace policies.",
      link: "Read more »"
    },
    {
      id: 4,
      title: "Service",
      image: SERVICE,
      description: "Service providers must be qualified and professional. Clients pay as agreed. Chika holds no liability for poor service reviews help maintain trusted, quality providers.",
      link: "Read more »"
    }
  ];

  const services = [
    {
      icon: "👨‍💻",
      title: "SELL",
      description: "Turn your items into income on Chika Online Market reach thousands of buyers, post easily, and sell fast with confidence."
    },
    {
      icon: "🔧",
      title: "BUY",
      description: "Shop your favorite products on Chika Online Market affordable prices, trusted sellers, fast delivery, and a secure shopping experience every time."
    },
    {
      icon: "💻",
      title: "RENT",
      description: "Need something temporarily? Rent it easily on Chika Online Market affordable, flexible, and reliable solutions delivered to your doorstep."
    },
    {
      icon: "📱",
      title: "SERVICE",
      description: "Get expert services on Chika Online Market home repairs, cleaning, tech support, and more, delivered by trusted professionals near you."
    }
  ];

  // Responsive items per slide
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 4; // Desktop
    }
    return 4;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
      setCurrentSlide(0);
    };

    if (typeof window !== 'undefined') {
      setItemsPerSlide(getItemsPerSlide());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(carouselItems.length / itemsPerSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(carouselItems.length / itemsPerSlide)) % Math.ceil(carouselItems.length / itemsPerSlide));
  };

  return (
    <div className="bg-gray-50 py-10 sm:py-16">
      <div className="container mx-auto px-2 sm:px-4">
        
        {/* Services Section */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            LOOKING FOR RENT. BUY. SELL. SERVE. ALL IN ONE PLACE
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed">
            Highlights the four key functions your platform provides in one convenient location. 
            Emphasizes that users can find everything from products to services on your platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-20">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              {/* Icon Circle */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <div className="text-2xl sm:text-3xl text-white">
                  {service.icon === "👨‍💻" && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-green-500 font-bold text-base sm:text-lg">R</span>
                    </div>
                  )}
                  {service.icon === "🔧" && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-green-500 font-bold text-base sm:text-lg">B</span>
                    </div>
                  )}
                  {service.icon === "💻" && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-green-500 font-bold text-base sm:text-lg">R</span>
                    </div>
                  )}
                  {service.icon === "📱" && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-green-500 font-bold text-base sm:text-lg">S</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Service Title */}
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 tracking-wide">
                {service.title}
              </h3>
              
              {/* Service Description */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-1 sm:px-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
             TERMS AND CONDITIONS
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${(carouselItems.length / itemsPerSlide) * 100}%`,
                transform: `translateX(-${currentSlide * (100 / (carouselItems.length / itemsPerSlide))}%)`
              }}
            >
              {carouselItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex-shrink-0 px-2 sm:px-3 ${
                    itemsPerSlide === 1 ? 'w-full' :
                    itemsPerSlide === 2 ? 'w-1/2' :
                    'w-1/4'
                  }`}
                  style={{
                    minWidth: itemsPerSlide === 1 ? '100%' :
                        itemsPerSlide === 2 ? '50%' :
                        '25%',
                    maxWidth: itemsPerSlide === 1 ? '100%' :
                        itemsPerSlide === 2 ? '50%' :
                        '25%',
                  }}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    {/* Image */}
                    <div className="h-36 sm:h-48 bg-gray-200 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 sm:p-6 flex flex-col flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 hover:text-green-500 transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                      
                      {/* Meta Info */}
                      <div className="flex items-center text-xs text-gray-500 mb-2 sm:mb-3 space-x-2 sm:space-x-4">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle size={12} className="mr-1" />
                          <span>{item.comments}</span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4 flex-1">
                        {item.description}
                      </p>
                      
                      {/* Read More Link */}
                      <a 
                        href="#" 
                        className="text-green-500 text-xs sm:text-sm font-medium hover:text-green-600 transition-colors mt-auto"
                      >
                        {item.link}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            disabled={currentSlide === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={18} className={`${currentSlide === 0 ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            disabled={currentSlide >= Math.ceil(carouselItems.length / itemsPerSlide) - 1}
            aria-label="Next"
          >
            <ChevronRight size={18} className={`${currentSlide >= Math.ceil(carouselItems.length / itemsPerSlide) - 1 ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
            {Array.from({ length: Math.ceil(carouselItems.length / itemsPerSlide) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}