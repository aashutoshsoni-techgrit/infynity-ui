/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Flex, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
   mapAndImportFields,
   bulkEmployeeData,
   bulkEmployeeMapFormFields
} from '@/src/utils/bulk-employee-upload';

const FormSection = ({
   mappingData,
   handleItemChange
}: {
   mappingData: any;
   handleItemChange: (key: string, value: string | null, remove?: boolean) => void;
}) => {
   const mappingForm = useForm(bulkEmployeeMapFormFields);

   return (
      <Flex direction='column' rowGap={16} className='mt-6'>
         <h6 className='text-h6 font-semibold text-black'>Match columns from the CSV to system</h6>
         {mapAndImportFields.map((field, index) => (
            <Flex className='w-full' align='center' key={index}>
               <Box className='w-[45%]'>{field.component}</Box>
               <Box className='w-[55%]'>
                  <Select
                     placeholder='Select'
                     size='md'
                     data={bulkEmployeeData.fileColumns}
                     {...mappingForm.getInputProps(field.value)}
                     onChange={(value: string | null) => handleItemChange(field.value, value)}
                     value={mappingData?.[field.value]}
                  />
               </Box>
            </Flex>
         ))}
      </Flex>
   );
};

export default FormSection;
