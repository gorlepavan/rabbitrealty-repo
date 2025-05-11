import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Users, ArrowRight, Check } from 'lucide-react';
import PageLayout from '../components/common/PageLayout';
import { useUser } from '../context/UserContext';
import RabbitLogo from '../components/common/RabbitLogo';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [role, setRole] = useState('customer');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };
  
  const prevStep = () => {
    setStep(1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 2 && validateStep2()) {
      setLoading(true);
      
      // Simulate signup process
      setTimeout(() => {
        login(formData.email, formData.password, role);
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
      }, 1500);
    }
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
    <PageLayout title="Sign Up">
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
              <h1 className="font-heading text-2xl font-bold text-white">Create Your Account</h1>
              <p className="text-white/70 text-sm mt-2">Join Rabbit Realty to find your dream property</p>
              
              {/* Progress Steps */}
              <div className="flex justify-center items-center mt-6">
                <div className="flex items-center">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    step >= 1 ? 'bg-primary-600 text-white' : 'bg-secondary-700 text-white/70'
                  }`}>
                    {step > 1 ? <Check size={18} /> : 1}
                  </div>
                  <div className={`w-16 h-1 ${
                    step > 1 ? 'bg-primary-600' : 'bg-secondary-700'
                  }`}></div>
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    step >= 2 ? 'bg-primary-600 text-white' : 'bg-secondary-700 text-white/70'
                  }`}>
                    2
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  // Step 1: Personal Information
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        I am a:
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
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>
                    
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      className="w-full btn-primary py-3 flex items-center justify-center"
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue <ArrowRight size={16} className="ml-2" />
                    </motion.button>
                  </motion.div>
                ) : (
                  // Step 2: Password Setup
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="••••••••••"
                      />
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="••••••••••"
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        className="btn-outline py-3"
                        whileTap={{ scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      
                      <motion.button
                        type="submit"
                        className="btn-primary py-3 flex items-center justify-center"
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
                          <span>Sign Up</span>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
                
                <div className="mt-6 text-center text-sm">
                  <span className="text-secondary-600">Already have an account?</span>
                  <Link to="/login" className="ml-1 text-primary-600 hover:text-primary-800 font-medium">
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignupPage; 