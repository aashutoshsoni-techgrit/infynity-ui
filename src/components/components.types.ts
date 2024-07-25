import { CSSProperties, ReactNode } from 'react';

export interface SearchableDropDownItemDataType {
   label?: ReactNode | string;
   item?: ReactNode;
   value?: string;
   searchPatterns: string[];
}

export interface SearchableDropDownItemType {
   children: ReactNode;
}

export interface SearchableDropDownLabelType extends SearchableDropDownItemType {}

export interface SearchableDropDownProps {
   data: SearchableDropDownItemDataType[];
   onChange?: (value: string[]) => void;
   multiSelect?: boolean;
   placeholder?: string;
   maxSelectCount?: number;
   dropDownFooter?: ReactNode;
   style?: CSSProperties;
   error?: boolean;
   defaultSelectedValues?: string[];
}

export interface FormLabelProps {
   label: string;
   info?: string;
   optional?: boolean;
}
