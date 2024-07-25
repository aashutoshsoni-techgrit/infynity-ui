import React, { useContext, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Drawer } from '@mantine/core';
import colours from '@/src/constants/palette';
import { MdSettings } from 'react-icons/md';
import '@mantine/dates/styles.css';
import { RoleFormProps, RoleFormType } from '@/src/utils/roles-permissions-form.utils';
import CreateRoleForm from './CreateRoleForm';
import { RolesListContext } from '@/src/context/roles-list-view.context';
import { AuthContext } from '@/src/context/AuthWrapper';
import { PageModules, pageModulePermission } from '@/src/constants';

const CreateRole = () => {
   const [opened, { open, close }] = useDisclosure(false);
   const [formType, setFormType] = useState<number>(RoleFormType.SINGLE);
   const [roleId, setRoleId] = useState<string | null>(null);
   const { setRolesFetch } = useContext(RolesListContext);
   const [edit, setEdit] = useState<boolean>(false);
   const { hasPermission } = useContext(AuthContext);

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
               <CreateRoleForm edit={edit} roleId={roleId} closeDrawer={handleFormClose} />
            )}
         </Drawer>
         {hasPermission?.(PageModules.ROLES, pageModulePermission.CREATE) && (
            <Button
               size={'md'}
               color={colours.shadeBlue}
               leftSection={<MdSettings size={20} />}
               onClick={() => {
                  setFormType(RoleFormType.SINGLE);
                  setRoleId(null);
                  setEdit(false);
                  open();
               }}
            >
               Create
            </Button>
         )}
      </>
   );
};
export default CreateRole;
