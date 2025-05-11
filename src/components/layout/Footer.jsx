import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import RabbitLogo from '../common/RabbitLogo';

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' }
  ];

  const iconAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } }
  };

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <RabbitLogo size={36} color="#ff0000" />
              <span className="ml-2 font-heading font-bold text-xl">Rabbit Realty</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium real estate solutions across India. We help you find your dream property.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="bg-secondary-800 hover:bg-primary-600 p-2 rounded-full transition-colors"
                  initial="rest"
                  whileHover="hover"
                  variants={iconAnimation}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 border-b border-primary-600 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-500 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 border-b border-primary-600 pb-2">
              Property Types
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/listings?type=villa" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link to="/listings?type=apartment" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/listings?type=house" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/listings?type=penthouse" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Penthouses
                </Link>
              </li>
              <li>
                <Link to="/listings?type=land" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 border-b border-primary-600 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-primary-500" />
                <span className="text-gray-400">
                  Rabbit Towers, MG Road<br />
                  Bangalore, Karnataka 560001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary-500" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary-500" />
                <span className="text-gray-400">info@rabbitrealty.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Rabbit Developers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 