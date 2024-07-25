import React, { FC } from 'react';
import { Box, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MdCreate } from 'react-icons/md';
import colours from '@/src/constants/palette';
import DepartmentForm from '@/src/containers/departments-and-teams/departments/add-department/DepartmentForm';
import { EditDepartmentProps } from '@/src/containers/departments-and-teams/departments/departments.types';
import { EditDepartmentFormContext } from '@/src/context/departments.context';

const EditDepartment: FC<EditDepartmentProps> = ({ department, isSubDepartment }) => {
   const [opened, { open, close }] = useDisclosure(false);

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
            closeOnEscape={false}
            closeOnClickOutside={false}
         >
            <EditDepartmentFormContext.Provider value={{ handleFormClose }}>
               <DepartmentForm department={department} isSubDepartment={isSubDepartment} />
            </EditDepartmentFormContext.Provider>
         </Drawer>
         <Box
            className={
               'inline-block hover:bg-grey-4x-light rounded-[50%] p-2 border border-solid border-shade-blue cursor-pointer'
            }
            onClick={open}
         >
            <MdCreate size={16} color={colours.shadeBlue} />
         </Box>
      </>
   );
};

export default EditDepartment;
