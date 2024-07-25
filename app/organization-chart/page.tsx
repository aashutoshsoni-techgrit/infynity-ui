import React from 'react';
import OrganizationChart from '@/src/containers/organization-chart';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Infynity | Organization Chart'
};

const OrganizationChartPage = () => <OrganizationChart />;

export default OrganizationChartPage;
