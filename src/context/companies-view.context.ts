'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

export interface CompaniesViewContextType {
   setCompaniesFetch?: Dispatch<SetStateAction<{ fetch: boolean }>>;
}

export const CompaniesViewContext = createContext<CompaniesViewContextType>({});

export interface CompanyEditContextType {
   getEditCompany?: () => void;
   handleFormClose?: () => void;
}

export const CompanyEditContext = createContext<CompanyEditContextType>({});
