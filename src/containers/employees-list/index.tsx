'use client';

import React, { useContext, useRef, useState } from 'react';
import { CompanyAdminWrapper } from '@/src/components';
import { Avatar, Box, Flex, TextInput } from '@mantine/core';
import { MdAdd, MdOutlineSearch } from 'react-icons/md';
import OnboardEmployee from '@/src/containers/employees-list/onboard-employee';
import colours from '@/src/constants/palette';
import ListView from '@/src/containers/employees-list/ListView';
import { onboardEmployeeFormDropdowns } from '@/src/utils/onboard-employee-form.utils';
import { EmployeeListContext } from '@/src/context/employee-list-view.context';
import BulkUploadHistory from '@/src/containers/employees-list/onboard-employee/bulk-employee-upload/BulkUploadHistory';
import { getEmployees } from '@/src/services/employee-list.service';
import { EmployeeType } from '@/src/containers/employees-list/employees.types';
import SearchableDropDown from '@/src/components/SearchableDropDown';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/src/context/AuthWrapper';
import { PageModules, pageModulePermission } from '@/src/constants';
import { Role } from '@/src/utils/roles-permissions-form.utils';
import { getRoles } from '@/src/services/roles-permissions.service';

const Employees = () => {
   const [isActive, setActive] = useState<boolean>(true);
   const activeTabRef = useRef<HTMLHeadingElement | null>(null);
   const inActiveTabRef = useRef<HTMLHeadingElement | null>(null);
   const [reFetch, setEmployeesFetch] = useState<{ fetch: boolean }>({ fetch: true });
   const [reFetchRoles, setRolesFetch] = useState<{ fetch: boolean }>({ fetch: true });

   const handleActiveItemsClick = (isActive: boolean) => setActive(isActive);
   const { hasPermission } = useContext(AuthContext);

   const { data: employees, isFetching } = useQuery({
      queryFn: async () => {
         setEmployeesFetch({ fetch: false });

         const employeesData = await getEmployees();

         if (employeesData?.length) {
            onboardEmployeeFormDropdowns.reportsTo = employeesData.map(
               (employee: EmployeeType) => ({
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
               })
            );

            const activeEmployees: number = employeesData?.filter?.(
               (employee: EmployeeType) => employee.isActive
            ).length;
            const inActiveEmployees: number = employeesData?.filter?.(
               (employee: EmployeeType) => !employee.isActive
            ).length;

            if (activeTabRef?.current) {
               activeTabRef.current.textContent = `${activeEmployees}`;
            }
            if (inActiveTabRef?.current) {
               inActiveTabRef.current.textContent = `${inActiveEmployees}`;
            }
         }

         return employeesData;
      },
      queryKey: ['employees'],
      enabled: reFetch.fetch
   });

   useQuery({
      queryFn: async () => {
         setRolesFetch({ fetch: false });
         const rolesData = await getRoles();
         if (rolesData?.length) {
            onboardEmployeeFormDropdowns.role = rolesData.map((role: Role) => ({
               label: (
                  <SearchableDropDown.Label>
                     <p>{role.name}</p>
                  </SearchableDropDown.Label>
               ),
               value: role.id,
               item: (
                  <SearchableDropDown.Item>
                     <Flex align={'center'} columnGap={12}>
                        <Box>
                           <p>{role.name}</p>
                        </Box>
                     </Flex>
                  </SearchableDropDown.Item>
               ),
               searchPatterns: [role.name]
            }));
         }
         return rolesData;
      },
      queryKey: ['allroles'],
      enabled: reFetchRoles.fetch
   });

   const isDataFetching = (): boolean => isFetching;

   const activeEmployees = employees?.filter?.((employee: EmployeeType) => employee.isActive) ?? [];
   const inActiveEmployees =
      employees?.filter?.((employee: EmployeeType) => !employee.isActive) ?? [];

   return (
      <CompanyAdminWrapper pageTitle={'Employee Management'}>
         <EmployeeListContext.Provider value={{ setEmployeesFetch, isDataFetching }}>
            <Flex
               justify={'space-between'}
               className={
                  'bg-white rounded-[0.8rem] -mt-6 border border-solid border-grey-3x-light'
               }
            >
               <Flex columnGap={24} align={'center'} className={'px-5'}>
                  <Box
                     className={`flex items-center gap-x-2 py-4 font-semibold cursor-pointer relative ${isActive ? 'text-midnight-blue' : ''}`}
                     onClick={() => handleActiveItemsClick(true)}
                  >
                     <h6 className={'text-h6'}>Active</h6>
                     <h6 className={'text-h6'} ref={activeTabRef}></h6>
                     {isActive && (
                        <Box className={'absolute bottom-0 left-0 bg-shade-blue w-full h-1'} />
                     )}
                  </Box>
                  <Box
                     className={`flex items-center gap-x-2 py-4 font-semibold cursor-pointer relative ${!isActive ? 'text-midnight-blue' : ''}`}
                     onClick={() => handleActiveItemsClick(false)}
                  >
                     <h6 className={'text-h6'}>Inactive</h6>
                     <h6 className={'text-h6'} ref={inActiveTabRef}></h6>
                     {!isActive && (
                        <Box className={'absolute bottom-0 left-0 bg-shade-blue w-full h-1'} />
                     )}
                  </Box>
               </Flex>
               <Flex columnGap={16} align={'center'} className={'px-5 py-3.5'}>
                  <TextInput
                     size={'md'}
                     leftSection={<MdOutlineSearch size={18} />}
                     placeholder={'Search Employees'}
                     className={'w-[22rem]'}
                     styles={() => ({
                        input: {
                           backgroundColor: colours.grey5XLight,
                           border: 0
                        }
                     })}
                  />
                  {hasPermission?.(PageModules.EMPLOYEE, pageModulePermission.CREATE) && (
                     <Flex align={'center'} columnGap={8}>
                        <>
                           <OnboardEmployee
                              targetIcon={<MdAdd size={24} />}
                              targetText={'Create'}
                              menuPosition={'bottom-end'}
                           />
                           <BulkUploadHistory />
                        </>
                     </Flex>
                  )}
               </Flex>
            </Flex>
            <Box
               className={
                  'bg-white rounded-[0.8rem] mt-4 border border-solid border-grey-3x-light py-3'
               }
            >
               <ListView employees={isActive ? activeEmployees : inActiveEmployees} />
            </Box>
         </EmployeeListContext.Provider>
      </CompanyAdminWrapper>
   );
};

export default Employees;
