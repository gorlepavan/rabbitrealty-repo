import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Home, Building, MessageSquare, LayoutDashboard } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import RabbitLogo from '../common/RabbitLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, userRole, userName, logout } = useUser();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'agent':
        return '/agent';
      case 'customer':
        return '/customer';
      default:
        return '/login';
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-secondary-900 text-white shadow-lg py-3'
          : 'bg-transparent text-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
          <RabbitLogo size={40} color={isScrolled ? '#ff0000' : '#ff0000'} />
          <span className="ml-2 font-heading font-bold text-xl md:text-2xl">Rabbit Realty</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`font-medium hover:text-primary-400 transition-colors ${
              location.pathname === '/' ? 'text-primary-500' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/listings"
            className={`font-medium hover:text-primary-400 transition-colors ${
              location.pathname === '/listings' ? 'text-primary-500' : ''
            }`}
          >
            Properties
          </Link>
          <Link
            to="/contact"
            className={`font-medium hover:text-primary-400 transition-colors ${
              location.pathname === '/contact' ? 'text-primary-500' : ''
            }`}
          >
            Contact
          </Link>

          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 font-medium hover:text-primary-400 transition-colors">
                <span>Hi, {userName}</span>
                <User size={18} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                <Link
                  to={getDashboardLink()}
                  className="block px-4 py-2 text-secondary-800 hover:bg-primary-500 hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-secondary-800 hover:bg-primary-500 hover:text-white flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-outline text-white border-white hover:bg-primary-500 hover:border-primary-500"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-secondary-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                to="/"
                className="flex items-center py-2 px-4 hover:bg-secondary-800 rounded"
                onClick={closeMobileMenu}
              >
                <Home size={18} className="mr-2" />
                Home
              </Link>
              <Link
                to="/listings"
                className="flex items-center py-2 px-4 hover:bg-secondary-800 rounded"
                onClick={closeMobileMenu}
              >
                <Building size={18} className="mr-2" />
                Properties
              </Link>
              <Link
                to="/contact"
                className="flex items-center py-2 px-4 hover:bg-secondary-800 rounded"
                onClick={closeMobileMenu}
              >
                <MessageSquare size={18} className="mr-2" />
                Contact
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center py-2 px-4 hover:bg-secondary-800 rounded"
                    onClick={closeMobileMenu}
                  >
                    <LayoutDashboard size={18} className="mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 px-4 hover:bg-secondary-800 rounded text-left w-full"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-center"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 