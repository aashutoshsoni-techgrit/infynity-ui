import React, { FC, useState } from 'react';
import { Box, Flex } from '@mantine/core';
import { ProgressBar } from '@/src/components';
import UploadCSV from '@/src/containers/employees-list/onboard-employee/bulk-employee-upload/UploadCSV';
import { BulkEmployeeUploadContext } from '@/src/context/bulk-employee-upload.context';
import { BulkEmployeeUploadForms } from '@/src/utils/bulk-employee-upload';
import MapAndImport from '@/src/containers/employees-list/onboard-employee/bulk-employee-upload/MapAndImport';

const BulkEmployeeUpload: FC<{ closeDrawer: (reFetch?: { fetch: boolean }) => void }> = ({
   closeDrawer
}) => {
   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const [currentForm, setCurrentForm] = useState<any>(BulkEmployeeUploadForms.UPLOAD_FORM);
   const [uploadCSVFormProgress, setUploadCSVFormProgress] = useState<number>(0);
   const [mapFieldsFormProgress, setMapFieldsFormProgress] = useState<number>(0);

   const handleFormClose = (reFetch: { fetch: boolean } = { fetch: false }) => {
      closeDrawer(reFetch);
   };

   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={42}>
         <Flex justify={'space-between'} className={'w-full'}>
            <Box className={'w-[48%]'}>
               <ProgressBar
                  label={
                     <small
                        className={
                           currentForm === BulkEmployeeUploadForms.UPLOAD_FORM
                              ? 'text-shade-blue'
                              : ''
                        }
                     >
                        Upload CSV/XLSX
                     </small>
                  }
                  progress={uploadCSVFormProgress}
               />
            </Box>
            <Box className={'w-[48%]'}>
               <ProgressBar
                  label={
                     <small
                        className={
                           currentForm === BulkEmployeeUploadForms.MAPPING_FORM
                              ? 'text-shade-blue'
                              : ''
                        }
                     >
                        Map Fields
                     </small>
                  }
                  progress={mapFieldsFormProgress}
               />
            </Box>
         </Flex>
         <BulkEmployeeUploadContext.Provider
            value={{
               setUploadCSVFormProgress,
               setMapFieldsFormProgress,
               setCurrentForm,
               handleFormClose
            }}
         >
            {currentForm === BulkEmployeeUploadForms.UPLOAD_FORM && <UploadCSV />}
            {currentForm === BulkEmployeeUploadForms.MAPPING_FORM && <MapAndImport />}
         </BulkEmployeeUploadContext.Provider>
      </Flex>
   );
};

export default BulkEmployeeUpload;
