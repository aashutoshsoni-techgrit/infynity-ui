/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturnType } from '@mantine/form';
import { ChangeEvent } from 'react';

export interface EmployeeFormAddressProps {
   employeeForm: UseFormReturnType<any>;
}

export interface EmployeeFormHeaderProps {
   edit?: boolean;
}

export interface EmployeeFormActionsProps {
   edit?: boolean;
   closeDrawer?: (params?: { fetch: boolean }) => void;
}

export interface EmployeeFormBasicInfoProps {
   employeeForm: UseFormReturnType<any>;
   handleLogoUpload: (event: ChangeEvent<HTMLInputElement>) => void;
   handleLogoDelete: () => void;
   handlePhoneNumberChange: (
      value: string,
      country: { countryCode: string; dialCode: string }
   ) => void;
   hasTopLevelEmployee: boolean;
}

export interface EmployeeFormOptionalInfoProps {
   employeeForm: UseFormReturnType<any>;
}
