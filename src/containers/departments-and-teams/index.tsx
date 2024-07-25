'use client';

import React, { useState } from 'react';
import { DepartmentsAndTeamsTabs, storeAllDepartments } from '@/src/utils/departments.utils';
import { DepartmentsAndTeamsContext } from '@/src/context/departments.context';
import Departments from '@/src/containers/departments-and-teams/departments';
import { CompanyAdminWrapper } from '@/src/components';
import { Box, Flex, TextInput } from '@mantine/core';
import { MdOutlineSearch } from 'react-icons/md';
import colours from '@/src/constants/palette';
import AddDepartment from '@/src/containers/departments-and-teams/departments/add-department';
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '@/src/services/departments.service';
import { DepartmentType } from '@/src/containers/departments-and-teams/departments/departments.types';

const DepartmentsAndTeams = () => {
   const [currentActiveTab, setActiveTab] = useState<number>(DepartmentsAndTeamsTabs.DEPARTMENTS);
   const [reFetch, setReFetch] = useState<boolean>(true);
   const isDepartmentsActive: boolean = currentActiveTab === DepartmentsAndTeamsTabs.DEPARTMENTS;
   const isTeamsActive: boolean = currentActiveTab === DepartmentsAndTeamsTabs.TEAMS;

   const { data: departments, isFetching } = useQuery({
      queryFn: async () => {
         setReFetch(false);
         const departments = (await getDepartments()) as DepartmentType[];
         storeAllDepartments(departments);
         return departments;
      },
      queryKey: ['departments'],
      enabled: isDepartmentsActive && reFetch
   });
   console.log(isFetching, 'is fect');

   return (
      <CompanyAdminWrapper pageTitle={'Departments/Teams'}>
         <DepartmentsAndTeamsContext.Provider value={{ setActiveTab, setReFetch }}>
            <Flex
               justify={'space-between'}
               className={
                  'bg-white rounded-[0.8rem] -mt-6 border border-solid border-grey-3x-light'
               }
            >
               <Flex columnGap={24} align={'center'} className={'px-5'}>
                  <Box
                     className={`flex items-center gap-x-2 py-4 font-semibold cursor-pointer relative ${isDepartmentsActive ? 'text-midnight-blue' : ''}`}
                     onClick={() => setActiveTab(DepartmentsAndTeamsTabs.DEPARTMENTS)}
                  >
                     <h6 className={'text-h6'}>Departments</h6>
                     {isDepartmentsActive && (
                        <Box className={'absolute bottom-0 left-0 bg-shade-blue w-full h-1'} />
                     )}
                  </Box>
                  <Box
                     className={`flex items-center gap-x-2 py-4 font-semibold cursor-pointer relative ${isTeamsActive ? 'text-midnight-blue' : ''}`}
                     onClick={() => setActiveTab(DepartmentsAndTeamsTabs.TEAMS)}
                  >
                     <h6 className={'text-h6'}>Teams</h6>
                     {isTeamsActive && (
                        <Box className={'absolute bottom-0 left-0 bg-shade-blue w-full h-1'} />
                     )}
                  </Box>
               </Flex>
               <Flex columnGap={16} align={'center'} className={'px-5 py-3.5'}>
                  <TextInput
                     size={'md'}
                     leftSection={<MdOutlineSearch size={18} />}
                     placeholder={'Search Departments'}
                     className={'w-[22rem]'}
                     styles={() => ({
                        input: {
                           backgroundColor: colours.grey5XLight,
                           border: 0
                        }
                     })}
                  />
                  <AddDepartment />
               </Flex>
            </Flex>
            <Box
               className={
                  'bg-white rounded-[0.8rem] mt-4 border border-solid border-grey-3x-light py-3'
               }
            >
               {isDepartmentsActive && (
                  <Departments departments={departments} isDataFetching={() => isFetching} />
               )}
            </Box>
         </DepartmentsAndTeamsContext.Provider>
      </CompanyAdminWrapper>
   );
};

export default DepartmentsAndTeams;
