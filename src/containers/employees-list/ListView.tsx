/* eslint-disable max-lines-per-function */
'use client';

import React, { FC, useContext } from 'react';
import { Avatar, Badge, Box, Flex, Grid, Skeleton, Tooltip } from '@mantine/core';
import { MdArrowDownward } from 'react-icons/md';
import colours from '@/src/constants/palette';
import EditEmployee from '@/src/containers/employees-list/edit-employee';
import { useRouter } from 'next/navigation';
import { EmployeeListContext } from '@/src/context/employee-list-view.context';
import { deleteUserIcon } from '@/src/constants/icons';
import { EmployeeType } from '@/src/containers/employees-list/employees.types';
import { businessmanIcon } from '@/src/constants/icons';
import { AuthContext } from '@/src/context/AuthWrapper';
import { PageModules, pageModulePermission } from '@/src/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListView: FC<{ employees: any }> = ({ employees }) => {
   const router = useRouter();
   const { isDataFetching } = useContext(EmployeeListContext);
   const fetchingEmployees: boolean | undefined = isDataFetching?.();
   const redirectToEmployeeDetails = (empID: string) => {
      router.replace('/employees/' + empID);
   };
   const { hasPermission } = useContext(AuthContext);

   if (fetchingEmployees) {
      employees = [1, 2, 3, 4, 5];
   }
   return (
      <Box>
         <Grid>
            <Grid.Col span={2.6} pl={40}>
               <Flex className={'h-full cursor-pointer'} align={'center'}>
                  <p className={'font-semibold mr-2'}>Employee Name</p>
                  <MdArrowDownward />
               </Flex>
            </Grid.Col>
            <Grid.Col span={1}>
               <Flex className={'h-full cursor-pointer'} align={'center'}>
                  <p className={'font-semibold mr-2'}>EMP ID</p>
                  <MdArrowDownward />
               </Flex>
            </Grid.Col>
            <Grid.Col span={2.1}>
               <Flex className={'h-full cursor-pointer'} align={'center'}>
                  <p className={'font-semibold mr-2'}>Email</p>
                  <MdArrowDownward />
               </Flex>
            </Grid.Col>
            <Grid.Col span={1.6}>
               <Flex className={'h-full cursor-pointer'} align={'center'}>
                  <p className={'font-semibold mr-2'}>Title</p>
                  <MdArrowDownward />
               </Flex>
            </Grid.Col>
            <Grid.Col span={1.6}>
               <Flex className={'h-full cursor-pointer'} align={'center'}>
                  <p className={'font-semibold mr-2'}>Reports to</p>
                  <MdArrowDownward />
               </Flex>
            </Grid.Col>
            <Grid.Col span={1.7}>
               <Flex className={'h-full cursor-pointer'} align={'center'}>
                  <Box>
                     <p className={'font-semibold'}>Department/</p>
                     <p className={'font-semibold mr-2'}>Sub-Department</p>
                  </Box>
                  <MdArrowDownward />
               </Flex>
            </Grid.Col>
            <Grid.Col span={1.4} />
         </Grid>
         {employees?.map?.((employee: EmployeeType, index: number) => (
            <Grid className={'bg-white py-3'} key={index}>
               <Grid.Col span={2.6} pl={34}>
                  <Flex align={'center'} pr={8} className={'h-full'}>
                     <Flex align={'center'} columnGap={8} className={`w-full cursor-pointer`}>
                        {fetchingEmployees ? (
                           <>
                              <Box>
                                 <Skeleton height={40} circle />
                              </Box>
                              <Skeleton height={12} radius={'xl'} />
                           </>
                        ) : (
                           <>
                              <Avatar src={employee.profilePhoto} />
                              <h6
                                 className={
                                    'text-base font-semibold text-black hover:underline truncate'
                                 }
                                 onClick={() =>
                                    employee.id && redirectToEmployeeDetails(employee.id)
                                 }
                              >{`${employee.firstName} ${employee.lastName}`}</h6>
                           </>
                        )}
                     </Flex>
                  </Flex>
               </Grid.Col>
               <Grid.Col span={1}>
                  <Flex align={'center'} pr={8} className={'h-full'}>
                     {fetchingEmployees ? (
                        <Skeleton height={12} radius={'xl'} />
                     ) : (
                        <p className={'text-sm truncate'}>{employee.empId}</p>
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={2.1}>
                  <Flex align={'center'} pr={8} className={'h-full'}>
                     {fetchingEmployees ? (
                        <Skeleton height={12} radius={'xl'} />
                     ) : (
                        <p className={'text-sm truncate'}>{employee.email}</p>
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={1.6}>
                  <Flex align={'center'} pr={8} className={'h-full'}>
                     {fetchingEmployees ? (
                        <Skeleton height={12} radius={'xl'} />
                     ) : (
                        <>
                           {employee.title && (
                              <Badge
                                 px={8}
                                 py={12}
                                 bg={colours.shadeBlue}
                                 styles={{
                                    root: {
                                       textTransform: 'none',
                                       borderRadius: '0.3rem'
                                    }
                                 }}
                              >
                                 {employee.title}
                              </Badge>
                           )}
                        </>
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={1.6}>
                  <Flex align='center' pr={8} columnGap={8} className='h-full'>
                     {employee.reportsToUser && employee.reportsToUser.length > 0 && (
                        <>
                           {businessmanIcon}
                           <div style={{ color: colours.black }} className='text-md font-bold'>
                              {employee.reportsTo && (
                                 <Tooltip
                                    label={
                                       <div style={{ whiteSpace: 'pre-line' }}>
                                          {employee.reportsToUser.length > 0 &&
                                          employee.reportsToUser &&
                                          employee.reportsToUser.length > 0
                                             ? employee.reportsToUser
                                                  .map(
                                                     (user) =>
                                                        `• ${user.firstName} ${user.lastName}`
                                                  )
                                                  .join('\n')
                                             : ' - '}
                                       </div>
                                    }
                                    position={'right'}
                                    arrowSize={8}
                                    withArrow
                                    className={'max-w-[25rem]'}
                                    multiline
                                 >
                                    <p className={'text-sm truncate'}>
                                       {Array.isArray(employee.reportsToUser)
                                          ? employee.reportsToUser.length
                                          : '0'}
                                    </p>
                                 </Tooltip>
                              )}
                           </div>
                        </>
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={1.7}>
                  <Flex align={'center'} pr={4} className={'h-full'}>
                     {fetchingEmployees ? (
                        <Skeleton height={12} radius={'xl'} />
                     ) : (
                        <>
                           {employee.department && (
                              <p className={'text-sm truncate'}>{employee.department}</p>
                           )}
                        </>
                     )}
                  </Flex>
               </Grid.Col>
               <Grid.Col span={1.4}>
                  <Flex justify={'center'} align={'center'} className={'h-full'} columnGap={6}>
                     {fetchingEmployees ? (
                        <Skeleton height={40} circle />
                     ) : (
                        hasPermission?.(PageModules.EMPLOYEE, pageModulePermission.EDIT) && (
                           <EditEmployee employee={employee} />
                        )
                     )}
                     {fetchingEmployees ? (
                        <Skeleton height={40} circle />
                     ) : (
                        hasPermission?.(PageModules.EMPLOYEE, pageModulePermission.DELETE) && (
                           <Box
                              className={
                                 'inline-block hover:bg-grey-4x-light rounded-[50%] p-2 border border-solid border-error cursor-pointer'
                              }
                           >
                              {deleteUserIcon}
                           </Box>
                        )
                     )}
                  </Flex>
               </Grid.Col>
            </Grid>
         ))}
      </Box>
   );
};
export default ListView;
