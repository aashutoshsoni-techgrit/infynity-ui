/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { ValidatePhoneNumber } from './form-utils';
import { Required } from '@/src/utils/onboard-employee-form.utils';

export interface OnboardCompanyFormProps {
   setForm?: Dispatch<SetStateAction<number>>;
   setProgress?: Dispatch<SetStateAction<number>>;
   handleFormClose?: () => void;
   withControls?: boolean;
}

export interface AllDoneProps {
   closeDrawer: (reFetch?: { fetch: boolean }) => void;
}

export enum OnboardCompanyForms {
   COMPANY_FORM,
   USER_FORM,
   ALL_DONE
}

export const formsCountryCode = {
   companyDialCode: '',
   userDialCode: ''
};

export const onboardFromData: any = {
   companyId: '',
   company: null,
   user: null,
   companyName: ''
};

export enum EmployeeProfileActionItems {
   ACTION_ITEMS,
   ISSUES
}

export const onboardFormFields: any = {
   initialValues: {
      file: null,
      companyName: '',
      industry: '',
      companyPhone: '',
      companyEmail: '',
      website: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
   },
   validate: {
      companyName: Required,
      companyPhone: (value: string) => {
         if (value && formsCountryCode.companyDialCode) {
            const numberWithOutCode = value.substring(formsCountryCode.companyDialCode.length);
            if (numberWithOutCode) {
               return ValidatePhoneNumber(value);
            }
         }
      },
      companyEmail: (value: string) => {
         if (!value) {
            return 'Required';
         }
         if (!/^\S+@\S+$/.test(value)) {
            return 'Invalid email';
         }
      },
      website: (value: string) => {
         if (!value) {
            return 'Required';
         }

         const websiteRegex = /^(https?:\/\/)?([\w-]+\.)*([\w-]+\.)([a-zA-Z]{2,})(\/\S*)?$/;

         if (!websiteRegex.test(value)) {
            return 'Invalid URL';
         }
      },
      address: Required,
      city: Required,
      state: Required,
      country: Required,
      zipCode: Required
   }
};

export const companyFormData = { isEmailRegistered: false };

export enum OnboardCompanyRequiredFields {
   COMPANY_FORM_FIELDS_COUNT = 8,
   USER_FORM_FIELDS_COUNT = 3
}

export const userFormFields: any = {
   initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
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
         if (value && formsCountryCode.userDialCode) {
            const numberWithOutCode = value.substring(formsCountryCode.userDialCode.length);
            if (numberWithOutCode) {
               return ValidatePhoneNumber(value);
            }
         }
      }
   }
};

export enum CompaniesView {
   CARD_VIEW,
   LIST_VIEW
}

export enum CompanyEditFormView {
   DETAILS_VIEW = 1,
   EDIT_VIEW = 2
}
