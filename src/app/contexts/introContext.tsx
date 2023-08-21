import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IntroDataType } from '@/app/types/IntroType';
import { IntroRefType } from '@/app/types/IntroRefType';

// type
type IntroDataState = {
    introData: IntroDataType | null;
    refData: IntroRefType | null;
};

// Context
const IntroDataContext = createContext<IntroDataState | null>(null);

// hooks
export const useIntroData = () => {
    const context = useContext(IntroDataContext);
    if (!context) {
        throw new Error("useIntroData must be used within a DataProvider");
    }
    return context;
}

// Props
interface IntroDataProviderProps {
    children: ReactNode;
    initialData: IntroDataType;
    initialRefData: IntroRefType;
}

// Provider
export const IntroDataProvider: React.FC<IntroDataProviderProps> = ({ children, initialData, initialRefData }) => {
    const [introData] = useState<IntroDataType | null>(initialData);
    const [refData]   = useState<IntroRefType | null>(initialRefData);
  
    return (
      <IntroDataContext.Provider value={{ introData, refData }}>
        {children}
      </IntroDataContext.Provider>
    );
};
