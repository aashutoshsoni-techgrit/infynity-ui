import React from 'react';
import type { Metadata } from 'next';
import DepartmentsAndTeams from '@/src/containers/departments-and-teams';

export const metadata: Metadata = {
   title: 'Infynity | Departments and Teams'
};

const DepartmentsAndTeamsPage = () => <DepartmentsAndTeams />;

export default DepartmentsAndTeamsPage;
