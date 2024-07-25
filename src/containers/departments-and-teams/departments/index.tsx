import React, { FC } from 'react';
import {
   DepartmentsProps,
   DepartmentType
} from '@/src/containers/departments-and-teams/departments/departments.types';
import { Box, Flex, Grid } from '@mantine/core';
import { MdArrowDownward } from 'react-icons/md';
import Department from '@/src/containers/departments-and-teams/departments/Department';

const skeletonArray = Array(5).fill(0);

const Departments: FC<DepartmentsProps> = ({ departments, isDataFetching }) => {
   const departmentsToDisplay = isDataFetching() ? skeletonArray : departments;

   return (
      <Box py={12}>
         <Grid>
            <Grid.Col span={7} pl={40}>
               <Flex className={'h-full cursor-pointer'} align={'center'}>
                  <p className={'font-semibold mr-2'}>Name</p>
                  <MdArrowDownward />
               </Flex>
            </Grid.Col>
            <Grid.Col span={2.5}>
               <Flex className={'h-full cursor-pointer'} align={'center'}>
                  <p className={'font-semibold mr-2'}>Head of Department</p>
                  <MdArrowDownward />
               </Flex>
            </Grid.Col>
            <Grid.Col span={2.5} />
         </Grid>

         <Flex direction={'column'} mt={14}>
            {departmentsToDisplay?.map((department: DepartmentType) => (
               <Department
                  key={department.id}
                  department={department}
                  leftMargin={0}
                  isParent
                  isDataFetching={isDataFetching}
               />
            ))}
         </Flex>
      </Box>
   );
};

export default Departments;
