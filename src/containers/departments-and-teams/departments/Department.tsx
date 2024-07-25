import React, { FC, useEffect, useState } from 'react';
import { Box, Drawer, Flex, Grid, Skeleton } from '@mantine/core';
import EditDepartment from '@/src/containers/departments-and-teams/departments/edit-department';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdHorizontalRule } from 'react-icons/md';
import {
   DepartmentProps,
   DepartmentType
} from '@/src/containers/departments-and-teams/departments/departments.types';
import DepartmentDetails from '@/src/containers/departments-and-teams/departments/department-details';
import { hodIcon, deleteIcon } from '@/src/constants/icons';
import { useDisclosure } from '@mantine/hooks';
import { getDepartmentById } from '@/src/services/departments.service';

const Department: FC<DepartmentProps> = ({
   department,
   isParent,
   leftMargin,
   isDataFetching,
   showChildren = false
}) => {
   const [drawerOpened, { open, close }] = useDisclosure(false);
   const [opened, setOpened] = useState<boolean>(isParent ? false : showChildren);
   const [showAllChildren, setShowAll] = useState<boolean>(false);
   const [viewDepartment, setViewDepartment] = useState<DepartmentType>();

   const handleViewDepartmentDetailsClick = async (departmentId: string) => {
      const department = await getDepartmentById(departmentId);
      setViewDepartment(department);
      open();
   };

   const handleAccordionClick = (event: { stopPropagation: () => void }, hasChildren: boolean) => {
      event.stopPropagation();

      if (!hasChildren) {
         return;
      }

      setOpened((prev) => {
         const opened = !prev;
         isParent && !opened && setShowAll(false);
         return opened;
      });
   };

   const handleShowAllClick = () => {
      if (!department?.children?.length) {
         return;
      }

      setOpened(() => !showAllChildren);
      setShowAll((prev) => !prev);
   };

   useEffect(() => {
      !isParent && setOpened(showChildren);
   }, [showChildren]);

   const isLoading = isDataFetching();

   return (
      <>
         <Grid className={'hover:bg-grey-6x-light'} py={7}>
            <Grid.Col span={7.5} pl={40}>
               <Flex align={'center'} className={'h-full'} columnGap={10} pl={leftMargin}>
                  <Flex
                     justify={'center'}
                     align={'center'}
                     className={`bg-grey-4x-light w-5 h-5 rounded ${department?.children?.length > 0 ? 'cursor-pointer' : 'cursor-no-drop'}`}
                     onClick={(event) =>
                        handleAccordionClick(event, department?.children?.length > 0)
                     }
                  >
                     {isLoading ? (
                        <Box>
                           <Skeleton height={12} circle />
                        </Box>
                     ) : department.children.length > 0 ? (
                        opened ? (
                           <MdKeyboardArrowUp size={16} />
                        ) : (
                           <MdKeyboardArrowDown size={16} />
                        )
                     ) : (
                        <MdHorizontalRule size={12} />
                     )}
                  </Flex>
                  {isLoading ? (
                     <Skeleton height={12} width={200} />
                  ) : (
                     <h6
                        className={`text-black text-base cursor-pointer hover:underline ${isParent ? ' font-semibold' : 'font-medium'}`}
                        onClick={() => handleViewDepartmentDetailsClick(department.id)}
                     >
                        {department.departmentName}
                     </h6>
                  )}
               </Flex>
            </Grid.Col>
            <Grid.Col span={2}>
               <Flex align={'center'} className={'h-full'} columnGap={8}>
                  {isLoading ? (
                     <Flex align={'center'} columnGap={8}>
                        <Skeleton height={20} circle />
                        <Skeleton height={12} width={100} />
                     </Flex>
                  ) : (
                     <>
                        {hodIcon}
                        <h6
                           className={`font-semibold text-sm ${isParent ? 'text-black' : ''} truncate`}
                        >
                           {department.deptHeadDetails.firstName}{' '}
                           {department.deptHeadDetails.lastName}
                        </h6>
                     </>
                  )}
               </Flex>
            </Grid.Col>
            <Grid.Col span={2.5} pr={40}>
               <Flex justify={'flex-end'} align={'center'} className={'h-full'} columnGap={12}>
                  {isLoading ? (
                     <Flex align={'center'} columnGap={8}>
                        <Skeleton height={40} width={40} circle />
                        <Skeleton height={40} width={40} circle />
                        <Skeleton height={30} width={80} />
                     </Flex>
                  ) : (
                     <>
                        <EditDepartment department={department} isSubDepartment={!isParent} />
                        <Box
                           className={
                              'inline-block hover:bg-grey-4x-light rounded-[50%] p-2.5 border border-solid border-error cursor-pointer'
                           }
                        >
                           {deleteIcon}
                        </Box>
                        <Flex
                           justify={'center'}
                           align={'center'}
                           className={`text-shade-blue border border-solid border-shade-blue cursor-pointer text-base rounded-[1.8rem] py-1.5 px-4 hover:bg-grey-5x-light min-w-24 max-w-24 ${!isParent || !department?.children?.length ? 'invisible' : ''}`}
                           onClick={handleShowAllClick}
                        >
                           {opened && showAllChildren ? 'Hide All' : 'Show all'}
                        </Flex>
                     </>
                  )}
               </Flex>
            </Grid.Col>
         </Grid>
         <Flex
            direction={'column'}
            className={`duration-300 ${opened ? 'h-auto overflow-visible' : 'h-0 overflow-hidden'}`}
         >
            {department?.children?.map((subDepartment: DepartmentType) => (
               <Department
                  key={subDepartment.id}
                  department={subDepartment}
                  leftMargin={leftMargin + 24}
                  showChildren={isParent ? showAllChildren : showChildren}
                  isDataFetching={isDataFetching}
               />
            ))}
         </Flex>
         <Drawer opened={drawerOpened} onClose={close} position={'right'} size={'lg'} padding={20}>
            {viewDepartment && <DepartmentDetails department={viewDepartment} />}
         </Drawer>
      </>
   );
};

export default Department;
