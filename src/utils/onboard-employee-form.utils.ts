import { ValidatePhoneNumber } from './form-utils';
import { ReactNode } from 'react';
import { FloatingPosition } from '@mantine/core';
import { SearchableDropDownItemDataType } from '@/src/components/components.types';

export interface OnboardEmployeeProps {
   targetIcon: ReactNode;
   targetText: string;
   menuPosition: FloatingPosition;
}

export interface EmployeeEditProps {
   profilePhoto: string;
   employeeName: string;
}

export interface EmployeeFormProps {
   edit?: boolean;
   employeeId?: string;
   userId?: string;
   closeDrawer: (reFetch?: { fetch: boolean }) => void;
}

export const onboardEmployeeFormDropdowns: {
   role: SearchableDropDownItemDataType[];
   reportsTo: SearchableDropDownItemDataType[];
} = {
   reportsTo: [],
   role: []
};

export const employeeCountryCode = {
   code: ''
};

export const employeeFormsCountryCode = {
   companyDialCode: ''
};

export const Required = (value: string | File | null) => {
   if (!value) {
      return 'Required';
   }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const onboardEmployeeFormData: any = {
   data: null
};

export const onboardEmployeeFormFields = {
   initialValues: {
      empId: '',
      profilePhoto: null,
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      phone: '',
      title: '',
      reportsTo: '',
      role: '',
      department: '',
      subDepartment: '',
      dateOfJoining: null,
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
   },
   validate: {
      firstName: Required,
      lastName: Required,
      email: (value: string) => {
         if (!value) {
            return 'Required';
         }
         if (!/^\S+@\S+$/.test(value)) {
            return 'Invalid email';
         }
      },
      phone: (value: string) => {
         if (value && employeeFormsCountryCode.companyDialCode) {
            const lengthOfDailCode = employeeFormsCountryCode.companyDialCode.length;
            const numberWithOutCode = value.substring(lengthOfDailCode);
            if (numberWithOutCode) {
               return ValidatePhoneNumber(value);
            }
         }
      }
   }
};

export enum OnboardEmployeeFormType {
   SINGLE_UPLOAD,
   BULK_UPLOAD
}
