import React from 'react';
import CompaniesList from '@/src/containers/admin/companies-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Infynity | Companies'
};

const ViewCompaniesPage = () => <CompaniesList />;

export default ViewCompaniesPage;
