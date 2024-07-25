export const IS_USER_ALREADY_REGISTERED_EMAIL =
   'This email address is already in use. Please enter a different email address.';

export const IS_COMPANY_ALREADY_REGISTERED_EMAIL =
   'This company email address is already in use. Please enter a different email address.';

export const IS_ROLE_ALREADY_REGISTERED = 'Role already exists with the given name';

export const ROLES_STRINGS = {
   GET_ROLES: 'Unable to fetch roles',
   GET_EMPLOYEES_TO_ASSIGN_ROLES: 'Unable to fetch employees to assign roles',
   GET_ROLES_DETAILS: 'Unable to fetch role details',
   ASSIGN_ROLES: 'Error while assigning role to user'
} as const;

export const TEAMS_STRINGS = {
   ADD_TEAM: 'Unable to add team',
   UPDATE_TEAM: 'Unable to update team',
   GET_TEAMS_DATA: 'Unable to fetch team'
} as const;

export const PERMISSION_LIST_STRING = 'Unable to fetch permissions';

export const ORGANIZATION_CHART_STRINGS = {
   GET_ORGANIZATION_CHART_DATA: 'Unable to fetch organization chart',
   ADD_EMPLOYEE_TO_ORG_CHART: 'Unable to add employee to org chart'
} as const;

export const DEPARTMENT_STRINGS = {
   GET_DEPARTMENTS: 'Unable to fetch departments',
   UPDATE_DEPARTMENTS: 'Unable to update department',
   IS_DEPARTMENT_NAME_ALREADY_EXITS: 'Department name already exists'
} as const;

export const COMPANY_LIST_STRING = 'Unable to fetch companies';

export const EMPLOYEE_LIST_STRING = 'Failed to fetch employees';

export const EMPLOYEE_PROFILE_STRING = 'Unable to Employee Profile data';
