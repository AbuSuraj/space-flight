import { ReactNode } from "react";

export interface SpaceFlightContextType {
    spaceSearch: string;
    setSpaceSearch: React.Dispatch<React.SetStateAction<string>>;
    upcoming: boolean;
    setUpcoming: React.Dispatch<React.SetStateAction<boolean>>;
    filterByDate: string;
    setFilterByDate: React.Dispatch<React.SetStateAction<string>>;
    filterByStatus: string;
    setFilterByStatus: React.Dispatch<React.SetStateAction<string>>;
  }

  export interface SpaceFlightProviderProps {
    children: ReactNode;
  }