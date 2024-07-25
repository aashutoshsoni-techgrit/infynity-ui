import React, { FC } from 'react';
import { EmployeeFormHeaderProps } from './employee-form.types';

const EmployeeFormHeader: FC<EmployeeFormHeaderProps> = ({ edit }) => (
   <h5 className={'text-h5 font-semibold text-midnight-blue'}>
      {edit ? 'Edit Employee' : 'Create Employee'}
   </h5>
);

export default EmployeeFormHeader;
