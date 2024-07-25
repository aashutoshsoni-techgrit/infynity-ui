import React, { FC, useContext, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import colours from '@/src/constants/palette';
import { MdCreate } from 'react-icons/md';
import '@mantine/dates/styles.css';
import { RoleFormProps, RoleFormType } from '@/src/utils/roles-permissions-form.utils';
import { userRoleData } from '@/src/utils/user-role-form.utils';
import { RolesListContext } from '@/src/context/roles-list-view.context';
import CreateRoleForm from '@/src/containers/roles-list/create-role/CreateRoleForm';
import { authStore } from '@/src/context/AuthWrapper';
import toastService from '@/src/services/toast.service';
import httpService from '@/src/services/http.service';

interface EditRoleProps {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   role: any; // Define the type for 'role' as needed
}

const EditRole: FC<EditRoleProps> = ({ role }) => {
   const [opened, { open, close }] = useDisclosure(false);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [formType, setFormType] = useState<number>(RoleFormType.SINGLE);
   const { setRolesFetch } = useContext(RolesListContext);
   const [edit, setEdit] = useState<boolean>(false); // Set initial state based on your requirement
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [roleId, setRoleId] = useState<string | null>(null); // Initialize roleId state
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [roleEditDetails, setRoleEditDetails] = useState<any>([]);

   const handleRoleEditClick = async () => {
      userRoleData.data = {};
      userRoleData.data.name = role;

      try {
         const response = await httpService.get(`/role/${role}`, {
            'x-tenant-id': authStore.tenantId
         });
         setRoleEditDetails(response?.data?.data);
      } catch (error) {
         toastService.showToast({
            color: colours.error,
            title: 'Error',
            subtitle: 'Failed to fetch role details'
         });
      }

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
            closeOnClickOutside={false}
            closeOnEscape={false}
         >
            {formType === RoleFormType.SINGLE && (
               <CreateRoleForm
                  edit={edit}
                  roleId={role}
                  closeDrawer={handleFormClose}
                  roleEditDetails={roleEditDetails}
               />
            )}
         </Drawer>
         <div
            className='rounded-full p-2 bg-white border border-gray-300 cursor-pointer'
            onClick={() => {
               handleRoleEditClick();
               setRoleId(role);
               setEdit(true);
            }}
         >
            <MdCreate size={16} color={colours.shadeBlue} />
         </div>
      </>
   );
};

export default EditRole;
