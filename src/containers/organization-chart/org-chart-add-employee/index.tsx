import React, { FC, useState } from 'react';
import { AddEmployeeProps } from '@/src/containers/organization-chart/organization-chart.types';
import { OrgChartAddEmployeeContext } from '@/src/context/org-chart.context';
import { OrgChartAddEmployeeForms } from '@/src/utils/organization-chart.utils';
import EmployeeForm from '@/src/containers/employees-list/onboard-employee/EmployeeForm';
import OrgChartAddEmployeeForm from '@/src/containers/organization-chart/org-chart-add-employee/OrgChartAddEmployeeForm';

const AddEmployee: FC<AddEmployeeProps> = ({ handleFormClose }) => {
   const [currentForm, setCurrentForm] = useState<number>(
      OrgChartAddEmployeeForms.SELECT_EMPLOYEE_FORM
   );

   return (
      <>
         {currentForm === OrgChartAddEmployeeForms.SELECT_EMPLOYEE_FORM && (
            <OrgChartAddEmployeeContext.Provider value={{ setCurrentForm, handleFormClose }}>
               <OrgChartAddEmployeeForm />
            </OrgChartAddEmployeeContext.Provider>
         )}
         {currentForm === OrgChartAddEmployeeForms.CREATE_EMPLOYEE_FORM && (
            <EmployeeForm closeDrawer={handleFormClose} />
         )}
      </>
   );
};

export default AddEmployee;
