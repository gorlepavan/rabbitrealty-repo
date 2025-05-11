import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';

const PropertyFilters = ({ onApplyFilters }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'villa', label: 'Villa' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'land', label: 'Land' }
  ];

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '1000000', label: '₹10 Lac' },
    { value: '5000000', label: '₹50 Lac' },
    { value: '10000000', label: '₹1 Cr' },
    { value: '20000000', label: '₹2 Cr' },
    { value: '50000000', label: '₹5 Cr' }
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: ''
    });
    onApplyFilters({});
  };

  const filterVariants = {
    collapsed: { height: '80px' },
    expanded: { height: 'auto' }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 mb-8"
      variants={filterVariants}
      initial="collapsed"
      animate={expanded ? 'expanded' : 'collapsed'}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-grow min-w-[250px]">
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  placeholder="Location (City, State)"
                  className="input-field pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
            >
              {expanded ? (
                <>
                  <span>Less Filters</span>
                  <ChevronUp size={18} className="ml-1" />
                </>
              ) : (
                <>
                  <span>More Filters</span>
                  <ChevronDown size={18} className="ml-1" />
                </>
              )}
            </button>
            
            <button
              type="submit"
              className="btn-primary min-w-[100px]"
            >
              Search
            </button>
          </div>
          
          {/* Expanded filters */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden ${expanded ? 'block' : 'hidden'}`}>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Property Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleInputChange}
                className="input-field"
              >
                {propertyTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Min Price
              </label>
              <select
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                className="input-field"
              >
                {priceRanges.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Max Price
              </label>
              <select
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                className="input-field"
              >
                {priceRanges.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Bedrooms
              </label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleInputChange}
                className="input-field"
              >
                {bedroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center text-secondary-600 hover:text-secondary-800 transition-colors"
              >
                <X size={18} className="mr-1" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PropertyFilters; 