import React, { FC } from 'react';
import { TextInput, Radio, Group, Box } from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import { FileUpload } from '@/src/components';
import { EmployeeFormBasicInfoProps } from './employee-form.types';
import FormLabel from '@/src/components/forms/FormLabel';

const EmployeeFormBasicInfo: FC<EmployeeFormBasicInfoProps> = ({
   employeeForm,
   handleLogoUpload,
   handleLogoDelete,
   handlePhoneNumberChange,
   hasTopLevelEmployee
}) => (
   <>
      <FileUpload
         imageSrc={employeeForm.values['profilePhoto']}
         label={<FormLabel label={'Profile Photo '} optional />}
         onLogoDelete={handleLogoDelete}
         onLogoUpload={handleLogoUpload}
      />
      <TextInput
         label={
            <FormLabel
               label={'Company EMP ID '}
               optional
               info={
                  'Employee ID is a unique identifier assigned to each employee within the company.'
               }
            />
         }
         placeholder={'TG-123'}
         size={'md'}
         {...employeeForm.getInputProps('empId')}
      />
      <TextInput
         label={<FormLabel label={'First Name'} />}
         placeholder={'Steve'}
         size={'md'}
         {...employeeForm.getInputProps('firstName')}
      />
      <TextInput
         label={<FormLabel label={'Last Name'} />}
         placeholder={'Rogers'}
         size={'md'}
         {...employeeForm.getInputProps('lastName')}
      />
      <TextInput
         label={<FormLabel label={'Email'} />}
         placeholder={'steve.rogers@company.com'}
         size={'md'}
         {...employeeForm.getInputProps('email')}
      />
      <Radio.Group
         label={<FormLabel label={'Gender'} optional />}
         className={'mb-2'}
         {...employeeForm.getInputProps('gender')}
      >
         <Group mt={'xs'}>
            <Radio variant={'outline'} checked label={'Male'} value={'male'} />
            <Radio variant={'outline'} label={'Female'} value={'female'} />
         </Group>
      </Radio.Group>
      {!hasTopLevelEmployee && (
         <Radio.Group
            label={<FormLabel label={'  Is Top Level Employee ?'} optional />}
            className={'mb-2'}
            {...employeeForm.getInputProps('isTopLevelEmployee')}
         >
            <Group mt={'xs'}>
               <Radio variant={'outline'} checked label={'Yes'} value={'yes'} />
               <Radio variant={'outline'} label={'No'} value={'no'} />
            </Group>
         </Radio.Group>
      )}
      <Box>
         <FormLabel label={'Phone'} optional />
         <PhoneInput
            inputStyle={{ width: '100%', height: '2.7rem', borderRadius: '0.25rem' }}
            onChange={handlePhoneNumberChange}
            value={employeeForm.values['phone']}
            country={'us'}
         />
         {employeeForm.errors.phone && (
            <div className={'mt-1 text-error'}>
               <label>{employeeForm.errors.phone}</label>
            </div>
         )}
      </Box>
   </>
);

export default EmployeeFormBasicInfo;
