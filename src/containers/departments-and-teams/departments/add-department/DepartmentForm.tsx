import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Flex, Textarea, TextInput } from '@mantine/core';
import { Optional } from '@/src/components';
import colours from '@/src/constants/palette';
import {
   AddDepartmentFormContext,
   DepartmentsAndTeamsContext,
   EditDepartmentFormContext
} from '@/src/context/departments.context';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
   addDepartmentFormData,
   addDepartmentFormFields,
   addSubDepartmentFormFields,
   storeAllHods
} from '@/src/utils/departments.utils';
import { getEmployees } from '@/src/services/employee-list.service';
import { addDepartment, updateDepartment } from '@/src/services/departments.service';
import toastService from '@/src/services/toast.service';
import {
   AddDepartmentFormValueType,
   DepartmentFormProps
} from '@/src/containers/departments-and-teams/departments/departments.types';
import { useQuery } from '@tanstack/react-query';
import SearchableDropDown from '@/src/components/SearchableDropDown';
import { plusIcon } from '@/src/constants/icons';
import { orgChartNodesData } from '@/src/utils/organization-chart.utils';

const DepartmentForm: FC<DepartmentFormProps> = ({
   department,
   isSubDepartment,
   showHodDropdownFooter
}) => {
   const isEditForm: boolean = !!department;
   const [subDepartmentForm, setSubDepartmentForm] = useState<boolean>(!!isSubDepartment);
   const addDepartmentForm: UseFormReturnType<AddDepartmentFormValueType> = useForm(
      subDepartmentForm ? addSubDepartmentFormFields : addDepartmentFormFields
   );
   const { handleFormClose } = useContext(
      isEditForm ? EditDepartmentFormContext : AddDepartmentFormContext
   );
   const { setReFetch } = useContext(DepartmentsAndTeamsContext);

   useQuery({
      queryFn: async () => {
         const employees = (await getEmployees()) ?? [];
         storeAllHods(employees);
         return employees;
      },
      queryKey: ['add-department-employees']
   });

   const handleFormSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      if (addDepartmentForm.validate().hasErrors) {
         return;
      }

      const formData = new FormData();

      Object.keys(addDepartmentForm.values).forEach((field) => {
         formData.append(
            field,
            addDepartmentForm.values[field as keyof AddDepartmentFormValueType]
         );
      });

      if (orgChartNodesData.parentOrgChartId) {
         formData.append('orgChartNodeId', orgChartNodesData.parentOrgChartId);
         orgChartNodesData.parentOrgChartId = '';
      }
      if (isEditForm) {
         if (await updateDepartment(department?.id ?? '', formData)) {
            toastService.showToast({
               color: colours.success,
               title: 'Success',
               subtitle: `${addDepartmentForm.values['departmentName']} updated successfully`
            });
            handleFormClose?.();
            setReFetch?.(true);
         }
      } else if (await addDepartment(formData)) {
         toastService.showToast({
            color: colours.success,
            title: 'Success',
            subtitle: `${addDepartmentForm.values['departmentName']} created successfully`
         });
         handleFormClose?.();
         setReFetch?.(true);
      }
   };

   useEffect(() => {
      if (department) {
         subDepartmentForm && addDepartmentForm.setFieldValue('parentId', department.parentId);
         addDepartmentForm.setFieldValue('departmentName', department.departmentName);
         addDepartmentForm.setFieldValue('departmentHead', department.departmentHead);
         addDepartmentForm.setFieldValue('description', department.description);
      }
   }, [department]);

   useEffect(() => setSubDepartmentForm(!!isSubDepartment), [isSubDepartment]);

   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={42}>
         <h5 className={'text-h5 font-semibold text-midnight-blue'}>
            {isEditForm ? 'Edit' : 'Create'} {subDepartmentForm && 'Sub-'}Department
         </h5>
         <form className={'flex flex-col gap-y-3'} onSubmit={handleFormSubmit}>
            {subDepartmentForm && (
               <>
                  <Flex direction={'column'} rowGap={5}>
                     <p className={'text-sm font-medium'}>Department Name</p>
                     <SearchableDropDown
                        data={addDepartmentFormData.departments}
                        placeholder={'Select Department'}
                        onChange={(value: string[]) =>
                           addDepartmentForm.setFieldValue('parentId', value[0])
                        }
                        dropDownFooter={
                           showHodDropdownFooter ? (
                              <Flex
                                 columnGap={8}
                                 className={'text-shade-blue cursor-pointer items-center'}
                                 onClick={() => setSubDepartmentForm(false)}
                              >
                                 {plusIcon}Add department
                              </Flex>
                           ) : (
                              <></>
                           )
                        }
                        error={!!addDepartmentForm.errors['parentId']}
                        defaultSelectedValues={department?.parentId ? [department.parentId] : []}
                     />
                     {addDepartmentForm.errors['parentId'] && (
                        <p className={'text-sm text-error'}>
                           {addDepartmentForm.errors['parentId']}
                        </p>
                     )}
                  </Flex>
               </>
            )}
            <TextInput
               label={
                  <p className={'text-sm mb-1'}>{subDepartmentForm && 'Sub-'}Department Name</p>
               }
               placeholder={'CSE'}
               size={'md'}
               {...addDepartmentForm.getInputProps('departmentName')}
            />
            <Flex direction={'column'} rowGap={5}>
               <p className={'text-sm font-medium'}>Head of Department</p>
               <SearchableDropDown
                  data={addDepartmentFormData.hods}
                  onChange={(value: string[]) =>
                     addDepartmentForm.setFieldValue('departmentHead', value[0])
                  }
                  error={!!addDepartmentForm.errors['departmentHead']}
                  defaultSelectedValues={
                     department?.departmentHead ? [department?.departmentHead] : []
                  }
               />
               {addDepartmentForm.errors['departmentHead'] && (
                  <p className={'text-sm text-error'}>
                     {addDepartmentForm.errors['departmentHead']}
                  </p>
               )}
            </Flex>
            <Textarea
               label={
                  <p className={'text-sm mb-1'}>
                     Description <Optional />
                  </p>
               }
               size={'md'}
               styles={{
                  input: {
                     height: '12rem'
                  }
               }}
               placeholder={'Enter description'}
               {...addDepartmentForm.getInputProps('description')}
            />
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
                  {isEditForm ? 'Update' : 'Create'}
               </Button>
            </Flex>
         </form>
      </Flex>
   );
};

export default DepartmentForm;
