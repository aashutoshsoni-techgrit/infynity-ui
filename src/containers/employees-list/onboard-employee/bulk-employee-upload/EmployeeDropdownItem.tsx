import React from 'react';
import { Avatar } from '@mantine/core';
import { EmployeeType } from '@/src/containers/employees-list/employees.types';

const EmployeeDropdownItem = ({ employee }: { employee: EmployeeType }) => (
   <div className='flex items-center'>
      <div>
         <Avatar src={employee.profilePhoto} />
      </div>
      <div className='pl-3'>
         <p>
            {employee.firstName} {employee.lastName}
         </p>
         <p>{employee.email}</p>
      </div>
   </div>
);

export default EmployeeDropdownItem;
