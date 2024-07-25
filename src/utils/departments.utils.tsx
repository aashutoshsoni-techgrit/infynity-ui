import React from 'react';
import { Required } from '@/src/utils/onboard-employee-form.utils';
import { DepartmentType } from '@/src/containers/departments-and-teams/departments/departments.types';
import { SearchableDropDownItemDataType } from '@/src/components/components.types';
import SearchableDropDown from '@/src/components/SearchableDropDown';
import { EmployeeType } from '@/src/containers/employees-list/employees.types';
import { Avatar, Box, Flex } from '@mantine/core';

export enum DepartmentsAndTeamsTabs {
   DEPARTMENTS,
   TEAMS
}

export enum AddDepartmentForms {
   ADD_DEPARTMENT,
   ADD_SUB_DEPARTMENT
}

export const addDepartmentFormFields = {
   initialValues: {
      departmentName: '',
      departmentHead: '',
      description: ''
   },
   validate: {
      departmentName: Required,
      departmentHead: Required
   }
};

export const addSubDepartmentFormFields = {
   initialValues: {
      departmentName: '',
      departmentHead: '',
      description: '',
      parentId: ''
   },
   validate: {
      departmentName: Required,
      departmentHead: Required,
      parentId: Required
   }
};

export const addDepartmentFormData: {
   hods: SearchableDropDownItemDataType[];
   departments: SearchableDropDownItemDataType[];
} = {
   hods: [],
   departments: []
};

export const storeAllDepartments = async (departments: DepartmentType[]) => {
   addDepartmentFormData.departments = [];

   const depthFirstSearch = (department: DepartmentType) => {
      if (!department) {
         return;
      }

      addDepartmentFormData.departments.push({
         label: (
            <SearchableDropDown.Label>
               <p>{department.departmentName}</p>
            </SearchableDropDown.Label>
         ),
         item: (
            <SearchableDropDown.Item>
               <p>{department.departmentName}</p>
            </SearchableDropDown.Item>
         ),
         value: department.id,
         searchPatterns: [department.departmentName]
      });

      department.children?.forEach((childDepartment) => depthFirstSearch(childDepartment));
   };

   departments.forEach((department) => depthFirstSearch(department));
};

export const storeAllHods = async (employees: EmployeeType[]) => {
   addDepartmentFormData.hods =
      employees?.map?.((employee: EmployeeType) => ({
         label: (
            <SearchableDropDown.Label>
               <p>
                  {employee.firstName} {employee.lastName}
               </p>
            </SearchableDropDown.Label>
         ),
         item: (
            <SearchableDropDown.Item>
               <Flex align={'center'} columnGap={12}>
                  <Avatar src={employee.profilePhoto} />
                  <Box>
                     <p>
                        {employee.firstName} {employee.lastName}
                     </p>
                     <p>{employee.email}</p>
                  </Box>
               </Flex>
            </SearchableDropDown.Item>
         ),
         value: employee.id || '',
         searchPatterns: [employee.firstName || '', employee.lastName || '', employee.email || '']
      })) ?? [];
};
