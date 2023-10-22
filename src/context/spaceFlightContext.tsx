import { createContext, useContext, useState } from 'react';
import { SpaceFlightContextType, SpaceFlightProviderProps } from '../Interfaces/space-flight-context.interface';

const SpaceFlightContext = createContext<SpaceFlightContextType | undefined>(undefined);
  
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
