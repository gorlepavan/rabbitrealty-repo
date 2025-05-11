export const agents = [
  {
    id: 'a1',
    name: 'Priya Sharma',
    email: 'priya@rabbitdev.com',
    phone: '+91 9876543210',
    photo: 'https://images.pexels.com/photos/5717665/pexels-photo-5717665.jpeg',
    properties: ['1', '5'],
    customers: ['c1', 'c3', 'c5'],
    bio: 'Priya has over 10 years of experience in luxury real estate, specializing in high-end properties in Mumbai and surrounding areas.',
    experience: 10,
    specialization: ['Luxury Properties', 'Villas', 'Investment Properties'],
    rating: 4.8
  },
  {
    id: 'a2',
    name: 'Rahul Mehta',
    email: 'rahul@rabbitdev.com',
    phone: '+91 8765432109',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    properties: ['2', '6'],
    customers: ['c2', 'c6'],
    bio: 'Rahul specializes in residential properties across major Indian metros with extensive knowledge of investment opportunities.',
    experience: 8,
    specialization: ['Residential', 'First-time Buyers', 'Heritage Properties'],
    rating: 4.5
  },
  {
    id: 'a3',
    name: 'Anil Kapoor',
    email: 'anil@rabbitdev.com',
    phone: '+91 7654321098',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    properties: ['3'],
    customers: ['c4'],
    bio: 'Anil is an expert in premium Delhi properties with deep connections in the local market and government regulations.',
    experience: 15,
    specialization: ['Premium Apartments', 'Penthouses', 'Commercial'],
    rating: 4.9
  },
  {
    id: 'a4',
    name: 'Meera Nair',
    email: 'meera@rabbitdev.com',
    phone: '+91 6543210987',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    properties: ['4'],
    customers: ['c7', 'c8'],
    bio: 'Meera specializes in vacation and investment properties in Goa, helping clients find their dream beachfront homes.',
    experience: 7,
    specialization: ['Beach Properties', 'Vacation Homes', 'Rental Investment'],
    rating: 4.7
  }
];

export const getAgentById = (id) => {
  return agents.find(agent => agent.id === id);
}; 