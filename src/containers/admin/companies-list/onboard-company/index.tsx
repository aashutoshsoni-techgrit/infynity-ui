/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Drawer, Flex } from '@mantine/core';
import colours from '@/src/constants/palette';
import { MdAdd } from 'react-icons/md';
import {
   companyFormData,
   formsCountryCode,
   OnboardCompanyForms,
   onboardFormFields,
   onboardFromData,
   userFormFields
} from '@/src/utils/onboard-company-form.utils';
import CompanyProgressBar from './company-form/CompanyProgressBar';
import CompanyForm from './CompanyForm';
import UserForm from './UserForm';
import AllDone from './AllDone';
import 'react-phone-input-2/lib/style.css';
import { CompaniesViewContext } from '@/src/context/companies-view.context';
import httpService from '@/src/services/http.service';
import {
   IS_COMPANY_ALREADY_REGISTERED_EMAIL,
   IS_USER_ALREADY_REGISTERED_EMAIL
} from '@/src/constants/server-errors';
import toastService from '@/src/services/toast.service';
import { useForm, UseFormReturnType } from '@mantine/form';
import { OnboardCompanyContext } from '@/src/context/onboard-company.context';
import CompanyHeader from './company-form/CompanyHeader';

const OnboardCompany: React.FC<{ isEdit?: boolean }> = ({ isEdit }) => {
   const [opened, { open, close }] = useDisclosure(false);
   const [currentForm, setForm] = useState<number>(OnboardCompanyForms.COMPANY_FORM);
   const [companyFormProgress, setCompanyFormProgress] = useState<number>(
      OnboardCompanyForms.COMPANY_FORM
   );
   const [userFormProgress, setUserFormProgress] = useState<number>(0);
   const { setCompaniesFetch } = useContext(CompaniesViewContext);
   const companyForm: UseFormReturnType<any> = useForm(onboardFormFields);
   const userForm: UseFormReturnType<any> = useForm(userFormFields);

   const getCompanyForm = () => companyForm;
   const getUserForm = () => userForm;

   const handleCompanyFormSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (companyForm.validate().hasErrors) {
         return;
      }
      setForm(OnboardCompanyForms.USER_FORM);
   };

   const handleFormSubmit = async (event?: { preventDefault: () => void }) => {
      event?.preventDefault();

      if (companyForm.validate().hasErrors || userForm.validate().hasErrors) {
         return;
      }

      const formData = new FormData();
      companyFormData.isEmailRegistered = false;
      Object.keys(onboardFromData.company ?? {}).forEach((field) => {
         if (field === 'file' && typeof onboardFromData.company[field] === 'string') {
            return;
         }
         if (field === 'companyPhone') {
            if (!formsCountryCode.companyDialCode) {
               return;
            }
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
            if (!formsCountryCode.userDialCode) {
               return;
            }
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
         await httpService.post(`/company`, formData, {
            'Content-Type': 'multipart/form-data'
         });
         toastService.showToast({
            color: colours.success,
            title: `${companyForm.values['companyName']} company has been added`
         });
         handleFormClose({ fetch: true });
      } catch (error: any) {
         if (error?.response?.data?.error === IS_COMPANY_ALREADY_REGISTERED_EMAIL) {
            companyFormData.isEmailRegistered =
               error?.response?.data?.error === IS_COMPANY_ALREADY_REGISTERED_EMAIL;
            setForm(OnboardCompanyForms.COMPANY_FORM);
         }
         if (error?.response?.data?.error === IS_USER_ALREADY_REGISTERED_EMAIL) {
            userForm.setFieldError('email', IS_USER_ALREADY_REGISTERED_EMAIL);
         }
         toastService.showToast({
            color: colours.error,
            title: error?.response?.data?.error
         });
         return;
      }

      setForm?.(OnboardCompanyForms.ALL_DONE);
      setCompanyFormProgress(0);
      setUserFormProgress(0);
   };

   const handleFormClose = (reFetch: { fetch: boolean } = { fetch: false }) => {
      onboardFromData.company = null;
      onboardFromData.user = null;
      setForm?.(OnboardCompanyForms.COMPANY_FORM);
      close();
      setCompaniesFetch?.(reFetch);
      setCompanyFormProgress(0);
      setUserFormProgress(0);
   };

   useEffect(() => {
      if (opened) {
         Object.keys(companyForm.errors).length && companyForm.clearErrors();
         Object.keys(userForm.errors).length && userForm.clearErrors();
      }
   }, [opened]);

   return (
      <>
         <Drawer
            opened={opened}
            onClose={handleFormClose}
            position={'right'}
            size={'lg'}
            closeOnEscape={false}
            closeOnClickOutside={false}
            padding={20}
         >
            {currentForm === OnboardCompanyForms.ALL_DONE ? (
               <AllDone closeDrawer={handleFormClose} />
            ) : (
               <>
                  <CompanyHeader isEdit={isEdit} />
                  <Flex direction={'column'} rowGap={28} px={36} pb={42}>
                     <CompanyProgressBar
                        currentForm={currentForm}
                        companyFormProgress={companyFormProgress}
                        userFormProgress={userFormProgress}
                     />
                     <OnboardCompanyContext.Provider
                        value={{
                           getCompanyForm,
                           getUserForm,
                           handleFormSubmit,
                           handleCompanyFormSubmit
                        }}
                     >
                        {(isEdit || currentForm === OnboardCompanyForms.COMPANY_FORM) && (
                           <CompanyForm
                              setForm={setForm}
                              setProgress={setCompanyFormProgress}
                              handleFormClose={handleFormClose}
                              withControls={!isEdit}
                           />
                        )}
                        {(isEdit || currentForm === OnboardCompanyForms.USER_FORM) && (
                           <UserForm
                              setForm={setForm}
                              setProgress={setUserFormProgress}
                              handleFormClose={handleFormClose}
                              withControls={!isEdit}
                           />
                        )}
                     </OnboardCompanyContext.Provider>
                  </Flex>
               </>
            )}
         </Drawer>
         <Button
            size={'md'}
            color={colours.shadeBlue}
            leftSection={<MdAdd size={24} />}
            onClick={open}
         >
            Add Company
         </Button>
      </>
   );
};

export default OnboardCompany;
