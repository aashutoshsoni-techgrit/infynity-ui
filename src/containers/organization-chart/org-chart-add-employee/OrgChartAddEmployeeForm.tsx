import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Flex } from '@mantine/core';
import SearchableDropDown from '@/src/components/SearchableDropDown';
import {
   orgChartAddEmployeeFormFields,
   OrgChartAddEmployeeForms,
   orgChartNodesData
} from '@/src/utils/organization-chart.utils';
import { plusIcon } from '@/src/constants/icons';
import colours from '@/src/constants/palette';
import { useForm, UseFormReturnType } from '@mantine/form';
import { OrgChartAddEmployeeContext, OrgChartContext } from '@/src/context/org-chart.context';
import { SearchableDropDownItemDataType } from '@/src/components/components.types';
import { addEmployeeToOrgChart } from '@/src/services/organization-chart.service';
import toastService from '@/src/services/toast.service';

const OrgChartAddEmployeeForm = () => {
   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const addEmployeeForm: UseFormReturnType<any> = useForm(orgChartAddEmployeeFormFields);
   const { getAllEmployees } = useContext(OrgChartContext);
   const { setCurrentForm, handleFormClose } = useContext(OrgChartAddEmployeeContext);
   const [employeeDropDownData, setEmployeeDropDownData] = useState<
      SearchableDropDownItemDataType[]
   >([]);

   useEffect(() => {
      const employees = getAllEmployees?.();

      if (employees?.length) {
         const employeeDropDownData = employees?.map((employee) => ({
            label: (
               <SearchableDropDown.Label>
                  <Flex columnGap={6} align={'center'}>
                     <Avatar src={employee.profilePhoto} size={22} />
                     <p>
                        {employee.firstName} {employee.lastName}
                     </p>
                  </Flex>
               </SearchableDropDown.Label>
            ),
            value: employee.id || '',
            item: (
               <SearchableDropDown.Item>
                  <Flex align={'center'} columnGap={12}>
                     <Flex>
                        <Avatar src={employee.profilePhoto} />
                     </Flex>
                     <Flex direction={'column'}>
                        <p className={'font-medium'}>
                           {employee.firstName} {employee.lastName}
                        </p>
                        <p className={'text-xs text-shade-blue'}>{employee.email}</p>
                        <p className={'text-xs'}>{employee.title}</p>
                     </Flex>
                  </Flex>
               </SearchableDropDown.Item>
            ),
            searchPatterns: [employee.firstName || '', employee.lastName || '']
         }));

         setEmployeeDropDownData(employeeDropDownData);
      }
   }, []);

   const handleFormSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      if (addEmployeeForm.validate().hasErrors) {
         return;
      }

      const formData = new FormData();

      formData.append('employees', JSON.stringify(addEmployeeForm.values['employee']));

      if (orgChartNodesData.parentOrgChartId) {
         formData.append('orgChartNodeId', orgChartNodesData.parentOrgChartId);
         orgChartNodesData.parentOrgChartId = '';
      }

      const getEmployeeNames = (ids: string[]) => {
         return ids.map((id) => {
            const employee = employeeDropDownData.find((emp) => emp.value === id);
            return employee ? `${employee.searchPatterns[0]} ${employee.searchPatterns[1]}` : '';
         });
      };

      if (await addEmployeeToOrgChart(formData)) {
         const employeeNames = getEmployeeNames(addEmployeeForm.values['employee']);
         toastService.showToast({
            color: colours.success,
            title: 'Success',
            subtitle: `${employeeNames.length === 1 ? employeeNames[0] : 'Employees'} has added to the organization`
         });
         handleFormClose?.();
      }
   };

   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={42}>
         <Flex direction={'column'} rowGap={8}>
            <h5 className={'text-h5 font-semibold text-midnight-blue'}>Add Employee</h5>
            <p>Please select a employee from the existing list.</p>
         </Flex>
         <form onSubmit={handleFormSubmit} className={'flex flex-col gap-y-3'}>
            <Flex direction={'column'} rowGap={5}>
               <p className={'text-sm font-medium'}>Employee</p>
               <SearchableDropDown
                  data={employeeDropDownData}
                  onChange={(value: string[]) => {
                     addEmployeeForm.setFieldValue('employee', value);
                     addEmployeeForm.errors['employee'] &&
                        addEmployeeForm.setFieldValue('employee', '');
                  }}
                  dropDownFooter={
                     <Flex
                        columnGap={8}
                        align={'center'}
                        className={'text-shade-blue cursor-pointer'}
                        onClick={() =>
                           setCurrentForm?.(OrgChartAddEmployeeForms.CREATE_EMPLOYEE_FORM)
                        }
                     >
                        {plusIcon}Create Employee
                     </Flex>
                  }
                  multiSelect
               />
               {addEmployeeForm.errors['employee'] && (
                  <p className={'text-sm text-error'}>{addEmployeeForm.errors['employee']}</p>
               )}
            </Flex>
            <Flex justify={'space-between'} align={'center'} mt={32}>
               <Button
                  variant={'light'}
                  bg={colours.grey4XLight}
                  color={colours.grey}
                  size={'md'}
                  onClick={handleFormClose}
               >
                  Cancel
               </Button>
               <Button color={colours.shadeBlue} size={'md'} type={'submit'}>
                  Add
               </Button>
            </Flex>
         </form>
      </Flex>
   );
};

export default OrgChartAddEmployeeForm;
