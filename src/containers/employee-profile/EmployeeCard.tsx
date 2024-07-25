import React from 'react';
import { Avatar, Box, Card, Flex, Title, Text, Drawer } from '@mantine/core';
import { MdModeEdit } from 'react-icons/md';
import EmployeeForm from '../employees-list/onboard-employee/EmployeeForm';
import EmployeeDetails from './ProfileDetails';
import { EmployeeCardProps } from './employee-types';
import colours from '@/src/constants/palette';

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, opened, onCloseDrawer }) => {
   return (
      <Flex direction='column' align='center' justify='center'>
         <Card
            withBorder
            radius={'lg'}
            className='shadow'
            padding='lg'
            mb='lg'
            style={{ width: '18.75rem' }}
         >
            <Box>
               <MdModeEdit
                  style={{
                     position: 'absolute',
                     top: '0.625rem',
                     right: '0.625rem',
                     cursor: 'pointer',
                     color: '#d9d9d9'
                  }}
                  onClick={onEdit}
               />
               <Drawer
                  opened={opened}
                  onClose={onCloseDrawer}
                  position={'right'}
                  size={'lg'}
                  withCloseButton={true}
                  closeOnEscape={false}
                  closeOnClickOutside={false}
                  padding={20}
               >
                  <EmployeeForm
                     edit
                     employeeId={employee.id}
                     userId={employee.user}
                     closeDrawer={onCloseDrawer}
                  />
               </Drawer>
            </Box>

            <Flex direction='column' align='center' justify='center'>
               <Avatar size={120} mb={0} src={employee.profilePhoto} alt='Profile Picture' />
               <Box style={{ width: '100%' }}>
                  <Flex direction='column' align='center' justify='center'>
                     <Title order={2}>{employee.firstName + ' ' + employee.lastName}</Title>
                     <Text size='lg' color='dimmed' style={{ textTransform: 'capitalize' }}>
                        {employee.title}
                     </Text>
                     <Flex align={'center'} mb={20}>
                        <Text
                           mr={'xs'}
                           color='dimmed'
                           display={'inline'}
                           className='font-normal text-xs'
                        >
                           EMP ID:{' '}
                        </Text>
                        <Text color={colours.greyDark} className='text-xs  font-normal'>
                           {employee.empId || ' - '}
                        </Text>
                     </Flex>

                     <EmployeeDetails employee={employee} />
                  </Flex>
               </Box>
            </Flex>
         </Card>
      </Flex>
   );
};

export default EmployeeCard;
