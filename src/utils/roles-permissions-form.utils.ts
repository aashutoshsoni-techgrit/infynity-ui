export type Role = {
   assignedTo: number;
   id: string;
   title: string;
   name: string;
   permissiondata: [];
   permissionsCount: number;
   createdOn: string;
   createdAt: string;
   assignedUserCount: number;
   permissions: PermissionType[];
};

export interface PermissionType {
   id: number;
   title: string;
   type: string;
}

export interface ListViewProps {
   roles: Role[];
   searchQuery: string;
}
export interface RoleHeaderProps {
   label: string;
   span: number;
   pl?: number;
}

export type RoleFormProps = {
   edit: boolean;
   roleId: string | null;
   closeDrawer: (reFetch: { fetch: boolean }) => void;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   roleEditDetails?: any;
};

export type ModuleVisibility = {
   [key: string]: boolean;
};

export interface Permissions {
   [module: string]: {
      [permissionId: string]: boolean;
   };
}

export type SelectedPermission = {
   id: string;
};

export interface RoleFormValues {
   permissions: {
      [module: string]: {
         [permissionId: string]: boolean;
      };
   };
}

export interface FilteredPermissions {
   [module: string]: string[];
}

export const Required = (value: string | File | null) => {
   if (!value) {
      return 'Required';
   }
};

export const createRoleFormFields = {
   initialValues: {
      role: '',
      permissions: {},
      users: []
   },
   validate: {
      role: Required,
      permissions: (value: Permissions) => {
         const hasPermissions = Object.keys(value).some((module) =>
            Object.values(value[module]).some((permission) => permission)
         );
         if (!hasPermissions) {
            return 'Required';
         }
      }
   }
};

export enum RoleFormType {
   SINGLE
}
