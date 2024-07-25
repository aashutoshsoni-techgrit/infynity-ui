export interface Employee {
   id: string;
   firstName: string;
   lastName: string;
   emailId: string;
   role: string;
   profilePhoto: string;
}
export interface EmployeeDropdownProps {
   createEmployee?: boolean;
   onChange: (selectedUserIds: string[]) => void;
   selectedEmployees: string[];
   setSelectedEmployees: (selectedEmployees: string[]) => void;
   defultselectedItems?: string[];
}
