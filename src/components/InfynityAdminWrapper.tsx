import React from 'react';
import { NavBar, SideNavBar } from '@/src/components/index';
import { Box, Flex } from '@mantine/core';
import { dashboardIcon, companiesIcon } from '../constants/icons';

const InfynityAdminWrapper: React.FC<{ pageTitle: string; children: React.ReactNode }> = ({
   pageTitle,
   children
}) => {
   const menuItems = [
      {
         title: 'Dashboard',
         icon: dashboardIcon,
         route: '/admin/dashboard'
      },
      {
         title: 'Companies',
         icon: companiesIcon,
         route: '/admin/companies'
      }
   ];

   return (
      <Flex className={'w-full'}>
         <SideNavBar menuItems={menuItems} />
         <Box className={'flex-grow'}>
            <NavBar pageTitle={pageTitle} />
            <Box
               className={'bg-grey-6x-light overflow-y-auto p-6'}
               style={{ minHeight: 'calc(100vh - 5rem)', maxHeight: 'calc(100vh - 5rem)' }}
            >
               {children}
            </Box>
         </Box>
      </Flex>
   );
};

export default InfynityAdminWrapper;
