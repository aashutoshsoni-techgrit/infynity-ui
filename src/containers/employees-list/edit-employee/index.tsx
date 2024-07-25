import React, { FC, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Box, Drawer } from '@mantine/core';
import { MdCreate } from 'react-icons/md';
import colours from '@/src/constants/palette';
import EmployeeForm from '@/src/containers/employees-list/onboard-employee/EmployeeForm';
import {
   employeeFormsCountryCode,
   onboardEmployeeFormData
} from '@/src/utils/onboard-employee-form.utils';
import { EmployeeListContext } from '@/src/context/employee-list-view.context';
import getEmployeeProfileData from '@/src/services/employee-profile.service';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const EditEmployee: FC<{ employee: any }> = ({ employee }) => {
   const [opened, { open, close }] = useDisclosure(false);
   const { setEmployeesFetch } = useContext(EmployeeListContext);

   const handleEmployeeEditClick = async () => {
      onboardEmployeeFormData.data = {};
      const empformdata = await getEmployeeProfileData(employee.id);
      if (empformdata.roles && Array.isArray(empformdata.roles)) {
         const roleIds = empformdata.roles.map((role: { id: string }) => role.id);
         onboardEmployeeFormData.data.role = roleIds;
      } else {
         onboardEmployeeFormData.data.role = [];
      }
      employeeFormsCountryCode.companyDialCode = employee.countryCode?.replace('+', '');
      onboardEmployeeFormData.data.firstName = employee.firstName;
      onboardEmployeeFormData.data.lastName = employee.lastName;
      onboardEmployeeFormData.data.gender = employee.gender;
      onboardEmployeeFormData.data.email = employee.email;
      onboardEmployeeFormData.data.phone = `${employeeFormsCountryCode.companyDialCode ?? ''}${employee.phone ?? ''}`;
      onboardEmployeeFormData.data.profilePhoto = employee.profilePhoto;
      onboardEmployeeFormData.data.empId = employee.empId;
      onboardEmployeeFormData.data.title = employee.title;
      onboardEmployeeFormData.data.reportsTo = employee.reportsTo;
      //onboardEmployeeFormData.data.roles = employee.roleIds;
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
      open();
   };

   const handleFormClose = (reFetch: { fetch: boolean } = { fetch: false }) => {
      setEmployeesFetch?.({ fetch: reFetch.fetch });
      close();
   };

   return (
      <>
         <Drawer
            opened={opened}
            onClose={handleFormClose}
            position={'right'}
            size={'lg'}
            padding={20}
            closeOnEscape={false}
            closeOnClickOutside={false}
         >
            <EmployeeForm
               edit
               employeeId={employee.id}
               userId={employee.user}
               closeDrawer={handleFormClose}
            />
         </Drawer>
         <Box
            className={
               'inline-block hover:bg-grey-4x-light rounded-[50%] p-2 border border-solid border-shade-blue cursor-pointer'
            }
            onClick={handleEmployeeEditClick}
         >
            <MdCreate size={16} color={colours.shadeBlue} />
         </Box>
      </>
   );
};

export default EditEmployee;
