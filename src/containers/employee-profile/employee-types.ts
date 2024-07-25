export interface Employee {
   id: string;
   firstName: string;
   lastName: string;
   gender: string;
   email: string;
   phone: string;
   profilePhoto: string;
   empId: string;
   title: string;
   reportsTo: string[];
   role: string;
   department: string;
   subDepartment: string;
   dateOfJoining: string;
   address: string;
   city: string;
   state: string;
   country: string;
   zipCode: string;
   user: string;
   countryCode: string;
   reportsToUser: {
      firstName: string;
      lastName: string;
   }[];
}

export interface EmployeeCardProps {
   employee: Employee;
   onEdit: () => void;
   opened: boolean;
   onCloseDrawer: () => void;
}
