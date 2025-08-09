import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PartnersPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL

  // Fetch partners from backend
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/contact/partners/all`);
        setPartners(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Reset current slide to prevent empty spaces
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get visible count based on screen size
  const getVisibleCount = useCallback(() => {
    if (windowWidth < 480) return 1;  // small mobile
    if (windowWidth < 640) return 2;  // mobile
    if (windowWidth < 768) return 3;  // tablet
    if (windowWidth < 1024) return 4; // small desktop
    return 5; // large desktop
  }, [windowWidth]);

  // Auto-scroll functionality with screen size awareness
  useEffect(() => {
    if (partners.length === 0) return;
    
    const timer = setInterval(() => {
      const maxSlides = Math.ceil(partners.length / getVisibleCount()) - 1;
      setCurrentSlide(prev => (prev >= maxSlides ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [getVisibleCount, partners.length]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const maxSlides = Math.ceil(partners.length / getVisibleCount()) - 1;
    
    if (Math.abs(distance) > 50) { // Minimum swipe distance
      if (distance > 0 && currentSlide < maxSlides) {
        setCurrentSlide(prev => prev + 1);
      }
      if (distance < 0 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <p>Loading partners...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto text-center text-red-500">
          <p>Error loading partners: {error}</p>
        </div>
      </div>
    );
  }

  if (partners.length === 0) {
    return (
      <div className="w-full bg-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <p>No partners available</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Our Partners</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">The companies that cooperate with us</p>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / getVisibleCount())}%)`,
              width: `${(partners.length / getVisibleCount()) * 100}%`
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
          </div>
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 sm:px-3 md:px-4"
            >
              <div className="bg-white rounded-lg p-3 sm:p-4 h-16 sm:h-20 md:h-24 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={API_URL+'/'+partner.logo.path}
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}

          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            className={`hidden md:block absolute left-0 top-2 translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors ${
              currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
            disabled={currentSlide === 0}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentSlide(prev => Math.min(Math.ceil(partners.length / getVisibleCount()) - 1, prev + 1))}
            className={`hidden md:block absolute right-0 top-2 translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors ${
              currentSlide === Math.ceil(partners.length / getVisibleCount()) - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
            disabled={currentSlide === Math.ceil(partners.length / getVisibleCount()) - 1}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {Array.from({ length: Math.ceil(partners.length / getVisibleCount()) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;