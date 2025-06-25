import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const newsItems = [
  {
    title: 'Market Trends: Chika online Prices Soar in Prime Locations',
    date: '2025-03-15',
    image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Latest market analysis reveals significant price increases in prime chika online locations, driven by growing demand and limited inventory.',
  },
  {
    title: 'New Luxury Development Project Announced',
    date: '2025-03-10',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Exciting new luxury development project announced in the heart of the city, featuring state-of-the-art amenities and sustainable design.',
  },
  {
    title: 'Investment Opportunities in Emerging Markets',
    date: '2025-03-05',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Discover promising investment opportunities in emerging chika online markets with high growth potential.',
  },
];

function News() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Latest News</h1>
        <div className="grid gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full md:w-64 object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h2>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <button className="inline-flex items-center text-green-80 hover:text-blue-700 font-medium">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;