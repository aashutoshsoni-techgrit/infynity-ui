/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect } from 'react';
import { Button, Flex } from '@mantine/core';
import CompanyForm from '@/src/containers/admin/companies-list/onboard-company/CompanyForm';
import UserForm from '@/src/containers/admin/companies-list/onboard-company/UserForm';
import colours from '@/src/constants/palette';
import {
   companyFormData,
   formsCountryCode,
   onboardFormFields,
   onboardFromData,
   userFormFields
} from '@/src/utils/onboard-company-form.utils';
import { CompaniesViewContext, CompanyEditContext } from '@/src/context/companies-view.context';
import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import { useForm, UseFormReturnType } from '@mantine/form';
import { OnboardCompanyContext } from '@/src/context/onboard-company.context';
import { AuthContext } from '@/src/context/AuthWrapper';
import { UserTypes } from '@/src/constants';
import 'react-phone-input-2/lib/style.css';

const EditCompany = () => {
   const companyForm: UseFormReturnType<any> = useForm(onboardFormFields);
   const userForm: UseFormReturnType<any> = useForm(userFormFields);
   const { getEditCompany, handleFormClose } = useContext(CompanyEditContext);
   const { setCompaniesFetch } = useContext(CompaniesViewContext);
   const { getSignedInUser } = useContext(AuthContext);
   const signedInUser = getSignedInUser?.();
   const isInfinityAdmin: boolean =
      signedInUser?.user?.userType.userType === UserTypes.INFYNITY_ADMIN;

   const getCompanyForm = () => companyForm;

   const getUserForm = () => userForm;

   useEffect(() => {
      const company: any = getEditCompany?.();

      if (company) {
         onboardFromData.companyId = company.id;
         formsCountryCode.companyDialCode = company.countryCode?.replaceAll('+', '') ?? '';
         formsCountryCode.userDialCode = company.rootUser.countryCode?.replaceAll('+', '') ?? '';

         companyForm.setFieldValue('companyName', company.companyName);
         companyForm.setFieldValue(
            'companyPhone',
            `${company.countryCode ?? ''}${company.companyPhone ?? ''}`
         );
         companyForm.setFieldValue('companyEmail', company.companyEmail);
         companyForm.setFieldValue('address', company.address);
         companyForm.setFieldValue('city', company.city);
         companyForm.setFieldValue('state', company.state);
         companyForm.setFieldValue('zipCode', company.zipCode);
         companyForm.setFieldValue('website', company.website);
         companyForm.setFieldValue('file', company.logo);
         companyForm.setFieldValue('industry', company.industry);
         companyForm.setFieldValue('country', company.country);

         userForm.setFieldValue('firstName', company.rootUser.firstName);
         userForm.setFieldValue('lastName', company.rootUser.lastName);
         userForm.setFieldValue(
            'phone',
            `${company.rootUser.countryCode ?? ''}${company.rootUser.phone ?? ''}`
         );
         userForm.setFieldValue('email', company.rootUser.email);
      }
   }, [getEditCompany]);

   const handleCompanyFormSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      companyForm.validate();
   };

   const handleFormSubmit = async (event?: { preventDefault: () => void }) => {
      event?.preventDefault();

      const companyFormErrors: boolean = companyForm.validate().hasErrors;
      const userFormErrors: boolean = isInfinityAdmin && userForm.validate().hasErrors;

      if (companyFormErrors || (isInfinityAdmin && userFormErrors)) {
         return;
      }

      const formData = new FormData();

      companyFormData.isEmailRegistered = false;
      Object.keys(onboardFromData.company ?? {}).forEach((field) => {
         if (field === 'file' && typeof onboardFromData.company[field] === 'string') {
            return;
         }
         if (field === 'companyPhone') {
            const companyPhoneNumber = onboardFromData.company[field].substring(
               formsCountryCode.companyDialCode.length
            );
            formData.append(field, companyPhoneNumber ?? '');
            formData.append(
               'countryCode',
               companyPhoneNumber ? `+${formsCountryCode.companyDialCode}` : ''
            );
            return;
         }
         formData.append(field === 'file' ? 'logo' : field, onboardFromData.company?.[field]);
      });
      Object.keys(userForm.values ?? {}).forEach((field) => {
         if (field === 'phone') {
            const userFormPhoneNumber = userForm.values?.[field]?.substring(
               formsCountryCode.userDialCode.length
            );
            formData.append(field, userFormPhoneNumber ?? '');
            formData.append(
               'userCountryCode',
               userFormPhoneNumber ? `+${formsCountryCode.userDialCode}` : ''
            );
            return;
         }
         formData.append(field, userForm.values?.[field]);
      });

      try {
         await httpService.put(`/company/${onboardFromData.companyId}`, formData, {
            'Content-Type': 'multipart/form-data'
         });
         toastService.showToast({
            color: colours.success,
            title: `${companyForm.values['companyName']} company has been updated`
         });
         setCompaniesFetch?.({ fetch: true });
         handleFormClose?.();
      } catch (error: any) {
         toastService.showToast({
            color: colours.error,
            title: error?.response?.data?.error
         });
      }
   };

   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={32}>
         <h5 className={'text-h5 font-semibold text-midnight-blue'}>Edit Company</h5>
         <OnboardCompanyContext.Provider
            value={{ getCompanyForm, getUserForm, handleFormSubmit, handleCompanyFormSubmit }}
         >
            {isInfinityAdmin && (
               <h6 className={'text-h6 font-semibold text-midnight-blue'}>Company Details</h6>
            )}
            <CompanyForm withControls={false} />
            {isInfinityAdmin && (
               <>
                  <h6 className={'text-h6 font-semibold text-midnight-blue'}>User Details</h6>
                  <UserForm withControls={false} />
               </>
            )}
         </OnboardCompanyContext.Provider>
         <Flex justify={'space-between'} mt={32} className={'w-full'}>
            <Button
               variant={'light'}
               bg={colours.grey4XLight}
               color={colours.grey}
               onClick={handleFormClose}
               size={'md'}
            >
               Cancel
            </Button>
            <Button color={colours.shadeBlue} size={'md'} onClick={handleFormSubmit}>
               Update
            </Button>
         </Flex>
      </Flex>
   );
};

export default EditCompany;
