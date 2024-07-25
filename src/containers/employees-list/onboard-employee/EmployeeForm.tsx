/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FC, useEffect } from 'react';
import { Flex } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
   employeeCountryCode,
   EmployeeFormProps,
   employeeFormsCountryCode,
   onboardEmployeeFormData,
   onboardEmployeeFormFields
} from '@/src/utils/onboard-employee-form.utils';
import toastService from '@/src/services/toast.service';
import httpService from '@/src/services/http.service';
import '@mantine/dates/styles.css';
import { IS_USER_ALREADY_REGISTERED_EMAIL } from '@/src/constants/server-errors';
import { capitalizeFirstLetter } from '@/src/utils/string-format-utils';
import EmployeeFormHeader from './employee-form/EmployeeFormHeader';
import EmployeeFormBasicInfo from './employee-form/EmployeeBasicInfo';
import EmployeeFormOptionalInfo from './employee-form/EmployeeFormOptionalInfo';
import EmployeeFormAddress from './employee-form/EmployeeFormAddress';
import EmployeeFormActions from './employee-form/EmployeeFormActions';
import colours from '@/src/constants/palette';
import { useQuery } from '@tanstack/react-query';
import { getTopLevelEmployeeOfCompany } from '@/src/services/bulk-employee-onboard.service';
import { orgChartNodesData } from '@/src/utils/organization-chart.utils';

const EmployeeForm: FC<EmployeeFormProps> = ({ edit, employeeId, userId, closeDrawer }) => {
   const employeeForm: UseFormReturnType<any> = useForm(onboardEmployeeFormFields);

   useEffect(() => {
      if (onboardEmployeeFormData.data && edit) {
         employeeForm.setValues(onboardEmployeeFormData.data);
         employeeForm.setFieldValue('phone', onboardEmployeeFormData.data['phone']);
      }
   }, []);

   const { data: hasTopLevelEmployee } = useQuery({
      queryFn: async () => await getTopLevelEmployeeOfCompany(),
      queryKey: ['has-top-level-employee']
   });

   const handleEmployeeFormSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      if (employeeForm.validate().hasErrors) {
         return;
      }
      const formData = new FormData();

      Object.keys(employeeForm.values).forEach((field) => {
         let value = employeeForm.values[field];
         if (!value || (field === 'profilePhoto' && typeof value === 'string')) {
            return;
         }
         if (field === 'phone') {
            if (employeeFormsCountryCode.companyDialCode) {
               const employeeDialCodeLength = employeeFormsCountryCode.companyDialCode.length;
               const employeePhoneNumber = value?.substring(employeeDialCodeLength);
               formData.append(field, employeePhoneNumber ?? '');
               formData.append(
                  'countryCode',
                  employeePhoneNumber ? `+${employeeFormsCountryCode.companyDialCode}` : ''
               );
            }
            return;
         } else if (field === 'firstName' || field === 'lastName') {
            value = capitalizeFirstLetter(value);
         } else if (field === 'isTopLevelEmployee') {
            value = value === 'yes';
         } else if (field === 'reportsTo') {
            field = 'reportsToIds';
            value = JSON.stringify(value);
         } else if (field === 'role') {
            field = 'roleIds';
            value = JSON.stringify(value);
         }
         formData.append(field, value);
      });

      if (orgChartNodesData.parentOrgChartId) {
         formData.append('orgChartId', orgChartNodesData.parentOrgChartId);
         orgChartNodesData.parentOrgChartId = '';
      }

      try {
         if (edit) {
            await httpService.put(`/employee/${employeeId}/${userId}`, formData, {
               'Content-Type': 'multipart/form-data'
            });
            onboardEmployeeFormData.data = null;
            toastService.showToast({ color: colours.success, title: 'Employee has been updated' });
            closeDrawer({ fetch: true });
         } else {
            await httpService.post(`/employee`, formData, {
               'Content-Type': 'multipart/form-data'
            });
            onboardEmployeeFormData.data = null;
            toastService.showToast({
               color: colours.success,
               title: 'Success',
               subtitle: `${employeeForm.values['firstName']} ${employeeForm.values['lastName']} added to the company`
            });
            closeDrawer({ fetch: true });
         }
      } catch (error: any) {
         if (error?.response?.data?.error === IS_USER_ALREADY_REGISTERED_EMAIL) {
            employeeForm.setFieldError('email', IS_USER_ALREADY_REGISTERED_EMAIL);
         }
         toastService.showToast({
            color: colours.error,
            title: error?.response?.data?.error
         });
      }
   };

   const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const files: FileList | null = event.target.files;

      files && files.length > 0 && employeeForm.setFieldValue('profilePhoto', files[0]);
      event.target && (event.target.value = '');
   };

   const handleLogoDelete = () => {
      employeeForm.values['profilePhoto'] && employeeForm.setFieldValue('profilePhoto', null);
   };

   const handlePhoneNumberChange = async (
      value: string,
      country: { countryCode: string; dialCode: string }
   ) => {
      if (!value || !country?.countryCode) {
         return;
      }

      employeeFormsCountryCode.companyDialCode = `${country.dialCode}`;
      employeeCountryCode.code = country.countryCode.toUpperCase();
      employeeForm.setFieldValue('phone', value);
   };

   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={42}>
         <EmployeeFormHeader edit={edit} />
         <form className={'flex flex-col gap-y-3'} onSubmit={handleEmployeeFormSubmit}>
            <EmployeeFormBasicInfo
               employeeForm={employeeForm}
               handleLogoUpload={handleLogoUpload}
               handleLogoDelete={handleLogoDelete}
               handlePhoneNumberChange={handlePhoneNumberChange}
               hasTopLevelEmployee={hasTopLevelEmployee?.isTopLevelEmployee}
            />
            <EmployeeFormOptionalInfo employeeForm={employeeForm} />
            <EmployeeFormAddress employeeForm={employeeForm} />
            <EmployeeFormActions edit={edit} closeDrawer={closeDrawer} />
         </form>
      </Flex>
   );
};

export default EmployeeForm;
