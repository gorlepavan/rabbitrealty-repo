import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  BarChart4, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowUpRight
} from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageLayout from '../../components/common/PageLayout';
import { useUser } from '../../context/UserContext';
import { properties } from '../../data/properties';
import { agents } from '../../data/agents';
import { customers } from '../../data/customers';

const AdminDashboard = () => {
  const { isLoggedIn, userRole, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Redirect if not logged in as admin
  useEffect(() => {
    if (!isLoggedIn || userRole !== 'admin') {
      navigate('/login');
    }
  }, [isLoggedIn, userRole, navigate]);
  
  // Mock data for analytics
  const salesData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
    { name: 'Aug', value: 3200 },
    { name: 'Sep', value: 2800 },
    { name: 'Oct', value: 2500 },
    { name: 'Nov', value: 4000 },
    { name: 'Dec', value: 5000 }
  ];
  
  const statsData = [
    { title: 'Total Properties', value: properties.length, icon: <Home size={20} />, trend: '+12%', color: 'bg-blue-500' },
    { title: 'Active Agents', value: agents.length, icon: <Users size={20} />, trend: '+5%', color: 'bg-green-500' },
    { title: 'Customers', value: customers.length, icon: <Users size={20} />, trend: '+18%', color: 'bg-purple-500' },
    { title: 'Revenue', value: '₹24.5L', icon: <BarChart4 size={20} />, trend: '+22%', color: 'bg-amber-500' }
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`${stat.color} rounded-full p-3 text-white mr-4`}>
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="text-secondary-600 text-sm font-medium">{stat.title}</h3>
                      <p className="text-secondary-900 text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                  <div className="text-sm text-green-600">
                    <span className="font-medium">{stat.trend}</span> vs last month
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <h2 className="text-lg font-semibold text-secondary-800 mb-4">Sales Overview</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#718096" />
                      <YAxis stroke="#718096" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '0.5rem'
                        }} 
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ff0000"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Sales (₹000s)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <h2 className="text-lg font-semibold text-secondary-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: 'New property listed', property: 'Luxury Villa in Mumbai', time: '2 hours ago', type: 'new' },
                    { action: 'Property sold', property: 'Modern Apartment in Bangalore', time: '1 day ago', type: 'sold' },
                    { action: 'Price updated', property: 'Penthouse in Delhi', time: '2 days ago', type: 'update' },
                    { action: 'New agent joined', property: 'Vikram Singh', time: '1 week ago', type: 'agent' },
                    { action: 'New customer registered', property: 'Preeti Sharma', time: '1 week ago', type: 'customer' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1 ${
                        activity.type === 'new' 
                          ? 'bg-green-100 text-green-600' 
                          : activity.type === 'sold' 
                          ? 'bg-blue-100 text-blue-600'
                          : activity.type === 'update'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'new' ? (
                          <Plus size={16} />
                        ) : activity.type === 'sold' ? (
                          <ArrowUpRight size={16} />
                        ) : activity.type === 'update' ? (
                          <Edit size={16} />
                        ) : activity.type === 'agent' || activity.type === 'customer' ? (
                          <Users size={16} />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-medium text-secondary-800">{activity.action}</p>
                        <p className="text-secondary-600 text-sm">{activity.property}</p>
                        <p className="text-secondary-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Quick Access */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <h2 className="text-lg font-semibold text-secondary-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: 'Add Property', icon: <Home size={20} />, color: 'bg-primary-100 text-primary-600' },
                  { title: 'Add Agent', icon: <Users size={20} />, color: 'bg-green-100 text-green-600' },
                  { title: 'Analytics', icon: <BarChart4 size={20} />, color: 'bg-blue-100 text-blue-600' },
                  { title: 'Settings', icon: <Settings size={20} />, color: 'bg-purple-100 text-purple-600' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
                  >
                    <div className={`${action.color} rounded-full p-3 mx-auto mb-3`}>
                      {action.icon}
                    </div>
                    <span className="text-secondary-800 font-medium">{action.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        );
      case 'properties':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-secondary-800">Properties Management</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="input-field pl-10 py-2"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <button className="btn-primary flex items-center">
                  <Plus size={18} className="mr-2" />
                  Add Property
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded overflow-hidden bg-secondary-100 mr-3">
                              <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="text-sm font-medium text-secondary-900">{property.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-600">{property.location.city}, {property.location.state}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900">
                            {property.price >= 10000000
                              ? `₹${(property.price / 10000000).toFixed(2)} Cr`
                              : property.price >= 100000
                              ? `₹${(property.price / 100000).toFixed(2)} Lac`
                              : `₹${property.price.toLocaleString()}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            property.status === 'available'
                              ? 'bg-green-100 text-green-800'
                              : property.status === 'sold'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-600">{property.agent.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-3">
                            <button className="text-secondary-600 hover:text-primary-600">
                              <Edit size={18} />
                            </button>
                            <button className="text-secondary-600 hover:text-red-600">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'agents':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-secondary-800">Agents Management</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search agents..."
                    className="input-field pl-10 py-2"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <button className="btn-primary flex items-center">
                  <Plus size={18} className="mr-2" />
                  Add Agent
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-secondary-100 mr-4">
                        <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-800">{agent.name}</h3>
                        <p className="text-secondary-600">{agent.email}</p>
                        <p className="text-secondary-600">{agent.phone}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-secondary-600">Properties:</span>
                        <span className="font-medium text-secondary-800">{agent.properties.length}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-secondary-600">Customers:</span>
                        <span className="font-medium text-secondary-800">{agent.customers.length}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-secondary-600">Experience:</span>
                        <span className="font-medium text-secondary-800">{agent.experience} years</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-600">Rating:</span>
                        <span className="font-medium text-secondary-800">{agent.rating}/5</span>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex space-x-3 pt-4 border-t border-gray-100">
                      <button className="btn-outline text-sm py-1 flex-1">View Profile</button>
                      <button className="text-secondary-600 hover:text-primary-600 p-2">
                        <Edit size={18} />
                      </button>
                      <button className="text-secondary-600 hover:text-red-600 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'customers':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-secondary-800">Customers Management</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="input-field pl-10 py-2"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Favorites
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Inquiries
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary-100 mr-3">
                              {customer.photo ? (
                                <img src={customer.photo} alt={customer.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-secondary-200 text-secondary-600">
                                  {customer.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="text-sm font-medium text-secondary-900">{customer.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-600">{customer.email}</div>
                          <div className="text-sm text-secondary-600">{customer.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-600">{customer.favorites.length} properties</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-600">{customer.inquiries.length} inquiries</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-3">
                            <button className="text-secondary-600 hover:text-primary-600">
                              <Edit size={18} />
                            </button>
                            <button className="text-secondary-600 hover:text-red-600">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'properties', label: 'Properties', icon: <Home size={20} /> },
    { id: 'agents', label: 'Agents', icon: <Users size={20} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart4 size={20} /> }
  ];

  return (
    <PageLayout title="Admin Dashboard">
      <div className="min-h-screen bg-secondary-50 pt-16">
        {/* Mobile sidebar button */}
        <div className="lg:hidden fixed top-16 left-4 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-white shadow-md text-secondary-800"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Sidebar */}
        <div
          className={`fixed top-16 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-10 transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex-grow">
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === item.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-secondary-600 hover:bg-secondary-50 rounded-md"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className={`lg:pl-64 transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-0'}`}>
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard; 