import React, { FC, useContext } from 'react';
import { Box, Button, Flex, TextInput } from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import colours from '@/src/constants/palette';
import {
   formsCountryCode,
   OnboardCompanyFormProps,
   OnboardCompanyForms,
   OnboardCompanyRequiredFields,
   onboardFromData,
   userFormFields
} from '@/src/utils/onboard-company-form.utils';
import { Optional } from '@/src/components';
import { OnboardCompanyContext } from '@/src/context/onboard-company.context';

let prevValidFields: number = 0;

const UserForm: FC<OnboardCompanyFormProps> = ({
   setForm,
   setProgress,
   handleFormClose,
   withControls = true
}) => {
   const { getUserForm, handleFormSubmit } = useContext(OnboardCompanyContext);
   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const userForm: any = getUserForm?.();

   const handleBackClick = () => {
      setForm?.(OnboardCompanyForms.COMPANY_FORM);
   };

   const handlePhoneNumberChange = async (value: string, country: { dialCode: string }) => {
      if (!value || !country?.dialCode) {
         return;
      }
      formsCountryCode.userDialCode = country.dialCode;
      handleFieldChange('phone', value);
   };

   const handleFieldChange = async (field: string, value: string, required: boolean = true) => {
      if (!onboardFromData.user) {
         onboardFromData.user = {};
      }

      userForm.setFieldValue(field, value);
      onboardFromData.user[field] = value;

      if (!required) {
         return;
      }

      let validFields = 0;

      Object.keys(onboardFromData.user).forEach((key) => {
         if (userFormFields.validate[key] && onboardFromData.user[key]) {
            validFields++;
         }
      });

      if (prevValidFields !== validFields) {
         prevValidFields = validFields;
         setProgress?.(
            Math.round((100 * validFields) / OnboardCompanyRequiredFields.USER_FORM_FIELDS_COUNT)
         );
      }
   };

   return (
      <form className={'flex flex-col gap-y-3'} onSubmit={handleFormSubmit}>
         <TextInput
            label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>First Name</p>}
            placeholder={'Eg. Joseph'}
            size={'md'}
            {...userForm.getInputProps('firstName')}
            onChange={async (event) => handleFieldChange('firstName', event.target.value)}
         />
         <TextInput
            label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>Last Name</p>}
            placeholder={'Eg. Harris'}
            size={'md'}
            {...userForm.getInputProps('lastName')}
            onChange={async (event) => handleFieldChange('lastName', event.target.value)}
         />
         <TextInput
            label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>Email</p>}
            placeholder={'david@company.com'}
            size={'md'}
            {...userForm.getInputProps('email')}
            onChange={async (event) => handleFieldChange('email', event.target.value)}
         />
         <Box>
            <p className={'text-sm font-medium mb-1 text-black-x-light'}>
               Phone <Optional />
            </p>
            <PhoneInput
               onChange={handlePhoneNumberChange}
               inputStyle={{ width: '100%', height: '2.7rem', borderRadius: '0.25rem' }}
               value={userForm.values['phone']}
               country={'us'}
            />
            {userForm.errors.phone && (
               <div className={'mt-1 text-error'}>
                  <label>{userForm.errors.phone}</label>
               </div>
            )}
         </Box>
         {withControls && (
            <Flex justify={'space-between'} mt={32} className={'w-full'}>
               <Button
                  variant={'light'}
                  bg={colours.grey4XLight}
                  color={colours.grey}
                  size={'md'}
                  onClick={handleFormClose}
               >
                  Cancel
               </Button>
               <Box>
                  <Button
                     variant={'transparent'}
                     color={colours.grey}
                     className={'mr-5'}
                     onClick={handleBackClick}
                  >
                     Back
                  </Button>
                  <Button color={colours.shadeBlue} size={'md'} type={'submit'}>
                     Add
                  </Button>
               </Box>
            </Flex>
         )}
      </form>
   );
};

export default UserForm;
