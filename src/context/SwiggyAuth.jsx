import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const SwiggyAuthContext = createContext(null);

// Create the provider component
export const SwiggyAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <SwiggyAuthContext.Provider value={{ user,  loading ,setUser }}>
      { children}
    </SwiggyAuthContext.Provider>
  );
};

// Create a custom hook to use the SwiggyAuthContext
export const useSwiggy = () => {
  const context = useContext(SwiggyAuthContext);
  if (!context) {
    throw new Error('useSwiggy must be used within a SwiggyAuthProvider');
  }
  return context;
};
