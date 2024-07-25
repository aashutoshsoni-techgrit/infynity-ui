export interface DepartmentType {
   id: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
   departmentName: string;
   departmentHead: string;
   parentId: string | null;
   createdBy: string;
   description: string;
   groupId: string;
   deptHeadDetails: {
      firstName: string;
      lastName: string;
      title: string;
      role: string;
      email: string;
      profilePhoto: string;
   };
   children: [];
}

export interface DepartmentProps {
   department: DepartmentType;
   isParent?: boolean;
   leftMargin: number;
   showChildren?: boolean;
   isDataFetching: () => boolean;
   isReloading?: boolean;
}

export interface DepartmentDetailsProps {
   department: DepartmentType;
}

export interface SubDepartmentProps {
   department: DepartmentType;
   leftMargin: number;
   isChildren?: boolean;
}

export interface DepartmentsProps {
   departments: DepartmentType[] | undefined;
   isDataFetching: () => boolean;
}

export interface DepartmentFormProps {
   department?: DepartmentType;
   isSubDepartment?: boolean;
   showHodDropdownFooter?: boolean;
}

export interface EditDepartmentProps {
   department: DepartmentType | undefined;
   isSubDepartment?: boolean;
}

export type AddDepartmentFormValueType = {
   departmentName: string;
   departmentHead: string;
   description: string;
};
