import { SearchableDropDownItemDataType } from '@/src/components/components.types';
export interface Teamtype {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   profilePhoto: string | null;
   title: string | null;
   role: string | null;
}

export type AddTeamFormValueType = {
   title: string;
   description: string;
};

export interface TeamsFormProps {
   edit?: boolean;
   employeeId?: string;
   teamId?: string;
   selectedUsers?: string[];
   closeDrawer: (reFetch?: { fetch: boolean }) => void;
   createEmployee?: boolean;
}

export interface TeamsListProps {
   employeeId: string;
   closeDrawer: (reFetch?: { fetch: boolean }) => void;
   name?: string;
   members?: TeamMember[];
}

export interface TeamMember {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   title: string | null;
   profilePhoto: string | null;
}

export interface TeamHead {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   title: string | null;
   profilePhoto: string | null;
}

export interface TeamsListingProps {
   id: string;
   title?: string;
   description?: string;
   head?: string;
   members?: number;
   headDetails?: TeamHead;
}

export interface TeamsDetailsProps {
   id: string;
   employeeId: string;
   title?: string;
   description?: string;
   head?: string;
   members?: TeamMember[];
   headDetails?: TeamHead;
   onClose: () => void;
}

export const Required = (value: string | File | null) => {
   if (!value) {
      return 'Required';
   }
};

export const TeamsFormFields = {
   initialValues: {
      title: '',
      description: ''
   },
   validate: {
      title: Required,
      description: Required
   }
};

export const TeamsFormData: {
   teamemployees: SearchableDropDownItemDataType[];
} = {
   teamemployees: []
};
