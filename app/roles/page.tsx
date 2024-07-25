import React from 'react';
import RolesList from '@/src/containers/roles-list';
import type { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Infynity | Roles'
};

const RolesPage = () => <RolesList />;

export default RolesPage;
