import React from 'react';
import { Box, Flex, Text, Tooltip } from '@mantine/core';
import { MdInfoOutline } from 'react-icons/md';
import { Employee } from './employee-types';
import colours from '@/src/constants/palette';
import { briefCaseIcon } from '@/src/constants/icons';
import { formatPhoneNumber } from '@/src/utils/form-utils';

interface EmployeeDetailsProps {
   employee: Employee;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
   const formattedPhoneNumber = employee.phone
      ? formatPhoneNumber(employee.phone, employee.countryCode)
      : ' - ';

   const userPhoneNumber =
      employee.countryCode && !formattedPhoneNumber?.includes(employee.countryCode)
         ? `${employee.countryCode} ${formattedPhoneNumber}`
         : `${formattedPhoneNumber}`;

   return (
      <Box style={{ width: '90%' }}>
         <Flex align={'center'} mb={'md'}>
            <Box className='mr-2'>{briefCaseIcon}</Box>
            <Text size='1.25rem' color={colours.midNightDarkBlue} fw={600}>
               Employee Details
            </Text>
         </Flex>
         <Box style={{ borderBottom: '0.063rem solid rgb(238 238 238)' }} mb={'sm'}>
            <Text size='sm' color='dimmed' display={'inline'}>
               Gender
            </Text>
            <Text color='black' size='md' style={{ textTransform: 'capitalize' }}>
               {employee.gender || ' - '}
            </Text>
         </Box>
         <Box style={{ borderBottom: '0.063rem solid rgb(238 238 238)' }} mb={'sm'}>
            <Text size='sm' color='dimmed' display={'inline'}>
               Date of Joining
            </Text>
            <Text color='black' size='md' style={{ textTransform: 'capitalize' }}>
               {employee.dateOfJoining
                  ? new Date(employee.dateOfJoining).toLocaleDateString()
                  : ' - '}
            </Text>
         </Box>
         <Box style={{ borderBottom: '0.063rem solid rgb(238 238 238)' }} mb={'sm'}>
            <Text size='sm' color='dimmed' display={'inline'}>
               Email
            </Text>
            <Text color='black' size='md'>
               {employee.email}
            </Text>
         </Box>
         <Box style={{ borderBottom: '0.063rem solid rgb(238 238 238)' }} mb={'sm'}>
            <Text size='sm' color='dimmed' display={'inline'}>
               Phone
            </Text>
            <Text color='black' size='md' style={{ textTransform: 'capitalize' }}>
               {userPhoneNumber}
            </Text>
         </Box>
         <Box
            style={{
               borderBottom: '0.063rem solid rgb(238 238 238)'
            }}
            mb={'sm'}
         >
            <Text size='sm' color='dimmed' display={'inline'}>
               Reports to
            </Text>
            <Flex align='center' pr={8} columnGap={8} className='h-full'>
               <div style={{ color: 'black' }} className='text-md font-bold'>
                  {employee.reportsTo && (
                     <Tooltip
                        label={
                           <div style={{ whiteSpace: 'pre-line' }}>
                              {employee.reportsToUser && employee.reportsToUser.length > 0
                                 ? employee.reportsToUser
                                      .map((user) => `? ${user.firstName} ${user.lastName}`)
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                           <p className={'text-sm truncate'}>
                              {employee.reportsToUser ? employee.reportsToUser.length : '0'}
                           </p>
                           <MdInfoOutline className='cursor-pointer text-sm ml-2' />
                        </div>
                     </Tooltip>
                  )}
               </div>
            </Flex>
         </Box>
         <Box
            style={{
               borderBottom: '0.063rem solid rgb(238 238 238)'
            }}
            mb={'sm'}
         >
            <Text size='sm' color='dimmed' display={'inline'}>
               Role Based Access
            </Text>
            <Text color='black' size='md' style={{ textTransform: 'capitalize' }}>
               {' - '}
            </Text>
         </Box>
         <Box
            style={{
               borderBottom: '0.063rem solid rgb(238 238 238)'
            }}
            mb={'sm'}
         >
            <Text size='sm' color='dimmed' display={'inline'}>
               Department
            </Text>
            <Text color='black' size='md' style={{ textTransform: 'capitalize' }}>
               {employee.department || ' - '}
            </Text>
         </Box>
         <Box
            style={{
               borderBottom: '0.063rem solid rgb(238 238 238)'
            }}
            mb={'sm'}
         >
            <Text size='sm' color='dimmed' display={'inline'}>
               Sub Department
            </Text>
            <Text color='black' size='md' style={{ textTransform: 'capitalize' }}>
               {employee.subDepartment || ' - '}
            </Text>
         </Box>
         <Box>
            <Text size='sm' color='dimmed' display={'inline'}>
               Address
            </Text>
            <Text color='black' size='md' style={{ textTransform: 'capitalize' }}>
               {employee.address +
                  (employee.city && ', ' + employee.city) +
                  (employee.state && ', ' + employee.state) +
                  (employee.country && ', ' + employee.country) +
                  (employee.zipCode && ', ' + employee.zipCode)}
            </Text>
         </Box>
      </Box>
   );
};

export default EmployeeDetails;
