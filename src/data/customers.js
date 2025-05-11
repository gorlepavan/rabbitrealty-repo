export const customers = [
  {
    id: 'c1',
    name: 'Amit Kumar',
    email: 'amit@example.com',
    phone: '+91 9876123450',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    favorites: ['1', '3'],
    searches: ['Mumbai', 'Luxury', 'Villa'],
    inquiries: [
      {
        propertyId: '1',
        date: '2024-03-10',
        message: 'I am interested in viewing this property. When would be a good time?'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Neha Singh',
    email: 'neha@example.com',
    phone: '+91 8765123490',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    favorites: ['2', '6'],
    searches: ['Bangalore', 'Apartment', '3BHK'],
    inquiries: [
      {
        propertyId: '2',
        date: '2024-03-15',
        message: 'Is this property near any international schools?'
      }
    ]
  },
  {
    id: 'c3',
    name: 'Vikram Patel',
    email: 'vikram@example.com',
    phone: '+91 7654123890',
    photo: null,
    favorites: ['5'],
    searches: ['Investment', 'Land', 'Hyderabad'],
    inquiries: [
      {
        propertyId: '5',
        date: '2024-03-18',
        message: 'What are the development regulations for this land?'
      }
    ]
  },
  {
    id: 'c4',
    name: 'Anjali Gupta',
    email: 'anjali@example.com',
    phone: '+91 6543128970',
    photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    favorites: ['3', '4'],
    searches: ['Delhi', 'Penthouse', 'Luxury'],
    inquiries: [
      {
        propertyId: '3',
        date: '2024-03-20',
        message: 'I would like to know more about the amenities in this building.'
      }
    ]
  }
];

export const getCustomerById = (id) => {
  return customers.find(customer => customer.id === id);
}; 