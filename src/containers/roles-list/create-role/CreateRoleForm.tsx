/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Checkbox, Divider, Flex, TextInput } from '@mantine/core';
import { MdExpandMore, MdExpandLess, MdDelete, MdOutlineSearch } from 'react-icons/md';
import { useForm, UseFormReturnType } from '@mantine/form';
import toastService from '@/src/services/toast.service';
import httpService from '@/src/services/http.service';
import fetchPermissions from '@/src/services/permission-list.service';
import EmployeeDropdown from '../EmployeeDropdown';
import { IS_ROLE_ALREADY_REGISTERED } from '@/src/constants/server-errors';
import {
   RoleFormProps,
   ModuleVisibility,
   Permissions,
   FilteredPermissions,
   createRoleFormFields,
   SelectedPermission
} from '@/src/utils/roles-permissions-form.utils';
import { authStore } from '@/src/context/AuthWrapper';
import colours from '@/src/constants/palette';
import { capitalizeFirstLetter } from '@/src/utils/string-format-utils';
import ConfirmationDrawer from '../edit-role/ConfirmationDrawer';

const CreateRoleForm: FC<RoleFormProps> = ({ edit, roleId, closeDrawer, roleEditDetails }) => {
   const [permissions, setPermissions] = useState<any>({});
   const [moduleVisibility, setModuleVisibility] = useState<ModuleVisibility>({});
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
   const submitButtonRef = useRef<HTMLButtonElement>(null);
   const roleForm: UseFormReturnType<any> = useForm(createRoleFormFields);
   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

   useEffect(() => {
      const getPermissions = async () => {
         const permissiondata = await fetchPermissions();
         const initialPermissions: Record<string, Record<string, boolean>> = Object.keys(
            permissiondata
         ).reduce((acc: Record<string, Record<string, boolean>>, module) => {
            acc[module] = Object.keys(permissiondata[module]).reduce(
               (innerAcc: Record<string, boolean>, permissionId) => {
                  innerAcc[permissionId] = false;
                  return innerAcc;
               },
               {} as Record<string, boolean>
            );
            return acc;
         }, {});
         if (edit) {
            const selectedPermissions = roleEditDetails.permissions;

            selectedPermissions.forEach((selectedPermission: SelectedPermission) => {
               Object.keys(initialPermissions).forEach((module: string) => {
                  const moduleId = module as keyof typeof initialPermissions;
                  if (
                     permissiondata[moduleId]?.[
                        selectedPermission.id as unknown as keyof (typeof permissiondata)[typeof moduleId]
                     ]
                  ) {
                     initialPermissions[moduleId][selectedPermission.id] = true;
                  }
               });
            });
            roleForm.setValues({
               role: roleEditDetails.name,
               permissions: initialPermissions
            });
         } else {
            roleForm.setFieldValue('permissions', initialPermissions);
         }
         setPermissions(permissiondata);
         const initialVisibilityState: Record<string, boolean> = {};
         Object.keys(permissiondata).forEach((module) => {
            initialVisibilityState[module] = true;
         });
         setModuleVisibility(initialVisibilityState);
      };
      getPermissions();
   }, []);

   const handleRoleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!roleForm) {
         return;
      }
      if (roleForm.validate().hasErrors) {
         toastService.showToast({
            color: colours.error,
            title: 'Error',
            subtitle: 'Please fill all the fields to proceed'
         });
         return;
      }
      setDrawerOpened(true);
   };

   const handleConfirmSubmit = async () => {
      if (roleForm.validate().hasErrors) {
         toastService.showToast({
            color: colours.error,
            title: 'Error',
            subtitle: 'Please fill all the fields to proceed'
         });
         return;
      }
      try {
         const checkedPermissionIds: string[] = [];
         const selectedUserIds: string[] = selectedUsers;
         Object.keys(roleForm.values.permissions).forEach((module) => {
            Object.keys(roleForm.values.permissions[module]).forEach((permissionId) => {
               if (roleForm.values.permissions[module][permissionId]) {
                  checkedPermissionIds.push(permissionId);
               }
            });
         });

         const formData = {
            name: roleForm.values.role,
            permissionIds: checkedPermissionIds
         };
         const headers = {
            'Content-Type': 'application/json',
            'x-tenant-id': authStore.tenantId
         };
         const apiUrl = edit ? `/role/${roleId}` : '/role';
         const method = edit ? 'put' : 'post';
         const jsonData = JSON.stringify(formData);
         const roleResponse = await httpService[method](apiUrl, jsonData, { headers });
         if (roleResponse?.data?.statusCode !== 200) {
            throw new Error(`Failed to ${edit ? 'update' : 'create'} role`);
         }
         const response_roleId = roleResponse?.data?.data.id;
         if (!response_roleId) {
            throw new Error('Role ID is not available in the response');
         }

         if (!edit && selectedUserIds.length > 0) {
            await httpService.put(
               `/role/${response_roleId}/attach-users`,
               {
                  userIds: selectedUserIds
               },
               { headers }
            );
         }

         toastService.showToast({
            color: colours.success,
            title: 'Success',
            subtitle: `${roleForm.values.role} role ${edit ? 'updated' : 'created'} successfully`
         });
         closeDrawer({ fetch: true });
      } catch (error: any) {
         if (error?.response?.data?.error === IS_ROLE_ALREADY_REGISTERED) {
            toastService.showToast({
               color: colours.error,
               title: error,
               subtitle: 'Role already exists with the given name'
            });
         } else {
            toastService.showToast({
               color: colours.error,
               title:
                  error?.response?.data?.error ||
                  `${edit ? 'Error updating' : 'Error creating'} the role`
            });
         }
      } finally {
         setDrawerOpened(false);
         if (submitButtonRef.current) {
            submitButtonRef.current.disabled = false;
         }
      }
   };

   const handleCheckboxChange = (module: string, permissionId: string, checked: boolean) => {
      const updatedPermissions = { ...roleForm.values.permissions };
      updatedPermissions[module][permissionId] = checked;
      const anyChildChecked = Object.values(updatedPermissions[module]).some((perm) => perm);
      const firstChildId = Object.keys(updatedPermissions[module])[0];
      if (anyChildChecked && !updatedPermissions[module][firstChildId]) {
         updatedPermissions[module][firstChildId] = true;
      }

      roleForm.setFieldValue('permissions', updatedPermissions);
   };

   const handleParentCheckboxChange = (module: keyof Permissions, checked: boolean) => {
      const updatedPermissions: Permissions = { ...roleForm.values.permissions };
      updatedPermissions[module] = Object.keys(updatedPermissions[module]).reduce(
         (acc, permissionId) => {
            acc[permissionId] = checked;
            return acc;
         },
         {} as { [permissionId: string]: boolean }
      );
      roleForm.setFieldValue('permissions', updatedPermissions);
   };

   const toggleModuleVisibility = (module: string) => {
      setModuleVisibility((prevVisibility) => ({
         ...prevVisibility,
         [module]: !prevVisibility[module]
      }));
   };

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.currentTarget.value.toLowerCase());
   };

   const handleSelectedEmployeesChange = (selectedEmployees: string[]) => {
      setSelectedUsers(selectedEmployees);
      roleForm.setFieldValue('users', selectedEmployees);
   };

   const renderPermissions = () => {
      const filteredPermissions: FilteredPermissions = Object.keys(permissions).reduce(
         (result: FilteredPermissions, module: string) => {
            const filteredSubPermissions = Object.keys(permissions[module]).filter(
               (permissionId: string) => {
                  const permissionName = permissions[module][permissionId];
                  return (
                     typeof permissionName === 'string' &&
                     permissionName.toLowerCase().includes(searchTerm.toLowerCase())
                  );
               }
            );
            if (
               filteredSubPermissions.length > 0 ||
               module.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
               result[module] =
                  filteredSubPermissions.length > 0
                     ? filteredSubPermissions
                     : Object.keys(permissions[module]);
            }
            return result;
         },
         {} as FilteredPermissions
      );

      return Object.keys(filteredPermissions).map((module: string) => (
         <Box key={module} mb={4}>
            <Flex align='center' className='mb-2'>
               <Checkbox
                  color={colours.shadeBlue}
                  className='font-bold text-xs leading-5 border-b-50'
                  style={{ color: colours.greyDark }}
                  label={module.replace(/([A-Z])/g, ' $1')}
                  checked={Object.values(roleForm.values.permissions[module] || {}).every(
                     (perm) => perm as boolean
                  )}
                  onChange={(event) =>
                     handleParentCheckboxChange(module, event.currentTarget.checked)
                  }
               />
               <Box ml='auto'>
                  {moduleVisibility[module] ? (
                     <MdExpandLess
                        className='cursor-pointer'
                        style={{
                           background: colours.grey4XLight,
                           width: '1.125rem',
                           height: '1.125rem'
                        }}
                        onClick={() => toggleModuleVisibility(module)}
                     />
                  ) : (
                     <MdExpandMore
                        className='cursor-pointer'
                        style={{
                           background: colours.grey4XLight,
                           width: '1.125rem',
                           height: '1.125rem'
                        }}
                        onClick={() => toggleModuleVisibility(module)}
                     />
                  )}
               </Box>
            </Flex>
            {moduleVisibility[module] && (
               <Box ml={28}>
                  {filteredPermissions[module].map((permissionId: string) => (
                     <Checkbox
                        color={colours.shadeBlue}
                        key={permissionId}
                        label={permissions[module][permissionId]}
                        checked={roleForm.values.permissions[module][permissionId]}
                        onChange={(event) =>
                           handleCheckboxChange(module, permissionId, event.currentTarget.checked)
                        }
                        className='mb-2'
                     />
                  ))}
               </Box>
            )}
         </Box>
      ));
   };

   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={42}>
         <Flex direction={'column'} rowGap={4}>
            <h5 className={'text-h5 font-semibold'} style={{ color: colours.midNightDarkBlue }}>
               {edit ? 'Edit Role' : 'Create Role'}
            </h5>
            <p className='text-sm'>
               {edit ? 'Edit  ' : 'Create '} Role and define specific permissions to manage employee
               access levels.
            </p>
         </Flex>
         <form onSubmit={handleRoleFormSubmit} className='flex flex-col gap-y-3'>
            <Box>
               <TextInput
                  size='md'
                  className={'text-sm '}
                  label={<p className={'text-sm font-semibold mb-1'}>Role</p>}
                  placeholder='Enter role name'
                  name='role'
                  autoComplete='off'
                  {...roleForm.getInputProps('role')}
               />
            </Box>
            <Box>
               <TextInput
                  size='md'
                  label={<p className={'text-sm font-semibold mb-1'}>Select Permissions</p>}
                  placeholder={'Search'}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  rightSection={<MdOutlineSearch size={18} />}
                  styles={{ input: { backgroundColor: colours.grey6XLight } }}
               />
               <Divider my={24} />
               <Box mt={16}>{renderPermissions()}</Box>
            </Box>
            <Divider my={8} />
            {!edit && (
               <>
                  <label className={'text-sm font-semibold'}>
                     Assign role to employee{' '}
                     <span className='text-sm font-normal' style={{ color: colours.grey3XLight }}>
                        (Optional)
                     </span>
                  </label>
                  <EmployeeDropdown
                     selectedEmployees={selectedUsers}
                     onChange={handleSelectedEmployeesChange}
                     // eslint-disable-next-line @typescript-eslint/no-unused-vars
                     setSelectedEmployees={function (selectedEmployees: string[]): void {
                        throw new Error('Function not implemented.');
                     }}
                  />
               </>
            )}

            {edit && roleEditDetails.assignedTo?.length > 0 && (
               <>
                  <p className='text-sm font-semibold'>Assigned Employees</p>
                  <Flex direction='column' rowGap={16}>
                     {roleEditDetails.assignedTo.map((user: any, index: number) => (
                        <Flex className='w-full' key={index}>
                           <Box className='w-[80%] flex items-start space-x-3'>
                              {user.profilePhoto && user.profilePhoto !== 'null' ? (
                                 <Avatar src={user.profilePhoto} />
                              ) : (
                                 <Avatar radius='xl' />
                              )}
                              <div>
                                 <div className='text-sm font-semibold'>
                                    {capitalizeFirstLetter(user.firstName)}{' '}
                                    {capitalizeFirstLetter(user.lastName)}
                                 </div>
                                 <div className='text-xs' style={{ color: colours.shadeBlue }}>
                                    {user.email}
                                 </div>
                                 {user.title && user.title.trim().toLowerCase() !== 'null' && (
                                    <div className='text-xs'>
                                       {capitalizeFirstLetter(user.title)}
                                    </div>
                                 )}
                              </div>
                           </Box>
                           <Flex justify='flex-end' align='center' className='w-[20%]'>
                              <Box className='rounded-full p-2 bg-white border cursor-pointer'>
                                 <MdDelete size={14} className='text-red-500' />
                              </Box>
                           </Flex>
                        </Flex>
                     ))}
                  </Flex>
               </>
            )}
            <Box mt={44}>
               <Flex justify='space-between'>
                  <Button
                     variant={'light'}
                     bg={colours.grey4XLight}
                     color={colours.grey}
                     size={'md'}
                     onClick={() => closeDrawer({ fetch: true })}
                  >
                     Cancel
                  </Button>
                  {!edit ? (
                     <Button
                        color={colours.shadeBlue}
                        size={'md'}
                        type='submit'
                        onClick={handleConfirmSubmit}
                     >
                        Create Role
                     </Button>
                  ) : (
                     <Button
                        color={colours.shadeBlue}
                        size={'md'}
                        onClick={() => setDrawerOpened(true)}
                     >
                        Update
                     </Button>
                  )}
               </Flex>
            </Box>
            {edit && (
               <ConfirmationDrawer
                  opened={drawerOpened}
                  onClose={() => setDrawerOpened(false)}
                  onConfirm={handleConfirmSubmit}
               />
            )}
         </form>
      </Flex>
   );
};
export default CreateRoleForm;
