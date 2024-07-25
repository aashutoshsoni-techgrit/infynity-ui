/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { Flex } from '@mantine/core';
import { useParams } from 'next/navigation';
import EmployeeCard from './EmployeeCard';
import Scorecard from './ScoreCard';
import ActionItemsAndIssues from './ActionItemsAndIssues';
import { useDisclosure } from '@mantine/hooks';
import { onboardEmployeeFormData } from '@/src/utils/onboard-employee-form.utils';
import { CompanyAdminWrapper } from '@/src/components';
import { Employee } from './employee-types';
import getEmployeeProfileData from '@/src/services/employee-profile.service';

const EmployeeProfile: React.FC = () => {
   const { id } = useParams();
   const [opened, { open, close }] = useDisclosure(false);

   const [employee, setEmployee] = useState<any>(null);
   const fetchData = async () => {
      const data = await getEmployeeProfileData(id);
      if (data) {
         setEmployee(data);
         setFormData(data);
      }
   };

   useEffect(() => {
      fetchData();
   }, [id]);

   const setFormData = (employee: Employee) => {
      onboardEmployeeFormData.data = {};
      onboardEmployeeFormData.data.firstName = employee.firstName;
      onboardEmployeeFormData.data.lastName = employee.lastName;
      onboardEmployeeFormData.data.gender = employee.gender;
      onboardEmployeeFormData.data.email = employee.email;
      onboardEmployeeFormData.data.phone = `${employee.countryCode ?? ''}${employee.phone ?? ''}`;
      onboardEmployeeFormData.data.profilePhoto = employee.profilePhoto;
      onboardEmployeeFormData.data.empId = employee.empId;
      onboardEmployeeFormData.data.title = employee.title;
      onboardEmployeeFormData.data.reportsTo = employee.reportsTo;
      onboardEmployeeFormData.data.role = employee.role;
      onboardEmployeeFormData.data.department = employee.department;
      onboardEmployeeFormData.data.subDepartment = employee.subDepartment;
      onboardEmployeeFormData.data.dateOfJoining = employee.dateOfJoining
         ? new Date(employee.dateOfJoining)
         : null;
      onboardEmployeeFormData.data.address = employee.address;
      onboardEmployeeFormData.data.city = employee.city;
      onboardEmployeeFormData.data.state = employee.state;
      onboardEmployeeFormData.data.country = employee.country;
      onboardEmployeeFormData.data.zipCode = employee.zipCode;
      onboardEmployeeFormData.data.profilePhoto = employee.profilePhoto;
   };

   const onCloseDrawer = () => {
      fetchData();
      close();
   };

   return (
      <CompanyAdminWrapper pageTitle='User Profile'>
         <Flex direction={{ base: 'column', md: 'row' }} gap='lg'>
            {employee && (
               <>
                  <EmployeeCard
                     employee={employee}
                     onEdit={open}
                     opened={opened}
                     onCloseDrawer={onCloseDrawer}
                  />
                  <Flex direction='column' style={{ width: '100%' }}>
                     <Scorecard />
                     <ActionItemsAndIssues />
                  </Flex>
               </>
            )}
         </Flex>
      </CompanyAdminWrapper>
   );
};

export default EmployeeProfile;
