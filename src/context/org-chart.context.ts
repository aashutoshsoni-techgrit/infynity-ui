'use client';

import { createContext, Dispatch, SetStateAction } from 'react';
import { EmployeeType } from '@/src/containers/employees-list/employees.types';
import { OrganizationChartUserType } from '@/src/containers/organization-chart/organization-chart.types';

export interface OrgChartContextType {
   getAllEmployees?: () => EmployeeType[];
   getOrgChartData?: () => OrganizationChartUserType[] | undefined;
   setReFetch?: Dispatch<SetStateAction<{ fetch: boolean }>>;
}

export const OrgChartContext = createContext<OrgChartContextType>({});

export interface OrgChartAddEmployeeContextType {
   setCurrentForm?: Dispatch<SetStateAction<number>>;
   handleFormClose?: () => void;
}

export const OrgChartAddEmployeeContext = createContext<OrgChartAddEmployeeContextType>({});

export interface OrgChartNodesContextType {
   setExpandedNodes?: Dispatch<SetStateAction<boolean>>;
}

export const OrgChartNodesContext = createContext<OrgChartNodesContextType>({});
