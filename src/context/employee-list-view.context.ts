'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

export interface EmployeeListContextType {
   setEmployeesFetch?: Dispatch<SetStateAction<{ fetch: boolean }>>;
   isDataFetching?: () => boolean;
}

export const EmployeeListContext = createContext<EmployeeListContextType>({});
