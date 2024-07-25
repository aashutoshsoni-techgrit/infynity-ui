import React, { FC } from 'react';
import { TextInput, Flex } from '@mantine/core';
import { EmployeeFormAddressProps } from './employee-form.types';
import FormLabel from '@/src/components/forms/FormLabel';

const EmployeeFormAddress: FC<EmployeeFormAddressProps> = ({ employeeForm }) => (
   <>
      <Flex justify={'space-between'}>
         <TextInput
            label={<FormLabel label={'City'} optional />}
            placeholder={'San Francisco'}
            size={'md'}
            className={'w-[48%]'}
            {...employeeForm.getInputProps('city')}
         />
         <TextInput
            label={<FormLabel label={'State'} optional />}
            placeholder={'CA'}
            size={'md'}
            className={'w-[48%]'}
            {...employeeForm.getInputProps('state')}
         />
      </Flex>
      <Flex justify={'space-between'}>
         <TextInput
            label={<FormLabel label={'Country'} optional />}
            placeholder={'United States'}
            size={'md'}
            className={'w-[48%]'}
            {...employeeForm.getInputProps('country')}
         />
         <TextInput
            label={<FormLabel label={'Zip code'} optional />}
            placeholder={'94103'}
            size={'md'}
            className={'w-[48%]'}
            {...employeeForm.getInputProps('zipCode')}
         />
      </Flex>
   </>
);

export default EmployeeFormAddress;
