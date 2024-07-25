import React, { FC } from 'react';
import {
   DepartmentType,
   SubDepartmentProps
} from '@/src/containers/departments-and-teams/departments/departments.types';
import { Box, Flex } from '@mantine/core';
import { subDepartmentArrowIcon } from '@/src/constants/icons';

const SubDepartment: FC<SubDepartmentProps> = ({ department, leftMargin, isChildren }) => (
   <>
      <Flex align={'flex-start'} columnGap={10} ml={isChildren ? leftMargin : 0} my={8}>
         {isChildren && subDepartmentArrowIcon}
         <Box className={'rounded-lg px-4 py-3 text-black text-sm bg-grey-6x-light w-full'}>
            {department.departmentName}
         </Box>
      </Flex>
      {department.children?.map((subDepartment: DepartmentType) => (
         <SubDepartment
            key={subDepartment.id}
            department={subDepartment}
            leftMargin={leftMargin + 28}
            isChildren
         />
      ))}
   </>
);

export default SubDepartment;
