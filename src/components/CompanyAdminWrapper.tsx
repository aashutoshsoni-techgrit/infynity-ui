import React from 'react';
import { NavBar, SideNavBar } from '@/src/components/index';
import { Box, Flex } from '@mantine/core';
import {
   employeeIcon,
   visionIcon,
   userRolesIcon,
   orgChartIcon,
   rolesAndPermissionsIcon
} from '../constants/icons';

const CompanyAdminWrapper: React.FC<{ pageTitle: string; children: React.ReactNode }> = ({
   pageTitle,
   children
}) => {
   const menuItems = [
      {
         title: 'Organization Chart',
         icon: orgChartIcon,
         route: '/organization-chart'
      },
      {
         title: 'Employees',
         icon: employeeIcon,
         route: '/employees'
      },
      {
         title: 'Vision',
         icon: visionIcon,
         route: '/vision-statement'
      },
      {
         title: 'Roles & Permissions',
         icon: userRolesIcon,
         route: '/roles'
      },
      {
         title: 'Departments/Teams',
         icon: rolesAndPermissionsIcon,
         route: '/departments-and-teams'
      }
   ];

   return (
      <Flex className={'w-full'}>
         <SideNavBar menuItems={menuItems} />
         <Box className={'flex-grow'}>
            <NavBar pageTitle={pageTitle} bg={'bg-grey-6x-light'} border={'border-0'} search />
            <Box
               className={'bg-grey-6x-light overflow-y-auto p-6'}
               style={{
                  minHeight: 'calc(100vh - 5rem)',
                  maxHeight: 'calc(100vh - 5rem)',
                  minWidth: 'calc(100vw - 15rem)',
                  maxWidth: 'calc(100vw - 15rem)'
               }}
            >
               {children}
            </Box>
         </Box>
      </Flex>
   );
};

export default CompanyAdminWrapper;
