'use client';

import React, { useEffect, useState } from 'react';
import { CompanyAdminWrapper } from '@/src/components';
import { Avatar, Box, Flex, Select, TextInput } from '@mantine/core';
import { MdOutlineSearch, MdPerson } from 'react-icons/md';
import colours from '@/src/constants/palette';
import OnboardEmployee from '@/src/containers/employees-list/onboard-employee';
import DrawOrganizationChart from '@/src/containers/organization-chart/DrawOrganizationChart';
import { ReactFlowProvider } from 'reactflow';
import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '@/src/services/employee-list.service';
import { OrgChartContext } from '@/src/context/org-chart.context';
import { OrganizationChartUserType } from '@/src/containers/organization-chart/organization-chart.types';
import { getOrganizationChartData } from '@/src/services/organization-chart.service';
import { onboardEmployeeFormDropdowns } from '@/src/utils/onboard-employee-form.utils';
import { EmployeeType } from '@/src/containers/employees-list/employees.types';
import SearchableDropDown from '../../components/SearchableDropDown';
import { getDepartments } from '@/src/services/departments.service';
import { DepartmentType } from '@/src/containers/departments-and-teams/departments/departments.types';
import { storeAllDepartments } from '@/src/utils/departments.utils';

const OrganizationChart = () => {
   const [showOrgChart, setShowOrgChart] = useState<boolean>(false);
   const [reFetch, setReFetch] = useState<{ fetch: boolean }>({ fetch: true });

   const { data: employees } = useQuery({
      queryKey: ['employees'],
      queryFn: async () => {
         reFetch.fetch && setReFetch({ fetch: false });
         const employees = await getEmployees();
         onboardEmployeeFormDropdowns.reportsTo =
            employees?.map?.((employee: EmployeeType) => ({
               label: (
                  <SearchableDropDown.Label>
                     <p>
                        {employee.firstName} {employee.lastName}
                     </p>
                  </SearchableDropDown.Label>
               ),
               value: employee.user,
               item: (
                  <SearchableDropDown.Item>
                     <Flex align={'center'} columnGap={12}>
                        <Avatar src={employee.profilePhoto} />
                        <Box>
                           <p>
                              {employee.firstName} {employee.lastName}
                           </p>
                           <p>{employee.email}</p>
                        </Box>
                     </Flex>
                  </SearchableDropDown.Item>
               ),
               searchPatterns: [employee.firstName, employee.lastName, employee.email]
            })) ?? [];
         return employees;
      },
      enabled: reFetch.fetch
   });
   useQuery({
      queryKey: ['departments'],
      queryFn: async () => {
         const departments = (await getDepartments()) as DepartmentType[];
         storeAllDepartments(departments);
         return departments;
      },
      enabled: reFetch.fetch
   });
   const { data: orgChartData, isFetched } = useQuery<OrganizationChartUserType[]>({
      queryKey: ['organization-chart-data'],
      queryFn: async () => {
         reFetch.fetch && setReFetch({ fetch: false });
         return await getOrganizationChartData();
      },
      enabled: reFetch.fetch
   });

   useEffect(() => {
      // @ts-expect-error any
      setShowOrgChart(typeof orgChartData?.node !== 'undefined');
   }, [orgChartData]);

   return (
      <CompanyAdminWrapper pageTitle={'Organization Chart'}>
         <Flex
            justify={'space-between'}
            className={
               'bg-white rounded-[0.8rem] -mt-6 border border-solid border-grey-3x-light h-[4.7rem]'
            }
         >
            <Flex columnGap={12} align={'center'} className={'px-5'}>
               <TextInput
                  size={'md'}
                  leftSection={<MdOutlineSearch size={18} />}
                  placeholder={'Search users, departments, etc.'}
                  className={'w-[22rem]'}
                  styles={() => ({
                     input: {
                        backgroundColor: colours.grey5XLight,
                        border: 0
                     }
                  })}
               />
               <Select size={'md'} className={'w-32'} placeholder={'Sort by'} />
            </Flex>
         </Flex>

         {!showOrgChart ? (
            <Flex
               justify={'center'}
               align={'center'}
               className={
                  'bg-white rounded-[0.8rem] mt-4 border border-solid border-grey-3x-light py-3 px-5'
               }
               style={{ minHeight: 'calc(100vh - 12.2rem)' }}
            >
               {isFetched && (
                  <Flex direction={'column'} rowGap={12} className={'text-center'}>
                     <Box>
                        <p>To create organization chart,</p>
                        <p>Please add an Employee or Bulk Upload Employee.</p>
                     </Box>
                     <Box>
                        <OnboardEmployee
                           targetIcon={<MdPerson size={20} />}
                           targetText={'Add Employee'}
                           menuPosition={'bottom-start'}
                        />
                     </Box>
                  </Flex>
               )}
            </Flex>
         ) : (
            <Box
               className={
                  'bg-white rounded-[0.8rem] mt-4 border border-solid border-grey-3x-light py-3 px-5 max-w-full overflow-x-auto'
               }
            >
               {isFetched && (
                  <ReactFlowProvider>
                     <OrgChartContext.Provider
                        value={{
                           getAllEmployees: () => employees,
                           getOrgChartData: () => orgChartData,
                           setReFetch
                        }}
                     >
                        <DrawOrganizationChart />
                     </OrgChartContext.Provider>
                  </ReactFlowProvider>
               )}
            </Box>
         )}
      </CompanyAdminWrapper>
   );
};

export default OrganizationChart;
