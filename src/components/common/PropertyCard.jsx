import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Move, Heart } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const PropertyCard = ({ property }) => {
  const { isLoggedIn, favorites, addToFavorites, removeFromFavorites } = useUser();
  const isFavorite = favorites.includes(property.id);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="card group h-full flex flex-col"
    >
      <Link to={`/property/${property.id}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-0 left-0 p-2 bg-primary-600 text-white font-semibold rounded-br-md">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </div>
            {isLoggedIn && (
              <button
                onClick={handleFavoriteToggle}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-transform hover:scale-110"
              >
                <Heart 
                  size={20} 
                  className={isFavorite ? 'fill-primary-600 text-primary-600' : 'text-secondary-500'} 
                />
              </button>
            )}
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-secondary-800 mb-1 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-secondary-500 mb-3">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">
                {property.location.city}, {property.location.state}
              </span>
            </div>
            <div className="flex justify-between text-sm text-secondary-600 mb-4">
              {property.type !== 'land' && (
                <>
                  <div className="flex items-center">
                    <Bed size={16} className="mr-1" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath size={16} className="mr-1" />
                    <span>{property.bathrooms}</span>
                  </div>
                </>
              )}
              <div className="flex items-center">
                <Move size={16} className="mr-1" />
                <span>{property.area} sq.ft</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="font-heading font-bold text-lg text-primary-600">
              {formatPrice(property.price)}
            </div>
            <div className="text-xs px-2 py-1 bg-secondary-100 text-secondary-800 rounded">
              {property.status.toUpperCase()}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard; 