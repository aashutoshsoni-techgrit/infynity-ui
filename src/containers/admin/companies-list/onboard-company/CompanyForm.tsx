/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ChangeEvent, useEffect, useContext } from 'react';
import { Button, Flex } from '@mantine/core';
import colours from '@/src/constants/palette';
import {
   formsCountryCode,
   OnboardCompanyFormProps,
   onboardFromData,
   companyFormData,
   onboardFormFields,
   OnboardCompanyRequiredFields
} from '@/src/utils/onboard-company-form.utils';
import { IS_COMPANY_ALREADY_REGISTERED_EMAIL } from '@/src/constants/server-errors';
import { OnboardCompanyContext } from '@/src/context/onboard-company.context';
import LogoUpload from './company-form/LogoUpload';
import CompanyInformation from './company-form/CompanyInformation';
import ContactInformation from './company-form/ContactInformation';
import AddressInformation from './company-form/AddressInformation';

let prevValidFields: number = 0;

const CompanyForm: FC<OnboardCompanyFormProps> = ({
   setProgress,
   handleFormClose,
   withControls = true
}) => {
   const { getCompanyForm, handleCompanyFormSubmit } = useContext(OnboardCompanyContext);
   const companyForm: any = getCompanyForm?.();

   const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const files: FileList | null = event.target.files;
      files && files.length > 0 && handleFieldChange('file', files[0], false);
      event.target && (event.target.value = '');
   };

   const handleLogoDelete = () => {
      companyForm.values['file'] && handleFieldChange('file', null, false);
   };

   const handlePhoneNumberChange = async (value: string, country: { dialCode: string }) => {
      if (!value || !country.dialCode) {
         return;
      }

      formsCountryCode.companyDialCode = country.dialCode;
      handleFieldChange('companyPhone', value, false);
   };

   const handleCharPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (/\d/.test(event.key)) {
         event.preventDefault();
      }
   };

   const handleDigitPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;

      if (
         !/\d/.test(event.key) &&
         key !== 'Backspace' &&
         key !== 'ArrowLeft' &&
         key !== 'ArrowRight' &&
         !(event.ctrlKey && key === 'a')
      ) {
         event.preventDefault();
      }
   };

   useEffect(() => {
      setTimeout(() => {
         if (companyFormData.isEmailRegistered) {
            companyForm.setFieldError('companyEmail', IS_COMPANY_ALREADY_REGISTERED_EMAIL);
         }
      }, 400);
   }, []);

   const handleFieldChange = async (
      field: string,
      value: string | File | null,
      required: boolean = true
   ) => {
      if (!onboardFromData.company) {
         onboardFromData.company = {};
      }

      companyForm.setFieldValue(field, value);
      onboardFromData.company[field] = value;

      if (field === 'companyName') {
         onboardFromData.companyName = value;
      }
      if (!required) {
         return;
      }

      let validFields = 0;

      Object.keys(onboardFromData.company).forEach((key) => {
         if (onboardFormFields.validate[key] && onboardFromData.company[key]) {
            validFields++;
         }
      });

      if (validFields !== prevValidFields) {
         prevValidFields = validFields;
         setProgress?.(
            Math.round((100 * validFields) / OnboardCompanyRequiredFields.COMPANY_FORM_FIELDS_COUNT)
         );
      }
   };

   return (
      <form className={'flex flex-col gap-y-3'} onSubmit={handleCompanyFormSubmit}>
         <LogoUpload
            logo={companyForm.values['file']}
            onLogoUpload={handleLogoUpload}
            onLogoDelete={handleLogoDelete}
         />
         <CompanyInformation companyForm={companyForm} handleFieldChange={handleFieldChange} />
         <ContactInformation
            companyForm={companyForm}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleFieldChange={handleFieldChange}
         />
         <AddressInformation
            companyForm={companyForm}
            handleCharPress={handleCharPress}
            handleDigitPress={handleDigitPress}
            handleFieldChange={handleFieldChange}
         />
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
               <Button color={colours.shadeBlue} size={'md'} type={'submit'}>
                  Next
               </Button>
            </Flex>
         )}
      </form>
   );
};

export default CompanyForm;
