import React, { FC, useRef } from 'react';
import { Select, TextInput, Flex, Tooltip, Button } from '@mantine/core';
import { MdInfoOutline, MdOutlineDateRange } from 'react-icons/md';
import { DatePickerInput } from '@mantine/dates';
import { onboardEmployeeFormDropdowns } from '@/src/utils/onboard-employee-form.utils';
import { EmployeeFormOptionalInfoProps } from './employee-form.types';
import SearchableDropDown from '@/src/components/SearchableDropDown';
import FormLabel from '@/src/components/forms/FormLabel';
import colours from '@/src/constants/palette';
import { Optional } from '@/src/components';

const EmployeeFormOptionalInfo: FC<EmployeeFormOptionalInfoProps> = ({ employeeForm }) => {
   const datePickerRef = useRef<HTMLButtonElement | null>(null);

   return (
      <>
         <TextInput
            label={
               <FormLabel
                  label={'Title'}
                  optional
                  info={'Title represents job designation or position within the organization.'}
               />
            }
            placeholder={'Enter Title'}
            size={'md'}
            {...employeeForm.getInputProps('title')}
         />
         <Flex direction={'column'}>
            <p className={'text-sm text-black-x-light font-medium'}>
               Role Based Access <Optional />{' '}
               <Tooltip
                  label={
                     'Role-Based Access defines the permissions and access levels assigned to employee within the organization.'
                  }
                  position={'right'}
                  arrowSize={8}
                  withArrow
                  className={'max-w-[25rem]'}
                  multiline
               >
                  <Button variant={'transparent'} p={0} color={colours.grey}>
                     <MdInfoOutline className={'cursor-pointer'} />
                  </Button>
               </Tooltip>{' '}
            </p>

            <SearchableDropDown
               data={onboardEmployeeFormDropdowns.role}
               onChange={(value: string[]) => employeeForm.setFieldValue('role', value)}
               error={!!employeeForm.errors['role']}
               defaultSelectedValues={
                  employeeForm.values['role']?.length ? employeeForm.values['role'] : []
               }
               placeholder={'Select'}
               multiSelect
            />
            {employeeForm.errors['role'] && (
               <p className={'text-sm text-error'}>{employeeForm.errors['role']}</p>
            )}
         </Flex>
         <Flex direction={'column'}>
            <FormLabel
               label={'Reports to'}
               optional
               info={
                  "'Reports to' specifies the supervisor or manager to whom an employee directly reports."
               }
            />
            <SearchableDropDown
               data={onboardEmployeeFormDropdowns.reportsTo}
               onChange={(value: string[]) => employeeForm.setFieldValue('reportsTo', value)}
               error={!!employeeForm.errors['reportsTo']}
               defaultSelectedValues={
                  employeeForm.values['reportsTo']?.length ? employeeForm.values['reportsTo'] : []
               }
               placeholder={'Select'}
               multiSelect
            />
            {employeeForm.errors['reportsTo'] && (
               <p className={'text-sm text-error'}>{employeeForm.errors['reportsTo']}</p>
            )}
         </Flex>
         <Select
            size={'md'}
            label={<FormLabel label={'Department'} optional />}
            placeholder={'Select'}
            data={[]}
         />
         <Select
            size={'md'}
            label={<FormLabel label={'Sub-Department'} optional />}
            placeholder={'Select'}
            data={[]}
         />
         <DatePickerInput
            label={<FormLabel label={'Date of Joining'} optional />}
            placeholder={'MM/DD/YYY'}
            size={'md'}
            rightSection={
               <MdOutlineDateRange
                  size={20}
                  className={'cursor-pointer'}
                  onClick={() => datePickerRef?.current?.click()}
               />
            }
            ref={datePickerRef}
            {...employeeForm.getInputProps('dateOfJoining')}
         />
         <TextInput
            label={<FormLabel label={'Address'} optional />}
            placeholder={'4032 Big Elm'}
            size={'md'}
            {...employeeForm.getInputProps('address')}
         />
      </>
   );
};

export default EmployeeFormOptionalInfo;
