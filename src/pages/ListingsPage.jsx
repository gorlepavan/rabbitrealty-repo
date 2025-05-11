import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/common/PageLayout';
import PropertyCard from '../components/common/PropertyCard';
import PropertyFilters from '../components/common/PropertyFilters';
import { getFilteredProperties } from '../data/properties';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const ListingsPage = () => {
  const [filters, setFilters] = useState({});
  const [properties, setProperties] = useState(getFilteredProperties({}));
  const [sortBy, setSortBy] = useState('newest');
  
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setProperties(getFilteredProperties(newFilters));
  };
  
  const handleSort = (method) => {
    setSortBy(method);
    
    const sortedProperties = [...properties];
    
    switch (method) {
      case 'newest':
        sortedProperties.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'priceAsc':
        sortedProperties.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sortedProperties.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setProperties(sortedProperties);
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PageLayout title="Property Listings">
      <div className="pt-24 pb-12 bg-secondary-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold mb-4">Find Your Perfect Property</h1>
          <p className="text-white/80 max-w-2xl">
            Browse our extensive collection of premium properties across India's most desirable locations.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <PropertyFilters onApplyFilters={handleApplyFilters} />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold text-secondary-800">
              {properties.length} Properties Available
            </h2>
          </div>
          
          <div className="flex items-center">
            <span className="text-secondary-600 mr-2">Sort by:</span>
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {properties.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            animate="show"
          >
            {properties.map((property) => (
              <motion.div key={property.id} variants={item}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="text-primary-500 mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">No Properties Found</h3>
            <p className="text-secondary-600 max-w-md mx-auto">
              We couldn't find any properties matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ListingsPage; 