export enum EVENT_CONSTANTS {
   loaderEvent = 'loaderEvent',
   toastEvent = 'toastEvent',
   orgChartPanelClickEvent = 'orgChartPanelClickEvent'
}

export const publicRoutes: string[] = [
   '/',
   '/log-in',
   '/forgot-password',
   '/create-new-password',
   '/password-created'
];

export const authSessionStorageKey = 'signed-in-user';

export const userXTenantId = 'x-tenant-id';

export enum UserTypes {
   INFYNITY_ADMIN = 'infynity-admin',
   COMPANY_ADMIN = 'company-admin',
   EMPLOYEE = 'employee'
}

export enum PageModules {
   EMPLOYEE = 'employee-management',
   ROLES = 'role-permission-management'
}

export enum pageModulePermission {
   VIEW = 'view',
   CREATE = 'create',
   EDIT = 'edit',
   DELETE = 'delete'
}
