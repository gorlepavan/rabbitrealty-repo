import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Home, Users, Smile } from 'lucide-react';
import PageLayout from '../components/common/PageLayout';
import PropertyCard from '../components/common/PropertyCard';
import { properties } from '../data/properties';

const HomePage = () => {
  const featuredProperties = properties.slice(0, 3);
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <PageLayout title="Home">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg" 
            alt="Luxury Property" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-900/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Discover Your <span className="text-primary-500">Dream Home</span> in India
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Premium properties across India's most desirable locations. From luxury villas in Mumbai to apartments in Bangalore, find your perfect match.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/listings" className="btn-primary text-lg px-8 py-3">
                Browse Properties
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:text-white hover:bg-primary-600 hover:border-primary-600 text-lg px-8 py-3">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Properties
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-primary-500 mx-auto mt-2 mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.p 
              className="text-secondary-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Discover our hand-picked selection of premium properties across India's most desirable locations.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {featuredProperties.map((property) => (
              <motion.div key={property.id} variants={item}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/listings" className="btn-outline inline-flex items-center">
              View All Properties
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-secondary-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose Rabbit Realty
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-primary-500 mx-auto mt-2 mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.p 
              className="text-secondary-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We're dedicated to providing exceptional service and finding the perfect property that fits your lifestyle and investment goals.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin size={40} />,
                title: "Prime Locations",
                description: "Access to exclusive properties in India's most sought-after neighborhoods and emerging investment hotspots."
              },
              {
                icon: <Home size={40} />,
                title: "Quality Properties",
                description: "Curated selection of premium homes, vetted for quality, legal compliance, and investment potential."
              },
              {
                icon: <Users size={40} />,
                title: "Expert Agents",
                description: "Our agents have deep local knowledge and years of experience in India's complex real estate markets."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-primary-50 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-secondary-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What Our Clients Say
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-primary-500 mx-auto mt-2 mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Priya Malhotra",
                location: "Mumbai",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
                text: "Rabbit Realty helped me find my dream villa in Mumbai. Their attention to detail and understanding of my requirements was exceptional."
              },
              {
                name: "Rajesh Mehta",
                location: "Bangalore",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
                text: "As a first-time homebuyer, I was nervous about the process. The team at Rabbit guided me through every step and found me the perfect apartment."
              },
              {
                name: "Aisha Khan",
                location: "Delhi",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                text: "Their investment advice was invaluable. I purchased land in Hyderabad through Rabbit Realty that has already appreciated significantly."
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-secondary-50 p-8 rounded-xl shadow-sm"
                variants={item}
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-secondary-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-secondary-500">
                      {testimonial.location}
                    </p>
                  </div>
                  <Smile className="ml-auto text-primary-500" size={24} />
                </div>
                <p className="text-secondary-700 italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-secondary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="font-heading text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Find Your Dream Property?
            </motion.h2>
            <motion.p 
              className="text-white/80 text-lg mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our team of expert agents is ready to help you find the perfect property that meets all your requirements.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/contact" className="btn-primary text-lg px-8 py-3">
                Contact Us Today
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage; 