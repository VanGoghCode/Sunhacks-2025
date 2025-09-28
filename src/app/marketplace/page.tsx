import React from 'react';
import { Button } from '../../components/ui/Button';

const MarketplacePage = () => {
  const products = [
    {
      id: 1,
      name: 'Eco-Friendly Water Bottles',
      price: '$24.99',
      image: '/api/placeholder/300/200',
      description: 'Sustainable bamboo fiber water bottles that keep drinks cool.',
      category: 'Lifestyle',
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: 'Solar Power Bank',
      price: '$49.99',
      image: '/api/placeholder/300/200',
      description: 'Portable solar charging station for all your devices.',
      category: 'Technology',
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Organic Cotton Tote',
      price: '$18.99',
      image: '/api/placeholder/300/200',
      description: 'Handwoven organic cotton bags for everyday use.',
      category: 'Fashion',
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 4,
      name: 'Bamboo Cutlery Set',
      price: '$15.99',
      image: '/api/placeholder/300/200',
      description: 'Complete bamboo cutlery set with carrying pouch.',
      category: 'Kitchen',
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 5,
      name: 'LED Plant Growth Kit',
      price: '$89.99',
      image: '/api/placeholder/300/200',
      description: 'Smart LED system for indoor herb gardens.',
      category: 'Gardening',
      rating: 4.5,
      reviews: 67,
    },
    {
      id: 6,
      name: 'Recycled Yoga Mat',
      price: '$39.99',
      image: '/api/placeholder/300/200',
      description: 'Premium yoga mat made from recycled ocean plastic.',
      category: 'Fitness',
      rating: 4.8,
      reviews: 143,
    },
  ];

  const categories = ['All', 'Lifestyle', 'Technology', 'Fashion', 'Kitchen', 'Gardening', 'Fitness'];

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
                Sustainable Marketplace
              </span>
            </h1>
            <p className="text-xl text-green-800 mb-8 max-w-2xl mx-auto">
              Discover eco-friendly products that make a positive impact on our planet
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sustainable products..."
                  className="w-full px-6 py-3 pl-12 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'primary' : 'outline'}
              size="sm"
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/50"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-200 to-forest-200 overflow-hidden">
                <div className="absolute inset-0 bg-green-300/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-green-700 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-green-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-700">
                    {product.price}
                  </span>
                  <Button variant="primary" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;