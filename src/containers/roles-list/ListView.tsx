import React, { useContext } from 'react';
import { Box, Grid, Tooltip, Skeleton, Flex } from '@mantine/core';
import { MdInfoOutline } from 'react-icons/md';
import colours from '@/src/constants/palette';
import { ListViewProps, PermissionType } from '@/src/utils/roles-permissions-form.utils';
import AssignRole from './assign-role';
import EditRole from './edit-role';
import { getDateInLongFormat } from '@/src/utils/dates.utils';
import ViewRole from './view-role';
import { AuthContext } from '@/src/context/AuthWrapper';
import { PageModules, pageModulePermission } from '@/src/constants';
import { deleteIcon, userIcon } from '@/src/constants/icons';
import { RolesListContext } from '@/src/context/roles-list-view.context';
import RoleHeader from './RoleHeader';

const ListView: React.FC<ListViewProps> = ({ roles, searchQuery }) => {
   const [hoveredRoleId, setHoveredRoleId] = React.useState<string | null>(null);
   const { hasPermission } = useContext(AuthContext);
   const { isDataFetching } = useContext(RolesListContext);
   const fetchingRoles: boolean | undefined = isDataFetching?.();

   const handleRoleMouseEnter = (roleId: string) => {
      setHoveredRoleId(roleId);
   };

   const handleRoleMouseLeave = () => {
      setHoveredRoleId(null);
   };

   const filteredRoles = roles?.filter((role) => {
      const nameMatches = role?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const permissionsCountMatches = role?.permissions.length
         .toString()
         .toLowerCase()
         .includes(searchQuery.toLowerCase());

      const createdOnMatches = getDateInLongFormat(role?.createdAt)
         .toLowerCase()
         .includes(searchQuery.toLowerCase());

      const assignedToMatches = role?.assignedTo
         .toString()
         .toLowerCase()
         .includes(searchQuery.toLowerCase());

      return nameMatches || permissionsCountMatches || createdOnMatches || assignedToMatches;
   });

   const sortedRoles = filteredRoles?.sort(() => {
      return 0;
   });

   const skeletonArray = Array(5).fill(0);

   const rolesToDisplay = fetchingRoles ? skeletonArray : sortedRoles;

   return (
      <Box>
         <Grid pt={12} pb={8}>
            <RoleHeader label='Roles' span={4} pl={40} />
            <RoleHeader label='Permissions' span={2} pl={20} />
            <RoleHeader label='Created on' span={1.7} pl={10} />
            <RoleHeader label='Assigned to' span={1.7} pl={10} />
         </Grid>
         {rolesToDisplay?.map((role, index) => (
            <Grid
               key={index}
               className='bg-white py-3'
               onMouseEnter={() => handleRoleMouseEnter(role.id)}
               onMouseLeave={handleRoleMouseLeave}
            >
               <Grid.Col span={4} pl={40}>
                  <Flex align='center' pr={8} className='h-full'>
                     {fetchingRoles ? (
                        <Skeleton height={12} radius={'xl'} width='100%' />
                     ) : (
                        <ViewRole role={role} />
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={2} pl={18}>
                  <Flex align='center' pr={8} className='h-full'>
                     {fetchingRoles ? (
                        <Skeleton height={12} radius={'xl'} width='100%' />
                     ) : (
                        <Flex className='w-full cursor-pointer font-semibold text-blue-500 hover:underline truncate'>
                           <p
                              className='text-base font-normal text-shade-blue truncate'
                              onClick={() => {}}
                           >
                              {role.permissions.length} permissions
                           </p>
                           <Tooltip
                              label={
                                 hoveredRoleId === role.id && (
                                    <ul className='p-3 pl-6'>
                                       {role.permissions
                                          .reduce((acc: string[], permission: PermissionType) => {
                                             if (!acc.includes(permission.title as string)) {
                                                acc.push(permission.title as string);
                                             }
                                             return acc;
                                          }, [])
                                          .map((title: string) => (
                                             <li
                                                className='text-white font-normal leading-4'
                                                style={{ fontSize: '0.625rem' }}
                                                key={title}
                                             >
                                                <span className='bullet-point'>
                                                   {title
                                                      .split('-')
                                                      .map(
                                                         (word: string) =>
                                                            word.charAt(0).toUpperCase() +
                                                            word.slice(1)
                                                      )
                                                      .join(' ')}{' '}
                                                </span>
                                                <ul className='ml-2 list-none'>
                                                   {role.permissions
                                                      .filter(
                                                         (permission: PermissionType) =>
                                                            permission.title === title
                                                      )
                                                      .map((permission: PermissionType) => (
                                                         <li
                                                            className='text-xxs text-gray-400 font-normal leading-4'
                                                            key={permission.id}
                                                         >
                                                            {permission.type
                                                               .charAt(0)
                                                               .toUpperCase() +
                                                               permission.type.slice(1)}
                                                         </li>
                                                      ))}
                                                </ul>
                                             </li>
                                          ))}
                                    </ul>
                                 )
                              }
                              position='right'
                              withArrow
                              arrowSize={7}
                           >
                              <div>
                                 <MdInfoOutline size={12} className='mt-1.5 ml-1.5' />
                              </div>
                           </Tooltip>
                        </Flex>
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={1.7} pl={14}>
                  <Flex align='center' pr={8} className='h-full'>
                     {fetchingRoles ? (
                        <Skeleton height={12} radius={'xl'} width='100%' />
                     ) : (
                        <p className='text-sm text-black truncate font-semibold'>
                           {getDateInLongFormat(role.createdAt)}
                        </p>
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={1.6}>
                  <Flex align='center' pr={8} columnGap={8} className='h-full'>
                     {fetchingRoles ? (
                        <Skeleton height={12} radius={'xl'} width='100%' />
                     ) : (
                        <>
                           {userIcon}
                           <p style={{ color: colours.black }} className='text-md font-bold'>
                              {role.assignedTo}
                           </p>
                        </>
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={2.5}>
                  <Flex
                     pr={10}
                     align='center'
                     justify={'flex-end'}
                     className='h-full'
                     columnGap={16}
                  >
                     {fetchingRoles ? (
                        <Flex align={'center'} columnGap={8}>
                           <Skeleton height={40} width={40} circle />
                           <Skeleton height={40} width={40} circle />
                           <Skeleton height={20} width={80} />
                        </Flex>
                     ) : (
                        <>
                           {hasPermission?.(PageModules.ROLES, pageModulePermission.EDIT) && (
                              <EditRole role={role.id} />
                           )}
                           {hasPermission?.(PageModules.ROLES, pageModulePermission.DELETE) && (
                              <div className='rounded-full p-2 bg-white border border-gray-300 cursor-pointer'>
                                 {deleteIcon}
                              </div>
                           )}
                           {hasPermission?.(PageModules.ROLES, pageModulePermission.EDIT) && (
                              <AssignRole role={role} />
                           )}
                        </>
                     )}
                  </Flex>
               </Grid.Col>
            </Grid>
         ))}
      </Box>
   );
};

export default ListView;
