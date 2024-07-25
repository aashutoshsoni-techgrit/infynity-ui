import React, { FC } from 'react';
import {
   DepartmentDetailsProps,
   DepartmentType
} from '@/src/containers/departments-and-teams/departments/departments.types';
import { Avatar, Box, Flex } from '@mantine/core';
import SubDepartment from '@/src/containers/departments-and-teams/departments/department-details/SubDepartment';

const DepartmentDetails: FC<DepartmentDetailsProps> = ({ department }) => {
   return (
      <>
         {department ? (
            <Flex direction={'column'} rowGap={28} px={36} pb={42}>
               <h5 className={'text-h5 font-semibold text-midnight-blue'}>
                  {department?.parentId ? 'Sub-Department Details' : 'Department Details'}
               </h5>
               <Box>
                  <p className={'font-medium text-sm'}>
                     {department.parentId && 'Sub-'}Department Name
                  </p>
                  <h5 className={'text-h5 text-black font-semibold'}>
                     {department?.departmentName}
                  </h5>
               </Box>
               <Box>
                  <p className={'font-medium text-sm'}>Department Head</p>
                  <Flex align={'flex-start'} columnGap={16} className={'mt-3'}>
                     <Avatar src={department?.deptHeadDetails?.profilePhoto} size={'lg'} />
                     <Box>
                        <p className={'text-base font-semibold'}>
                           {department?.deptHeadDetails?.firstName}{' '}
                           {department?.deptHeadDetails?.lastName}
                        </p>
                        <p className={'text-xs text-shade-blue'}>
                           {department?.deptHeadDetails?.email}
                        </p>
                        <p className={'text-xs'}>{department?.deptHeadDetails?.title}</p>
                     </Box>
                  </Flex>
               </Box>
               {department.description && (
                  <Box>
                     <p className={'font-medium text-sm'}>Description</p>
                     <p className={'text-black'}>{department?.description}</p>
                  </Box>
               )}
               {department?.children?.length > 0 && (
                  <Box>
                     <p className={'font-medium text-sm mb-2'}>List of Sub-Departments</p>
                     {department.children?.map((subDepartment: DepartmentType) => (
                        <SubDepartment
                           key={department.id}
                           department={subDepartment}
                           leftMargin={-28}
                        />
                     ))}
                  </Box>
               )}
            </Flex>
         ) : (
            <></>
         )}
      </>
   );
};

export default DepartmentDetails;
