"use client"

import { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [service, setService] = useState('tattoo');
  const [formProgress, setFormProgress] = useState(1);

  return (
    <GlobalStateContext.Provider value={{ service, setService, formProgress, setFormProgress }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
