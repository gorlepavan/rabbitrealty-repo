import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Users, ArrowRight } from 'lucide-react';
import PageLayout from '../components/common/PageLayout';
import { useUser } from '../context/UserContext';
import RabbitLogo from '../components/common/RabbitLogo';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate login process (in a real app this would call an API)
    setTimeout(() => {
      login(email, password, role);
      setLoading(false);
      
      // Redirect based on role
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'agent':
          navigate('/agent');
          break;
        case 'customer':
          navigate('/customer');
          break;
        default:
          navigate('/');
      }
    }, 1000);
  };
  
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };
  
  const roleOptions = [
    { id: 'customer', label: 'Customer', icon: <User size={20} /> },
    { id: 'agent', label: 'Agent', icon: <Users size={20} /> },
    { id: 'admin', label: 'Admin', icon: <Shield size={20} /> }
  ];

  return (
    <PageLayout title="Login">
      <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 bg-secondary-50">
        <div className="w-full max-w-md">
          <motion.div
            className="bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-secondary-900 py-6 px-8 text-center">
              <div className="flex justify-center mb-4">
                <RabbitLogo size={60} color="#ff0000" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-white">Welcome Back</h1>
              <p className="text-white/70 text-sm mt-2">Log in to your account to continue</p>
            </div>
            
            <div className="p-8">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Account Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {roleOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`flex flex-col items-center justify-center p-3 rounded-md border transition-all ${
                          role === option.id
                            ? 'border-primary-600 bg-primary-50 text-primary-600'
                            : 'border-secondary-200 text-secondary-600 hover:border-primary-400'
                        }`}
                        onClick={() => handleRoleChange(option.id)}
                      >
                        <div className={`mb-1 ${role === option.id ? 'text-primary-600' : 'text-secondary-500'}`}>
                          {option.icon}
                        </div>
                        <span className="text-xs font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-secondary-700" htmlFor="password">
                      Password
                    </label>
                    <a href="#" className="text-xs text-primary-600 hover:text-primary-800">
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••••"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full btn-primary py-3 flex items-center justify-center"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Sign In <ArrowRight size={16} className="ml-2" />
                    </span>
                  )}
                </motion.button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                <span className="text-secondary-600">Don't have an account yet?</span>
                <Link to="/signup" className="ml-1 text-primary-600 hover:text-primary-800 font-medium">
                  Sign up now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage; 