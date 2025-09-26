import React, { createContext, ReactNode, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children, defaultLanguage = 'hu' }: { children: ReactNode; defaultLanguage?: string }) => {
  const [language, setLanguage] = useState<string>(defaultLanguage);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(['hu', 'en', 'ro']);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
