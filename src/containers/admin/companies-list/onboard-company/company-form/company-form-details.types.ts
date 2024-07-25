import { ChangeEvent } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AddressInformationProps {
   companyForm: any;
   handleCharPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
   handleDigitPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
   handleFieldChange: (field: string, value: string | File | null, required?: boolean) => void;
}

export interface CompanyInformationProps {
   companyForm: any;
   handleFieldChange: (field: string, value: string | File | null, required?: boolean) => void;
}

export interface ContactInformationProps {
   companyForm: any;
   handlePhoneNumberChange: (value: string, country: { dialCode: string }) => void;
   handleFieldChange: (field: string, value: string | File | null, required?: boolean) => void;
}

export interface LogoUploadProps {
   logo: string | File | null;
   onLogoUpload: (event: ChangeEvent<HTMLInputElement>) => void;
   onLogoDelete: () => void;
}

export type ProgressBarProps = {
   currentForm: number;
   companyFormProgress: number;
   userFormProgress: number;
};

export type HeaderComponentProps = {
   isEdit?: boolean;
};

export type OnboardActionButtonsProps = {
   isEdit?: boolean;
   closeDrawer: () => void;
};
