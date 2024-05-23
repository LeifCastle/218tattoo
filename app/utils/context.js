"use client"

import { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [service, setService] = useState('tattoo');

  return (
    <GlobalStateContext.Provider value={{ service, setService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
