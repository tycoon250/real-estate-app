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
      description: "LGet expert services on Chika Online Market home repairs, cleaning, tech support, and more, delivered by trusted professionals near you."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(carouselItems.length / getItemsPerSlide()));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(carouselItems.length / getItemsPerSlide())) % Math.ceil(carouselItems.length / getItemsPerSlide()));
  };

  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(4);

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

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* Services Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            LOOKING FOR RENT. BUY. SELL. SERVE. ALL IN ONE PLACE
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm lg:text-base leading-relaxed">
            Highlights the four key functions your platform provides in one convenient location. 
            Emphasizes that users can find everything from products to services on your platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              {/* Icon Circle */}
              <div className="w-24 h-24 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <div className="text-3xl text-white">
                  {service.icon === "👨‍💻" && (
                    <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-green-500 font-bold text-lg">R</span>
                    </div>
                  )}
                  {service.icon === "🔧" && (
                    <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-green-500 font-bold text-lg">B</span>
                    </div>
                  )}
                  {service.icon === "💻" && (
                    <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-green-500 font-bold text-lg">R</span>
                    </div>
                  )}
                  {service.icon === "📱" && (
                    <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-green-500 font-bold text-lg">S</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Service Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-3 tracking-wide">
                {service.title}
              </h3>
              
              {/* Service Description */}
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
             TERMS AND CONDITIONS
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / Math.ceil(carouselItems.length / itemsPerSlide))}%)`
              }}
            >
              {carouselItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex-shrink-0 px-3 ${
                    itemsPerSlide === 1 ? 'w-full' :
                    itemsPerSlide === 2 ? 'w-1/2' :
                    'w-1/4'
                  }`}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Image */}
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-green-500 transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                      
                      {/* Meta Info */}
                      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
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
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      
                      {/* Read More Link */}
                      <a 
                        href="#" 
                        className="text-green-500 text-sm font-medium hover:text-green-600 transition-colors"
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={20} className={`${currentSlide === 0 ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            disabled={currentSlide >= Math.ceil(carouselItems.length / itemsPerSlide) - 1}
          >
            <ChevronRight size={20} className={`${currentSlide >= Math.ceil(carouselItems.length / itemsPerSlide) - 1 ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(carouselItems.length / itemsPerSlide) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}