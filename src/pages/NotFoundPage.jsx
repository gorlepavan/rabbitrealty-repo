import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import PageLayout from '../components/common/PageLayout';

const NotFoundPage = () => {
  return (
    <PageLayout title="Page Not Found">
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-lg w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-9xl font-bold text-primary-600">404</span>
            <h1 className="font-heading text-4xl font-bold text-secondary-800 mt-4 mb-6">
              Page Not Found
            </h1>
            <p className="text-secondary-600 mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary flex items-center justify-center">
                <Home size={18} className="mr-2" />
                Back to Home
              </Link>
              <Link to="/listings" className="btn-outline flex items-center justify-center">
                <Search size={18} className="mr-2" />
                Browse Properties
              </Link>
            </div>
            
            <button
              onClick={() => window.history.back()}
              className="mt-8 flex items-center justify-center mx-auto text-secondary-600 hover:text-primary-600"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </button>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage; 