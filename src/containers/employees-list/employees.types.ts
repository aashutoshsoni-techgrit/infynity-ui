export interface EmployeeType {
   id?: string;
   isActive?: boolean;
   createdAt?: string;
   updatedAt?: string;
   firstName?: string;
   lastName?: string;
   isPrimaryUser?: boolean;
   isTopLevelEmployee?: boolean;
   gender?: string | null;
   email?: string;
   phone?: string | null;
   userType?: string;
   profilePhoto?: string | null;
   empId?: string | null;
   title?: string | null;
   reportsTo?: string | null;
   role?: string | null;
   department?: string | null;
   subDepartment?: string | null;
   dateOfJoining?: string | null;
   address?: string;
   city?: string;
   state?: string;
   country?: string;
   zipCode?: string;
   user?: string;
   reportsToUser?:
      | {
           id: string;
           user: string;
           firstName: string;
           lastName: string;
           email: string;
        }[]
      | null;
}
