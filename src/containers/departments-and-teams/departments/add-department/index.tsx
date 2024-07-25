import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AddDepartmentForms } from '@/src/utils/departments.utils';
import { Button, Drawer, Menu } from '@mantine/core';
import colours from '@/src/constants/palette';
import { MdAdd } from 'react-icons/md';
import DepartmentForm from '@/src/containers/departments-and-teams/departments/add-department/DepartmentForm';
import { AddDepartmentFormContext } from '@/src/context/departments.context';
import { departmentTreeIcon, subDepartmentIcon } from '@/src/constants/icons';

const AddDepartment = () => {
   const [opened, { open, close }] = useDisclosure(false);
   const [currentForm, setCurrentForm] = useState<number>(AddDepartmentForms.ADD_DEPARTMENT);

   const handleItemClick = (formType: number) => {
      setCurrentForm(formType);
      open();
   };

   const handleFormClose = () => {
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
            closeOnClickOutside={false}
            closeOnEscape={false}
         >
            <AddDepartmentFormContext.Provider value={{ handleFormClose }}>
               {currentForm === AddDepartmentForms.ADD_DEPARTMENT && <DepartmentForm />}
               {currentForm === AddDepartmentForms.ADD_SUB_DEPARTMENT && (
                  <DepartmentForm isSubDepartment />
               )}
            </AddDepartmentFormContext.Provider>
         </Drawer>
         <Menu shadow={'md'} position={'bottom-end'}>
            <Menu.Target>
               <Button size={'md'} color={colours.shadeBlue} leftSection={<MdAdd size={24} />}>
                  Create
               </Button>
            </Menu.Target>
            <Menu.Dropdown>
               <Menu.Item
                  leftSection={<div className='inline-block'>{departmentTreeIcon}</div>}
                  onClick={() => handleItemClick(AddDepartmentForms.ADD_DEPARTMENT)}
               >
                  <p className={'text-base text-grey'}>Add Department</p>
               </Menu.Item>
               <Menu.Item
                  leftSection={<div className='inline-block'>{subDepartmentIcon}</div>}
                  onClick={() => handleItemClick(AddDepartmentForms.ADD_SUB_DEPARTMENT)}
               >
                  <p className={'text-base text-grey'}>Add Sub-Department</p>
               </Menu.Item>
            </Menu.Dropdown>
         </Menu>
      </>
   );
};

export default AddDepartment;
