import React, { FC, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Box, Drawer, Flex } from '@mantine/core';
import ViewRoleDetails from '@/src/containers/roles-list/view-role/Viewroledetails';
import { userRoleData } from '@/src/utils/user-role-form.utils';
import toastService from '@/src/services/toast.service';
import httpService from '@/src/services/http.service';
import { authStore } from '@/src/context/AuthWrapper';
import colours from '@/src/constants/palette';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const ViewRole: FC<{ role: any }> = ({ role }) => {
   const [opened, { open, close }] = useDisclosure(false);
   const [assignedUsers, setAssignedUsers] = useState<any>([]);

   const handleRoleViewClick = async () => {
      userRoleData.data = {};
      userRoleData.data.permissions = role.permissions;

      try {
         const response = await httpService.get(`/role/${role.id}`, {
            'x-tenant-id': authStore.tenantId
         });
         setAssignedUsers(response?.data?.data.assignedTo);
      } catch (error) {
         toastService.showToast({
            color: colours.error,
            title: 'Error',
            subtitle: 'Failed to fetch role details'
         });
      }

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
            closeOnEscape={false}
            closeOnClickOutside={false}
         >
            <ViewRoleDetails
               assignedUsers={assignedUsers}
               roleId={role}
               closeDrawer={handleFormClose}
            />
         </Drawer>
         <Flex>
            <Box className='flex items-center gap-x-3 w-full cursor-pointer'>
               <p
                  style={{ color: colours.black }}
                  className='text-md  font-semibold hover:underline truncate'
                  onClick={handleRoleViewClick}
               >
                  {role.name}
               </p>
            </Box>
         </Flex>
      </>
   );
};

export default ViewRole;
