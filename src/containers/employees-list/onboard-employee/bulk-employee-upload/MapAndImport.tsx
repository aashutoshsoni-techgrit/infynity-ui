import React, { useContext, useEffect, useState } from 'react';
import { Button, Flex } from '@mantine/core';
import {
   bulkEmployeeData,
   bulkEmployeeMapFormFields,
   BulkEmployeeUploadForms,
   getEmployeeDataInCsvAndXlsxFile
} from '@/src/utils/bulk-employee-upload';
import colours from '@/src/constants/palette';
import { BulkEmployeeUploadContext } from '@/src/context/bulk-employee-upload.context';
import { useForm } from '@mantine/form';
import {
   getTopLevelEmployeeOfCompany,
   uploadBulkEmployeeData
} from '@/src/services/bulk-employee-onboard.service';
import { useQuery } from '@tanstack/react-query';
import SearchableDropDown from '@/src/components/SearchableDropDown';
import { SearchableDropDownItemDataType } from '@/src/components/components.types';
import { getEmployees } from '@/src/services/employee-list.service';
import EmployeeDropdownItem from './EmployeeDropdownItem';
import FormSection from './MappingFields';
import TopLevelEmployeeSelection from './TopLevelEmployeeSelection';
import { EmployeeType } from '../../employees.types';

const MapAndImport = () => {
   const mappingForm = useForm(bulkEmployeeMapFormFields);
   const [mappingData, setMappingData] = useState<{ [key: string]: string }>(
      bulkEmployeeData.mappingFormData.data
   );
   const { setCurrentForm, handleFormClose, setMapFieldsFormProgress } =
      useContext(BulkEmployeeUploadContext);
   const { data: hasTopLevelEmployee, isFetched } = useQuery({
      queryFn: async () => await getTopLevelEmployeeOfCompany(),
      queryKey: ['has-top-level-employee']
   });

   const { data: employees } = useQuery({
      queryFn: async () => await getEmployees(),
      queryKey: ['all-employees']
   });

   const getDropDownEmployeesData = () => {
      const dropDownEmployeesData: SearchableDropDownItemDataType[] = [];

      if (bulkEmployeeData.employees) {
         Object.keys(bulkEmployeeData.employees).forEach((email) => {
            const employee = bulkEmployeeData.employees[email];
            dropDownEmployeesData.push({
               label: (
                  <SearchableDropDown.Label>
                     <p>{employee}</p>
                  </SearchableDropDown.Label>
               ),
               item: (
                  <SearchableDropDown.Item>
                     <EmployeeDropdownItem
                        employee={{ firstName: employee, lastName: '', email, profilePhoto: '' }}
                     />
                  </SearchableDropDown.Item>
               ),
               value: email,
               searchPatterns: [employee, email]
            });
         });
      }

      if (employees) {
         employees.forEach((employee: EmployeeType) => {
            dropDownEmployeesData.push({
               label: (
                  <SearchableDropDown.Label>
                     <p>
                        {employee.firstName} {employee.lastName}
                     </p>
                  </SearchableDropDown.Label>
               ),
               item: (
                  <SearchableDropDown.Item>
                     <EmployeeDropdownItem employee={employee} />
                  </SearchableDropDown.Item>
               ),
               value: employee.email || '',
               searchPatterns: [
                  employee.firstName || '',
                  employee.lastName || '',
                  employee.email || ''
               ]
            });
         });
      }

      return dropDownEmployeesData;
   };

   const [topLevelEmployeeEmails, setTopLevelEmployeeEmails] = useState<
      SearchableDropDownItemDataType[]
   >(getDropDownEmployeesData());

   const handleFormSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      if (mappingForm.validate().hasErrors) {
         return;
      }

      const formData = new FormData();

      Object.keys(mappingData).forEach((field) => {
         formData.append(field, mappingData[field]);
      });
      bulkEmployeeData.uploadFormData.file &&
         formData.append('employeesFile', bulkEmployeeData.uploadFormData.file);

      if (await uploadBulkEmployeeData(formData)) {
         handleFormClose?.({ fetch: true });
      }
   };

   const handleItemChange = async (key: string, value: string | null, remove?: boolean) => {
      if (value === null) {
         return;
      }

      const updatedMappingData = { ...mappingData, [key]: value };
      let validFields = 0;

      if (remove) {
         delete updatedMappingData[key];
      }

      Object.keys(bulkEmployeeMapFormFields.initialValues).forEach((key) => {
         if (updatedMappingData[key]) {
            validFields++;
         }
      });

      const mappingProgress = Math.round(
         (100 * validFields) / Object.keys(bulkEmployeeMapFormFields.initialValues).length
      );
      setMapFieldsFormProgress?.(mappingProgress);
      setMappingData(updatedMappingData);

      bulkEmployeeData.mappingFormData.mappingProgress = mappingProgress;

      if (typeof bulkEmployeeMapFormFields.initialValues[key] !== 'undefined') {
         mappingForm.setFieldValue(key, value);
      }
      if (key === 'firstName' || key === 'lastName' || key === 'email') {
         if (
            bulkEmployeeData.uploadFormData.file &&
            updatedMappingData['firstName'] &&
            updatedMappingData['lastName'] &&
            updatedMappingData['email']
         ) {
            bulkEmployeeData.employees = await getEmployeeDataInCsvAndXlsxFile(
               bulkEmployeeData.uploadFormData.file,
               updatedMappingData['firstName'],
               updatedMappingData['lastName'],
               updatedMappingData['email']
            );

            setTopLevelEmployeeEmails(getDropDownEmployeesData());
         }
      }
   };

   useEffect(() => {
      bulkEmployeeData.mappingFormData.data = mappingData;
   }, [mappingData]);

   return (
      <form onSubmit={handleFormSubmit}>
         <Flex direction={'column'} rowGap={8}>
            <h5 className={'text-h5 text-midnight-blue font-bold'}>Map Fields</h5>
            <p>Map CSV/XLSX fields to align data correctly with our database system.</p>
            <FormSection mappingData={mappingData} handleItemChange={handleItemChange} />
            <TopLevelEmployeeSelection
               isFetched={isFetched}
               hasTopLevelEmployee={hasTopLevelEmployee}
               topLevelEmployeeEmails={topLevelEmployeeEmails}
               handleItemChange={handleItemChange}
            />
            <Flex justify={'space-between'} mt={32} className={'w-full'}>
               <Button
                  variant={'light'}
                  bg={colours.grey4XLight}
                  color={colours.grey}
                  size={'md'}
                  onClick={() => handleFormClose?.()}
               >
                  Cancel
               </Button>
               <Flex columnGap={12}>
                  <Button
                     variant={'transparent'}
                     color={colours.grey}
                     size={'md'}
                     onClick={() => setCurrentForm?.(BulkEmployeeUploadForms.UPLOAD_FORM)}
                  >
                     Back
                  </Button>
                  <Button color={colours.shadeBlue} size={'md'} type={'submit'}>
                     Map & Import
                  </Button>
               </Flex>
            </Flex>
         </Flex>
      </form>
   );
};

export default MapAndImport;
