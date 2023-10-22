import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SpaceFlightContextType {
  spaceSearch: string;
  setSpaceSearch: React.Dispatch<React.SetStateAction<string>>;
  upcoming: boolean;
  setUpcoming: React.Dispatch<React.SetStateAction<boolean>>;
  filterByDate: string;
  setFilterByDate: React.Dispatch<React.SetStateAction<string>>;
  filterByStatus: string;
  setFilterByStatus: React.Dispatch<React.SetStateAction<string>>;
}

const SpaceFlightContext = createContext<SpaceFlightContextType | undefined>(undefined);

interface SpaceFlightProviderProps {
  children: ReactNode;
}
  
export function SpaceFlightProvider({ children }: SpaceFlightProviderProps) {
  const [spaceSearch, setSpaceSearch] = useState('');
  const [upcoming, setUpcoming] = useState(false);
  const [filterByDate, setFilterByDate] = useState('');
  const [filterByStatus, setFilterByStatus] = useState('');

  const filterOptions = {
    spaceSearch, setSpaceSearch, upcoming, setUpcoming, filterByDate, setFilterByDate, filterByStatus, setFilterByStatus
  }
  return (
    <SpaceFlightContext.Provider value={filterOptions}>
      {children}
    </SpaceFlightContext.Provider>
  );
}

export function useSpaceFlight() {
  const context = useContext(SpaceFlightContext);
  if (context === undefined) {
    throw new Error('useSpaceFlight must be used within a SpaceFlightProvider');
  }
  return context;
}
