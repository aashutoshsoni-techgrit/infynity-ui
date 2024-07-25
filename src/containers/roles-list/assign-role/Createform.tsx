/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { Box, Button, Flex, Accordion } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import toastService from '@/src/services/toast.service';
import EmployeeDropdown from '../EmployeeDropdown';
import { userRoleData, assignroleFormFields } from '@/src/utils/user-role-form.utils';
import colours from '@/src/constants/palette';
import { assignRoles, getRolesDetails } from '@/src/services/roles-permissions.service';
import { useQuery } from '@tanstack/react-query';

const AssignForm: FC<{ roleId: string; closeDrawer: (params: { fetch: boolean }) => void }> = ({
   roleId,
   closeDrawer
}) => {
   const roleForm: UseFormReturnType<any> = useForm({
      initialValues: userRoleData.initialValues,
      validate: assignroleFormFields.validate
   });
   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
   const [externalFieldRequired] = useState<boolean>(true);
   const [defultselectedItems, setDefultselectedItems] = useState<string[]>([]);

   useQuery({
      queryFn: async () => {
         const roledetails = (await getRolesDetails(roleId)) ?? [];
         const assignedToIds = roledetails?.assignedTo.map((user: { id: string }) => user.id);
         setDefultselectedItems(assignedToIds);
      },
      queryKey: ['role-details-by-id', roleId]
   });

   const handleRoleFormSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      const selectedUserIds: string[] = selectedUsers;

      if (selectedUserIds.length === 0) {
         toastService.showToast({
            color: colours.error,
            title: 'Please select atleast one user to proceed'
         });
         return;
      }

      const formData = new FormData();
      selectedUsers.forEach((userId, index) => {
         formData.append(`userIds[${index}]`, userId);
      });

      if (await assignRoles(roleId, formData)) {
         const roleAssignedDetails = (await getRolesDetails(roleId)) ?? [];
         const rolename = roleAssignedDetails?.name;
         const assignedUserNames = roleAssignedDetails?.assignedTo
            .filter((roleresult: { id: number; firstName: string; lastName: string }) =>
               selectedUserIds.includes(roleresult.id.toString())
            )
            .map(
               (roleresult: { id: number; firstName: string; lastName: string }) =>
                  `${roleresult.firstName} ${roleresult.lastName}`
            )
            .join(', ');

         toastService.showToast({
            color: colours.success,
            title: 'Success',
            subtitle: `${rolename} role is assigned to ${assignedUserNames}`
         });
         closeDrawer({ fetch: true });
      }
   };

   const handleSelectedEmployeesChange = (selectedEmployees: string[]) => {
      setSelectedUsers(selectedEmployees);
      roleForm.setFieldValue('users', selectedEmployees);
   };

   const formatTitle = (title: string) => {
      return title
         .split('-')
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
         .join(' ');
   };

   const titlesForDefaultVal =
      userRoleData.data.permissions?.map((item: { title: string }) => formatTitle(item.title)) ||
      [];

   const permissionsGroupedByTitle =
      userRoleData?.data?.permissions?.reduce(
         (acc: Record<string, string[]>, permission: { title: string; type: string }) => {
            const formattedTitle = formatTitle(permission.title);
            if (!acc[formattedTitle]) {
               acc[formattedTitle] = [];
            }
            acc[formattedTitle].push(permission.type);
            return acc;
         },
         {}
      ) || {};

   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={42}>
         <Flex rowGap={8} direction='column'>
            <h5 className='text-h5 font-semibold' style={{ color: colours.midNightDarkBlue }}>
               Assign Role
            </h5>
            <p className='inline-block break-words leading-5'>
               To assign a Role, select the employee name from the dropdown menu.
            </p>
         </Flex>

         <form className='flex flex-col gap-y-3' onSubmit={handleRoleFormSubmit}>
            <label className='text-md font-normal mb-1 text-grey-dark' style={{}}>
               Assign Role to Employee
            </label>
            <span className='-mt-3'>
               {externalFieldRequired && (
                  <EmployeeDropdown
                     onChange={handleSelectedEmployeesChange}
                     selectedEmployees={[]}
                     defultselectedItems={defultselectedItems}
                     setSelectedEmployees={function (): void {
                        throw new Error('Function not implemented.');
                     }}
                  />
               )}
            </span>
            <div className='mb-2'></div>
            <Box className='max-h-[31.25rem] overflow-y-auto'>
               <span className='text-sm mb-1'>Permission(s)</span>
               <Accordion defaultValue={titlesForDefaultVal}>
                  {Object.keys(permissionsGroupedByTitle).map((title, index) => (
                     <Accordion.Item
                        key={index}
                        value={title}
                        className='border-b-0 bg-transparent'
                        style={{ border: '0rem', padding: '0' }}
                     >
                        <Accordion.Control
                           styles={{
                              chevron: {
                                 backgroundColor: colours.grey4XLight,
                                 borderRadius: '0.3rem',
                                 paddingLeft: 5,
                                 paddingRight: 4,
                                 width: 22,
                                 height: 22
                              }
                           }}
                        >
                           <Flex align='center' columnGap={10}>
                              <Box className='inline-block min-w-2 min-h-2 rounded bg-grey' />
                              <p
                                 className='font-semibold text-md hover:bg-transparent '
                                 style={{ color: colours.greyDark }}
                              >
                                 {title}
                              </p>
                           </Flex>
                        </Accordion.Control>
                        <Accordion.Panel>
                           <ul className='list-none'>
                              {permissionsGroupedByTitle[title].map(
                                 (
                                    type: { toString: () => string },
                                    index: React.Key | null | undefined
                                 ) => (
                                    <li key={index} className='text-sm font-normal ml-5'>
                                       {type
                                          .toString()
                                          .toLowerCase()
                                          .split(' ')
                                          .map(
                                             (word: string) =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                          )
                                          .join(' ')}
                                    </li>
                                 )
                              )}
                           </ul>
                        </Accordion.Panel>
                     </Accordion.Item>
                  ))}
               </Accordion>
            </Box>

            <Flex justify={'space-between'} mt={32} className={'w-full'}>
               <Button
                  variant={'light'}
                  bg={colours.grey4XLight}
                  color={colours.grey}
                  size={'md'}
                  onClick={() => closeDrawer({ fetch: false })}
               >
                  <span className='text-sm' color={colours.grey}>
                     Cancel
                  </span>
               </Button>
               <Button type='submit' color={colours.shadeBlue} size={'md'}>
                  Assign
               </Button>
            </Flex>
         </form>
      </Flex>
   );
};

export default AssignForm;
