import React, { createContext, useContext, useState } from 'react';

const defaultContext = {
  isLoggedIn: false,
  userRole: 'guest',
  userName: '',
  login: () => {},
  logout: () => {},
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
};

const UserContext = createContext(defaultContext);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [userName, setUserName] = useState('');
  const [favorites, setFavorites] = useState([]);

  const login = (email, password, role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(email.split('@')[0]);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole('guest');
    setUserName('');
    setFavorites([]);
  };

  const addToFavorites = (propertyId) => {
    if (!favorites.includes(propertyId)) {
      setFavorites([...favorites, propertyId]);
    }
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites(favorites.filter(id => id !== propertyId));
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userName,
        login,
        logout,
        favorites,
        addToFavorites,
        removeFromFavorites
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; 