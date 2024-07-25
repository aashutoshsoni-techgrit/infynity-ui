import React from 'react';
import { Box, Flex } from '@mantine/core';
import SearchableDropDown from '@/src/components/SearchableDropDown';
import { SearchableDropDownItemDataType } from '@/src/components/components.types';

const TopLevelEmployeeSelection = ({
   isFetched,
   hasTopLevelEmployee,
   topLevelEmployeeEmails,
   handleItemChange
}: {
   isFetched: boolean;
   hasTopLevelEmployee: boolean;
   topLevelEmployeeEmails: SearchableDropDownItemDataType[];
   handleItemChange: (key: string, value: string | null, remove?: boolean) => void;
}) => (
   <>
      {isFetched && !hasTopLevelEmployee && (
         <>
            <h6 className='text-h6 text-black font-semibold mt-7'>Select the top-level employee</h6>
            <p>Top-Level Employee will be the top most hierarchy in the organization chart.</p>
            <Flex className='w-full mt-1' align='start' direction='column' gap='xs'>
               <Box className='w-[45%] mt-1'>Top-Level Employee</Box>
               <Box className='w-[100%] relative'>
                  <SearchableDropDown
                     data={topLevelEmployeeEmails}
                     multiSelect={false}
                     placeholder='Search'
                     onChange={(value: string[]) =>
                        handleItemChange('topLevelEmployee', value[0] ?? '')
                     }
                  />
               </Box>
            </Flex>
         </>
      )}
   </>
);

export default TopLevelEmployeeSelection;
