import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Move, 
  Heart, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Check,
  Send
} from 'lucide-react';
import PageLayout from '../components/common/PageLayout';
import { getPropertyById } from '../data/properties';
import { useUser } from '../context/UserContext';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, favorites, addToFavorites, removeFromFavorites } = useUser();
  
  const [property, setProperty] = useState(id ? getPropertyById(id) : null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  
  const isFavorite = property ? favorites.includes(property.id) : false;
  
  useEffect(() => {
    if (!property) {
      navigate('/404');
    }
  }, [property, navigate]);
  
  if (!property) {
    return null;
  }
  
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price.toLocaleString()}`;
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    // Simulate sending a message
    setTimeout(() => {
      setMessageSent(true);
      setMessage('');
      
      // Reset message sent status after 3 seconds
      setTimeout(() => {
        setMessageSent(false);
      }, 3000);
    }, 1000);
  };

  return (
    <PageLayout title={property.title}>
      <div className="pt-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-secondary-500 mb-4">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Properties</span>
            <span className="mx-2">/</span>
            <span className="text-primary-600">{property.title}</span>
          </div>
          
          <div className="flex flex-wrap items-start justify-between mb-6">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-secondary-800 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-secondary-500">
                <MapPin size={16} className="mr-1" />
                <span>
                  {property.location.city}, {property.location.state}, {property.location.country}
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="font-heading text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
                {formatPrice(property.price)}
              </div>
              <div className="inline-flex px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                {property.status.toUpperCase()}
              </div>
            </div>
          </div>
          
          {/* Property Images */}
          <div className="relative mb-10">
            <div 
              className="relative h-[300px] md:h-[500px] bg-secondary-100 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setShowGallery(true)}
            >
              <img 
                src={property.images[currentImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 flex items-center justify-between">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="ml-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="mr-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white/80 rounded-full px-3 py-1 text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>
            
            {/* Thumbnail navigation */}
            <div className="hidden md:flex mt-4 space-x-4 overflow-x-auto py-2">
              {property.images.map((image, index) => (
                <div 
                  key={index}
                  className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 ${
                    index === currentImageIndex ? 'border-primary-600' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${property.title} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Full Gallery Modal */}
          <AnimatePresence>
            {showGallery && (
              <motion.div 
                className="fixed inset-0 z-50 bg-secondary-900/95 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button 
                  className="absolute top-4 right-4 p-2 bg-white rounded-full z-10"
                  onClick={() => setShowGallery(false)}
                >
                  <X size={24} />
                </button>
                
                <div className="w-full h-full p-4 md:p-12 flex items-center justify-center">
                  <div className="relative w-full h-[80vh]">
                    <img 
                      src={property.images[currentImageIndex]} 
                      alt={property.title} 
                      className="w-full h-full object-contain"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-between">
                      <button 
                        onClick={handlePrevImage}
                        className="ml-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="mr-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 bg-white/80 rounded-full px-3 py-1 text-sm">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              {/* Property Details */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex flex-wrap mb-6">
                  {property.type !== 'land' && (
                    <>
                      <div className="w-1/2 md:w-1/4 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="bg-primary-50 p-3 rounded-full mb-2">
                            <Bed size={24} className="text-primary-600" />
                          </div>
                          <span className="text-sm text-secondary-500">Bedrooms</span>
                          <span className="font-semibold text-secondary-800">{property.bedrooms}</span>
                        </div>
                      </div>
                      
                      <div className="w-1/2 md:w-1/4 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="bg-primary-50 p-3 rounded-full mb-2">
                            <Bath size={24} className="text-primary-600" />
                          </div>
                          <span className="text-sm text-secondary-500">Bathrooms</span>
                          <span className="font-semibold text-secondary-800">{property.bathrooms}</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="w-1/2 md:w-1/4 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary-50 p-3 rounded-full mb-2">
                        <Move size={24} className="text-primary-600" />
                      </div>
                      <span className="text-sm text-secondary-500">Area</span>
                      <span className="font-semibold text-secondary-800">{property.area} sq.ft</span>
                    </div>
                  </div>
                  
                  <div className="w-1/2 md:w-1/4 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary-50 p-3 rounded-full mb-2">
                        <Calendar size={24} className="text-primary-600" />
                      </div>
                      <span className="text-sm text-secondary-500">Listed On</span>
                      <span className="font-semibold text-secondary-800">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h2 className="font-heading text-xl font-semibold text-secondary-800 mb-4">
                  Description
                </h2>
                
                <p className="text-secondary-600 leading-relaxed mb-6">
                  {property.description}
                </p>
                
                <h2 className="font-heading text-xl font-semibold text-secondary-800 mb-4">
                  Features & Amenities
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} className="text-primary-600 mr-2" />
                      <span className="text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Map Section */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="font-heading text-xl font-semibold text-secondary-800 mb-4">
                  Location
                </h2>
                
                <div className="h-[300px] bg-secondary-100 rounded-md overflow-hidden mb-4">
                  <iframe
                    title="Property Location"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.location.city},${property.location.state},${property.location.country}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>
                
                <div className="flex items-center text-secondary-700">
                  <MapPin size={18} className="text-primary-600 mr-2" />
                  <span>
                    {property.location.city}, {property.location.state}, {property.location.country}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {/* Agent Contact Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-24">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={property.agent.photo} 
                      alt={property.agent.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-secondary-800">
                      {property.agent.name}
                    </h3>
                    <p className="text-sm text-secondary-500">
                      Property Agent
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-secondary-700">
                    <Phone size={16} className="text-primary-600 mr-2" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center text-secondary-700">
                    <Mail size={16} className="text-primary-600 mr-2" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>
                
                <form onSubmit={handleSendMessage} className="mb-4">
                  <div className="mb-4">
                    <textarea
                      className="input-field min-h-[120px]"
                      placeholder="Send a message to the agent..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center"
                    disabled={messageSent}
                  >
                    {messageSent ? (
                      <>
                        <Check size={18} className="mr-2" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
                
                {isLoggedIn && (
                  <button
                    onClick={handleFavoriteToggle}
                    className={`w-full flex items-center justify-center py-2 px-4 rounded-md border transition-colors ${
                      isFavorite 
                        ? 'bg-primary-50 border-primary-600 text-primary-600'
                        : 'border-secondary-300 text-secondary-700 hover:border-primary-600 hover:text-primary-600'
                    }`}
                  >
                    <Heart 
                      size={18} 
                      className={`mr-2 ${isFavorite ? 'fill-primary-600' : ''}`} 
                    />
                    {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PropertyDetailsPage; 