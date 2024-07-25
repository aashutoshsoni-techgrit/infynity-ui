import React, { FC, useContext, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Drawer, Menu } from '@mantine/core';
import colours from '@/src/constants/palette';
import 'react-phone-input-2/lib/style.css';
import '@mantine/dates/styles.css';
import {
   OnboardEmployeeFormType,
   OnboardEmployeeProps
} from '@/src/utils/onboard-employee-form.utils';
import EmployeeForm from '@/src/containers/employees-list/onboard-employee/EmployeeForm';
import { EmployeeListContext } from '@/src/context/employee-list-view.context';
import BulkEmployeeUpload from '@/src/containers/employees-list/onboard-employee/bulk-employee-upload';
import { bulkEmployeeData } from '@/src/utils/bulk-employee-upload';
import { addEmployeeOutlineIcon, bulkUploadFileIcon } from '@/src/constants/icons';

const OnboardEmployee: FC<OnboardEmployeeProps> = ({ targetText, targetIcon, menuPosition }) => {
   const [opened, { open, close }] = useDisclosure(false);
   const [formType, setFormType] = useState<number>(OnboardEmployeeFormType.SINGLE_UPLOAD);
   const { setEmployeesFetch } = useContext(EmployeeListContext);

   const handleItemClick = (formType: number) => {
      setFormType(formType);
      open();
   };

   const handleFormClose = (reFetch: { fetch: boolean } = { fetch: false }) => {
      if (formType === OnboardEmployeeFormType.BULK_UPLOAD) {
         bulkEmployeeData.uploadFormData = { file: null, uploadProgress: 0 };
         bulkEmployeeData.mappingFormData = { data: {}, mappingProgress: 0 };
      }

      setEmployeesFetch?.({ fetch: reFetch?.fetch });
      close();
   };

   return (
      <>
         <Drawer
            opened={opened}
            onClose={handleFormClose}
            position={'right'}
            size={'lg'}
            padding={20}
            closeOnClickOutside={false}
            closeOnEscape={false}
         >
            {formType === OnboardEmployeeFormType.SINGLE_UPLOAD && (
               <EmployeeForm closeDrawer={handleFormClose} />
            )}
            {formType === OnboardEmployeeFormType.BULK_UPLOAD && (
               <BulkEmployeeUpload closeDrawer={handleFormClose} />
            )}
         </Drawer>
         <Menu shadow={'md'} position={menuPosition}>
            <Menu.Target>
               <Button size={'md'} color={colours.shadeBlue} leftSection={targetIcon}>
                  {targetText}
               </Button>
            </Menu.Target>
            <Menu.Dropdown>
               <Menu.Item
                  leftSection={<div className='inline-block'>{addEmployeeOutlineIcon}</div>}
                  onClick={() => handleItemClick(OnboardEmployeeFormType.SINGLE_UPLOAD)}
               >
                  <p className={'text-base text-grey'}>Create Employee</p>
               </Menu.Item>
               <Menu.Item
                  leftSection={<div className='inline-block ml-1'>{bulkUploadFileIcon}</div>}
                  onClick={() => handleItemClick(OnboardEmployeeFormType.BULK_UPLOAD)}
               >
                  <p className={'text-base text-grey'}>Bulk Upload Employees</p>
               </Menu.Item>
            </Menu.Dropdown>
         </Menu>
      </>
   );
};

export default OnboardEmployee;
