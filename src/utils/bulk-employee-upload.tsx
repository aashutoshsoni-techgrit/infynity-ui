import * as XLSX from 'xlsx';
import React, { ReactNode } from 'react';
import FormLabel from '@/src/components/forms/FormLabel';

export interface HistoryCardType {
   id: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
   fileLocation: string;
   fileName: string;
   importFailureCount: string;
   importSuccessCount: string;
   status: string;
   createdBy: string;
}

export enum BulkEmployeeUploadForms {
   UPLOAD_FORM,
   MAPPING_FORM
}

export enum BulkUploadHistoryStatus {
   IN_PROGRESS = 'inProgress',
   COMPLETED = 'completed'
}

export const getColumnsInCsvAndXlsxFile = (file: File): Promise<string[]> => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
         const data = new Uint8Array(event.target?.result as ArrayBuffer);
         const workbook = XLSX.read(data, { type: 'array' });
         const firstSheetName = workbook.SheetNames[0];
         const worksheet = workbook.Sheets[firstSheetName];
         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

         if (jsonData.length > 0) {
            const columnHeadings = jsonData[0] as string[];
            resolve(columnHeadings);
         } else {
            reject('No data found');
         }
      };
      reader.onerror = (error) => {
         reject(error);
      };
      reader.readAsArrayBuffer(file);
   });
};

export type TopLevelEmployeeData = {
   [key: string]: string;
};

export const getEmployeeDataInCsvAndXlsxFile = (
   file: File,
   firstNameColumn: string,
   lastNameColumn: string,
   emailColumn: string
): Promise<TopLevelEmployeeData> => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
         const data = new Uint8Array(event.target?.result as ArrayBuffer);
         const workbook = XLSX.read(data, { type: 'array' });
         const firstSheetName = workbook.SheetNames[0];
         const worksheet = workbook.Sheets[firstSheetName];
         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

         if (jsonData.length > 0) {
            const emailIndex: number = (jsonData[0] as string[]).indexOf(emailColumn);
            const firstNameIndex: number = (jsonData[0] as string[]).indexOf(firstNameColumn);
            const lastNameIndex: number = (jsonData[0] as string[]).indexOf(lastNameColumn);
            const employees: TopLevelEmployeeData = {};

            jsonData.forEach((data, index: number) => {
               if (index === 0) {
                  return;
               }

               const row = data as string[];
               const firstName: string = row[firstNameIndex] ?? '';
               const lastName: string = row[lastNameIndex] ?? '';
               const email: string = row[emailIndex] ?? '';

               if (email) {
                  employees[email] = `${firstName} ${lastName}`;
               }
            });

            resolve(employees);
         } else {
            reject('No data found');
         }
      };
      reader.onerror = (error) => {
         reject(error);
      };
      reader.readAsArrayBuffer(file);
   });
};

export const bulkEmployeeData: {
   fileColumns: string[];
   employees: TopLevelEmployeeData;
   uploadFormData: {
      file: File | null;
      uploadProgress: number;
   };
   mappingFormData: {
      data: {
         [key: string]: string;
      };
      mappingProgress: number;
   };
} = {
   fileColumns: [],
   employees: {},
   uploadFormData: {
      file: null,
      uploadProgress: 0
   },
   mappingFormData: {
      data: {},
      mappingProgress: 0
   }
};

export const mapAndImportFields: { component: ReactNode; value: string }[] = [
   {
      component: (
         <FormLabel
            label={'Company EMP ID'}
            info={
               'Employee ID is a unique identifier assigned to each employee within the company.'
            }
            optional
         />
      ),
      value: 'empId'
   },
   {
      component: <FormLabel label={'First Name'} />,
      value: 'firstName'
   },
   {
      component: <FormLabel label={'Last Name'} />,
      value: 'lastName'
   },
   {
      component: <FormLabel label={'Email Address'} />,
      value: 'email'
   },
   {
      component: <FormLabel label={'Gender'} optional />,
      value: 'gender'
   },
   {
      component: <FormLabel label={'Phone'} optional />,
      value: 'phone'
   },
   {
      component: (
         <FormLabel
            label={'Title'}
            optional
            info={'Title represents job designation or position within the organization.'}
         />
      ),
      value: 'title'
   },
   {
      component: <FormLabel label={'Reports to'} optional />,
      value: 'reportsTo'
   },
   {
      component: <FormLabel label={'Date of Joining'} optional />,
      value: 'dateOfJoining'
   },
   {
      component: <FormLabel label={'Department'} optional />,
      value: 'department'
   },
   {
      component: <FormLabel label={'Address'} optional />,
      value: 'address'
   },
   {
      component: <FormLabel label={'City'} optional />,
      value: 'city'
   },
   {
      component: <FormLabel label={'State'} optional />,
      value: 'state'
   },
   {
      component: <FormLabel label={'Country'} optional />,
      value: 'country'
   },
   {
      component: <FormLabel label={'Zip Code'} optional />,
      value: 'zipCode'
   }
];

export const RequiredMapField = (value: string): string | null => {
   if (!value) {
      return 'Map field is empty';
   }

   return null;
};

export const bulkEmployeeMapFormFields: {
   initialValues: {
      [key: string]: string;
   };
   validate: {
      [key: string]: (value: string) => string | null;
   };
} = {
   initialValues: {
      firstName: '',
      lastName: '',
      email: ''
   },
   validate: {
      firstName: RequiredMapField,
      lastName: RequiredMapField,
      email: RequiredMapField
   }
};
