import React from 'react';
import EmployeesList from '@/src/containers/employees-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Infynity | Employees'
};

const EmployeePage = () => <EmployeesList />;

export default EmployeePage;
