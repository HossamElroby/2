import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, SearchFilters } from '../types';
import { mockCities, mockCategories } from '../data/mockData';

const initialState: AppState = {
  user: null,
  language: 'en',
  selectedCity: mockCities[0],
  searchFilters: {
    keyword: '',
    sortBy: 'newest'
  },
  listings: [],
  categories: mockCategories,
  isLoading: false,
  error: null
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_CITY':
      return { ...state, selectedCity: action.payload };
    case 'SET_SEARCH_FILTERS':
      return { 
        ...state, 
        searchFilters: { ...state.searchFilters, ...action.payload }
      };
    case 'SET_LISTINGS':
      return { ...state, listings: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};