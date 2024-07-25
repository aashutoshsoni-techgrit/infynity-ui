'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

export interface DepartmentAndTeamsContextType {
   setActiveTab?: Dispatch<SetStateAction<number>>;
   setReFetch?: Dispatch<SetStateAction<boolean>>;
}

export const DepartmentsAndTeamsContext = createContext<DepartmentAndTeamsContextType>({});

export interface AddDepartmentFormContextType {
   handleFormClose?: () => void;
}

export const AddDepartmentFormContext = createContext<AddDepartmentFormContextType>({});

export interface EditDepartmentFormContextType {
   handleFormClose?: () => void;
}

export const EditDepartmentFormContext = createContext<EditDepartmentFormContextType>({});
