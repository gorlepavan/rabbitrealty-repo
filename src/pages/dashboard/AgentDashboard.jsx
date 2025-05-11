import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  MessageCircle, 
  Users, 
  LogOut, 
  Plus,
  MessageSquare,
  Edit,
  Trash2,
  Save,
  X,
  Send
} from 'lucide-react';
import PageLayout from '../../components/common/PageLayout';
import { useUser } from '../../context/UserContext';
import { properties } from '../../data/properties';
import { agents } from '../../data/agents';
import { customers } from '../../data/customers';

const AgentDashboard = () => {
  const { isLoggedIn, userRole, userName, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // Redirect if not logged in as agent
  useEffect(() => {
    if (!isLoggedIn || userRole !== 'agent') {
      navigate('/login');
    }
  }, [isLoggedIn, userRole, navigate]);
  
  const agent = agents.find(a => a.name.toLowerCase().includes(userName.toLowerCase()));
  const agentProperties = agent 
    ? properties.filter(p => agent.properties.includes(p.id)) 
    : [];
  const agentCustomers = agent 
    ? customers.filter(c => agent.customers.includes(c.id)) 
    : [];
  
  // Mock chat data
  const [chatMessages, setChatMessages] = useState([
    { id: 1, customer: 'c1', text: 'Hi, I am interested in the villa in Mumbai. Is it still available?', timestamp: '10:30 AM', sender: 'customer' },
    { id: 2, customer: 'c1', text: 'Yes, it is still available. Would you like to schedule a viewing?', timestamp: '10:32 AM', sender: 'agent' },
    { id: 3, customer: 'c1', text: 'That would be great! When would be a good time?', timestamp: '10:35 AM', sender: 'customer' },
    { id: 4, customer: 'c2', text: 'Hello, I have some questions about the apartment in Bangalore', timestamp: '11:45 AM', sender: 'customer' },
    { id: 5, customer: 'c2', text: 'Sure, I would be happy to answer any questions you have.', timestamp: '11:50 AM', sender: 'agent' }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedCustomer) return;
    
    const newMsg = {
      id: chatMessages.length + 1,
      customer: selectedCustomer,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'agent'
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setNewMessage('');
  };
  
  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
    setShowChat(true);
  };
  
  const customerMessages = selectedCustomer
    ? chatMessages.filter(msg => msg.customer === selectedCustomer)
    : [];
  
  const getCustomerName = (id) => {
    const customer = customers.find(c => c.id === id);
    return customer ? customer.name : 'Unknown Customer';
  };
  
  const getCustomerPhoto = (id) => {
    const customer = customers.find(c => c.id === id);
    return customer?.photo || 'https://via.placeholder.com/40';
  };
  
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price.toLocaleString()}`;
  };
  
  const tabItems = [
    { id: 'properties', label: 'My Properties', icon: <Home size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageCircle size={20} /> },
    { id: 'customers', label: 'My Customers', icon: <Users size={20} /> }
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'properties':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-secondary-800">My Properties</h2>
              <button
                onClick={() => setShowAddProperty(true)}
                className="btn-primary flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Add Property
              </button>
            </div>
            
            {agentProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agentProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="h-48 relative">
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                      <div className="absolute top-0 left-0 p-2 bg-primary-600 text-white font-semibold rounded-br-md">
                        {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-secondary-900/80 to-transparent">
                        <h3 className="font-heading text-lg font-semibold text-white">{property.title}</h3>
                        <p className="text-white/90 text-sm">
                          {property.location.city}, {property.location.state}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-heading font-bold text-lg text-primary-600">
                          {formatPrice(property.price)}
                        </span>
                        <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-800 rounded">
                          {property.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap text-sm text-secondary-600 mb-4">
                        {property.type !== 'land' && (
                          <>
                            <div className="w-1/3 mb-2">
                              <span className="font-semibold">{property.bedrooms}</span> Beds
                            </div>
                            <div className="w-1/3 mb-2">
                              <span className="font-semibold">{property.bathrooms}</span> Baths
                            </div>
                          </>
                        )}
                        <div className="w-1/3 mb-2">
                          <span className="font-semibold">{property.area}</span> sq.ft
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="btn-outline py-1 px-3 text-sm flex-1">View Details</button>
                        <button className="p-2 text-secondary-600 hover:text-primary-600">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-secondary-600 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-secondary-400 mb-4">
                  <Home size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">No Properties Yet</h3>
                <p className="text-secondary-600 mb-6">
                  You haven't added any properties yet. Click the button above to add your first property.
                </p>
                <button
                  onClick={() => setShowAddProperty(true)}
                  className="btn-primary inline-flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Your First Property
                </button>
              </div>
            )}
            
            {/* Add Property Modal */}
            {showAddProperty && (
              <div className="fixed inset-0 bg-secondary-900/80 flex items-center justify-center z-50 p-4">
                <motion.div
                  className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-secondary-800">Add New Property</h2>
                    <button 
                      onClick={() => setShowAddProperty(false)}
                      className="text-secondary-500 hover:text-secondary-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Property Title
                          </label>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Luxury Villa in Mumbai"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Property Type
                          </label>
                          <select className="input-field">
                            <option value="">Select Type</option>
                            <option value="villa">Villa</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="penthouse">Penthouse</option>
                            <option value="land">Land</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Price (₹)
                          </label>
                          <input
                            type="number"
                            className="input-field"
                            placeholder="Price in INR"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Area (sq.ft)
                          </label>
                          <input
                            type="number"
                            className="input-field"
                            placeholder="Area in square feet"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Bedrooms
                          </label>
                          <input
                            type="number"
                            className="input-field"
                            placeholder="Number of bedrooms"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Bathrooms
                          </label>
                          <input
                            type="number"
                            className="input-field"
                            placeholder="Number of bathrooms"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Location
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            className="input-field"
                            placeholder="City"
                          />
                          <input
                            type="text"
                            className="input-field"
                            placeholder="State"
                          />
                          <input
                            type="text"
                            className="input-field"
                            placeholder="Country"
                            defaultValue="India"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Description
                        </label>
                        <textarea
                          className="input-field min-h-[120px]"
                          placeholder="Describe the property..."
                        ></textarea>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Images
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                          <div className="text-secondary-500 mb-3">
                            <Plus size={32} className="mx-auto" />
                          </div>
                          <p className="text-secondary-600 mb-2">
                            Drag and drop images here, or click to select files
                          </p>
                          <p className="text-secondary-500 text-xs">
                            Maximum 5 images, each up to 5MB
                          </p>
                          <input type="file" className="hidden" multiple accept="image/*" />
                          <button
                            type="button"
                            className="mt-4 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors"
                          >
                            Select Files
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() => setShowAddProperty(false)}
                          className="px-4 py-2 text-secondary-700 hover:text-secondary-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn-primary flex items-center"
                        >
                          <Save size={18} className="mr-2" />
                          Save Property
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        );
      case 'messages':
        return (
          <div>
            <h2 className="text-xl font-semibold text-secondary-800 mb-6">Customer Messages</h2>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-3">
              {/* Customers list */}
              <div className="md:col-span-1 border-r border-gray-200">
                <div className="p-4">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="input-field pl-10"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  
                  <div className="space-y-1">
                    {Array.from(new Set(chatMessages.map(msg => msg.customer))).map(customerId => {
                      const lastMessage = [...chatMessages]
                        .filter(msg => msg.customer === customerId)
                        .pop();
                      
                      return (
                        <button
                          key={customerId}
                          className={`w-full text-left p-3 rounded-md transition-colors ${
                            selectedCustomer === customerId
                              ? 'bg-primary-50 text-primary-600'
                              : 'hover:bg-secondary-50'
                          }`}
                          onClick={() => handleCustomerSelect(customerId)}
                        >
                          <div className="flex items-start">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary-100 mr-3">
                              <img
                                src={getCustomerPhoto(customerId)}
                                alt={getCustomerName(customerId)}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium text-secondary-800 truncate">
                                  {getCustomerName(customerId)}
                                </h4>
                                <span className="text-xs text-secondary-500">{lastMessage?.timestamp}</span>
                              </div>
                              <p className="text-sm text-secondary-600 truncate">
                                {lastMessage?.text}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Chat area */}
              <div className="md:col-span-2 flex flex-col h-[calc(100vh-12rem)]">
                {selectedCustomer ? (
                  <>
                    <div className="p-4 border-b border-gray-200 flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary-100 mr-3">
                        <img
                          src={getCustomerPhoto(selectedCustomer)}
                          alt={getCustomerName(selectedCustomer)}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary-800">
                          {getCustomerName(selectedCustomer)}
                        </h4>
                        <p className="text-xs text-secondary-500">
                          Active now
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {customerMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'agent'
                                ? 'bg-primary-600 text-white'
                                : 'bg-secondary-100 text-secondary-800'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'agent' ? 'text-white/70' : 'text-secondary-500'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="input-field flex-1 mr-2"
                        />
                        <button
                          type="submit"
                          className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-secondary-500">
                    <div className="text-center">
                      <MessageSquare size={48} className="mx-auto mb-4" />
                      <p>Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'customers':
        return (
          <div>
            <h2 className="text-xl font-semibold text-secondary-800 mb-6">My Customers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentCustomers.map((customer) => (
                <div key={customer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-secondary-100 mr-4">
                        {customer.photo ? (
                          <img src={customer.photo} alt={customer.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-secondary-200 text-secondary-600">
                            {customer.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-800">{customer.name}</h3>
                        <p className="text-secondary-600">{customer.email}</p>
                        <p className="text-secondary-600">{customer.phone}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-secondary-600">Favorites:</span>
                        <span className="font-medium text-secondary-800">{customer.favorites.length} properties</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-600">Inquiries:</span>
                        <span className="font-medium text-secondary-800">{customer.inquiries.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex space-x-3 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleCustomerSelect(customer.id)}
                        className="btn-outline text-sm py-1 flex-1"
                      >
                        Message
                      </button>
                      <button className="text-secondary-600 hover:text-primary-600 p-2">
                        <Edit size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout title="Agent Dashboard">
      <div className="min-h-screen bg-secondary-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-secondary-800">Welcome back, {userName}!</h1>
              <p className="text-secondary-600">Here's what's happening with your properties today.</p>
            </div>
            <button
              onClick={logout}
              className="btn-outline flex items-center"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-6 py-4 text-sm font-medium border-b-2 ${
                      activeTab === item.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-secondary-600 hover:text-secondary-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AgentDashboard; 