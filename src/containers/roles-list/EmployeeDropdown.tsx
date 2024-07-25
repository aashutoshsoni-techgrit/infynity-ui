import React, { useEffect, useState } from 'react';
import { getEmployeesToAssignRoles } from '@/src/services/roles-permissions.service';
import { Avatar, Drawer } from '@mantine/core';
import colours from '@/src/constants/palette';
import { capitalizeFirstLetter } from '@/src/utils/string-format-utils';
import { useQuery } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import EmployeeForm from '../employees-list/onboard-employee/EmployeeForm';
import SearchableDropDown from '@/src/components/SearchableDropDown';
import { EmployeeDropdownProps, Employee } from '@/src/components/employeedrodown.types';
import { SearchableDropDownItemDataType } from '@/src/components/components.types';

const EmployeeDropdown: React.FC<EmployeeDropdownProps> = ({ onChange, defultselectedItems }) => {
   const [opened, { close }] = useDisclosure(false);
   const [mappedEmployeeData, setMappedEmployeeData] = useState<SearchableDropDownItemDataType[]>(
      []
   );

   const { data: employees } = useQuery<Employee[]>({
      queryKey: ['employeedropdown'],
      queryFn: async () => await getEmployeesToAssignRoles()
   });

   useEffect(() => {
      if (employees) {
         const mappedData = employees.map((employee) => ({
            label: (
               <SearchableDropDown.Label>
                  <p>{`${employee.firstName} ${employee.lastName}`}</p>
               </SearchableDropDown.Label>
            ),
            item: (
               <SearchableDropDown.Item>
                  <div className='flex items-center'>
                     {employee.profilePhoto && employee.profilePhoto !== 'null' ? (
                        <Avatar src={employee.profilePhoto} />
                     ) : (
                        <Avatar size='sm' radius='md' />
                     )}
                     <div className='ml-2'>
                        <div className='text-sm leading-5'>
                           {capitalizeFirstLetter(employee?.firstName)}
                        </div>
                        <div className='text-xs leading-4' style={{ color: colours.shadeBlue }}>
                           {employee.emailId}
                        </div>
                        <div className='text-xs leading-4'>{employee?.role}</div>
                     </div>
                  </div>
               </SearchableDropDown.Item>
            ),
            value: employee.id || '',
            searchPatterns: [
               employee.firstName || '',
               employee.emailId || '',
               employee.lastName || '',
               employee.role || ''
            ]
         }));
         setMappedEmployeeData(mappedData);
      }
   }, [employees]);

   const handleFormClose = () => {
      close();
   };

   const handleSearchableDropDownChange = (values: string[]) => {
      onChange(values);
   };

   return (
      <>
         <Drawer
            opened={opened}
            onClose={handleFormClose}
            position={'right'}
            size={'lg'}
            padding={20}
            closeOnClickOutside={false}
            closeOnEscape={false}
         >
            <EmployeeForm closeDrawer={handleFormClose} />
         </Drawer>
         <SearchableDropDown
            data={mappedEmployeeData}
            multiSelect
            placeholder='Select'
            onChange={handleSearchableDropDownChange}
            defaultSelectedValues={defultselectedItems}
         />
      </>
   );
};

export default EmployeeDropdown;
