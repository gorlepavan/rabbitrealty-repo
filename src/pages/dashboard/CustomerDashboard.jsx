import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Heart, 
  Clock, 
  MapPin, 
  LogOut, 
  Search,
  ChevronDown,
  Trash2,
  MessageCircle
} from 'lucide-react';
import PageLayout from '../../components/common/PageLayout';
import { useUser } from '../../context/UserContext';
import { properties } from '../../data/properties';
import PropertyCard from '../../components/common/PropertyCard';

const CustomerDashboard = () => {
  const { isLoggedIn, userRole, userName, logout, favorites } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Redirect if not logged in as customer
  React.useEffect(() => {
    if (!isLoggedIn || userRole !== 'customer') {
      navigate('/login');
    }
  }, [isLoggedIn, userRole, navigate]);
  
  const favoriteProperties = properties.filter(property => favorites.includes(property.id));
  
  // Mock search history
  const searchHistory = [
    { id: 1, query: 'Villa in Mumbai', date: '2024-03-15' },
    { id: 2, query: 'Apartments in Bangalore under 1 Cr', date: '2024-03-12' },
    { id: 3, query: '3 BHK in Delhi', date: '2024-03-10' },
    { id: 4, query: 'Properties with pool', date: '2024-03-05' }
  ];
  
  // Mock recent views
  const recentViews = [
    { id: '1', date: '2024-03-18' },
    { id: '3', date: '2024-03-17' },
    { id: '2', date: '2024-03-15' }
  ];
  
  const recentViewProperties = recentViews
    .map(view => properties.find(p => p.id === view.id))
    .filter(Boolean);
  
  const tabItems = [
    { id: 'favorites', label: 'Saved Properties', icon: <Heart size={20} /> },
    { id: 'recent', label: 'Recently Viewed', icon: <Clock size={20} /> },
    { id: 'searches', label: 'Recent Searches', icon: <Search size={20} /> }
  ];
  
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'favorites':
        return (
          <div>
            <h2 className="text-xl font-semibold text-secondary-800 mb-6">
              Saved Properties ({favoriteProperties.length})
            </h2>
            
            {favoriteProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-secondary-400 mb-4">
                  <Heart size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">No Saved Properties</h3>
                <p className="text-secondary-600 mb-6">
                  You haven't saved any properties yet. Browse our listings and click the heart icon to save properties you like.
                </p>
                <Link to="/listings" className="btn-primary inline-flex items-center">
                  Browse Properties
                </Link>
              </div>
            )}
          </div>
        );
      case 'recent':
        return (
          <div>
            <h2 className="text-xl font-semibold text-secondary-800 mb-6">
              Recently Viewed Properties
            </h2>
            
            {recentViewProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentViewProperties.map((property) => (
                  property && <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-secondary-400 mb-4">
                  <Clock size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">No Recently Viewed Properties</h3>
                <p className="text-secondary-600 mb-6">
                  You haven't viewed any properties recently. Browse our listings to find your dream home.
                </p>
                <Link to="/listings" className="btn-primary inline-flex items-center">
                  Browse Properties
                </Link>
              </div>
            )}
          </div>
        );
      case 'searches':
        return (
          <div>
            <h2 className="text-xl font-semibold text-secondary-800 mb-6">
              Recent Searches
            </h2>
            
            {searchHistory.length > 0 ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {searchHistory.map((search) => (
                    <li key={search.id} className="flex items-center justify-between p-4 hover:bg-secondary-50">
                      <div>
                        <div className="flex items-center">
                          <Search size={16} className="text-secondary-500 mr-2" />
                          <span className="font-medium text-secondary-800">{search.query}</span>
                        </div>
                        <div className="text-sm text-secondary-500 mt-1">
                          {formatDate(search.date)}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link 
                          to={`/listings?search=${encodeURIComponent(search.query)}`}
                          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                        >
                          View Results
                        </Link>
                        <button className="text-secondary-500 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-secondary-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">No Recent Searches</h3>
                <p className="text-secondary-600 mb-6">
                  You haven't performed any searches yet. Use our search feature to find properties.
                </p>
                <Link to="/listings" className="btn-primary inline-flex items-center">
                  Search Properties
                </Link>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout title="Customer Dashboard">
      <div className="min-h-screen bg-secondary-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="lg:w-64">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6 bg-secondary-900 text-white">
                  <h2 className="font-heading text-xl font-semibold mb-1">My Dashboard</h2>
                  <p className="text-white/70 text-sm">Welcome back, {userName}</p>
                </div>
                
                <div className="p-4">
                  <nav className="space-y-1">
                    {tabItems.map((item) => (
                      <button
                        key={item.id}
                        className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                          activeTab === item.id
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-secondary-600 hover:bg-secondary-50'
                        }`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      to="/contact"
                      className="w-full flex items-center px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-md"
                    >
                      <MessageCircle size={20} className="mr-3" />
                      <span className="font-medium">Contact Support</span>
                    </Link>
                    
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-md"
                    >
                      <LogOut size={20} className="mr-3" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:flex-1">
              {/* Property Search Bar */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-grow relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for properties..."
                      className="input-field pl-10"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="relative">
                      <button className="input-field flex items-center justify-between min-w-[140px]">
                        <span>Location</span>
                        <ChevronDown size={16} />
                      </button>
                    </div>
                    
                    <div className="relative">
                      <button className="input-field flex items-center justify-between min-w-[140px]">
                        <span>Price Range</span>
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <button className="btn-primary whitespace-nowrap">
                    Search
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CustomerDashboard; 