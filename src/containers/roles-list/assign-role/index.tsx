import React, { FC, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Flex } from '@mantine/core';
import AssignRoleForm from '@/src/containers/roles-list/assign-role/Createform';
import { userRoleData } from '@/src/utils/user-role-form.utils';
import { RolesListContext } from '@/src/context/roles-list-view.context';
import { RoleFormProps } from '@/src/utils/roles-permissions-form.utils';
import { assignOutlineIcon } from '@/src/constants/icons';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const AssignRole: FC<{ role: any }> = ({ role }) => {
   const [opened, { open, close }] = useDisclosure(false);
   const { setRolesFetch } = useContext(RolesListContext);
   const handleEmployeeEditClick = async () => {
      userRoleData.data = {};
      userRoleData.data.permissions = role.permissions;
      open();
   };

   const handleFormClose: RoleFormProps['closeDrawer'] = (reFetch) => {
      setRolesFetch?.({ fetch: reFetch.fetch });
      close();
   };

   return (
      <>
         <Drawer
            opened={opened}
            onClose={close}
            position={'right'}
            size={'lg'}
            padding={20}
            closeOnEscape={false}
            closeOnClickOutside={false}
         >
            <AssignRoleForm roleId={role.id} closeDrawer={handleFormClose} />
         </Drawer>
         <Flex
            align={'center'}
            columnGap={3}
            className='assignSection px-2 py-2 bg-white border border-shade-blue rounded-[1.2rem] cursor-pointer text-shade-blue text-sm'
            onClick={handleEmployeeEditClick}
         >
            {assignOutlineIcon}
            Assign
         </Flex>
      </>
   );
};

export default AssignRole;
