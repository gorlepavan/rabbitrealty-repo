import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AgentDashboard from './pages/dashboard/AgentDashboard';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { UserProvider } from './context/UserContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate splash screen for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <UserProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </UserProvider>
  );
}

export default App; 