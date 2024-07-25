import React from 'react';
import { Box, Button, Flex } from '@mantine/core';
import colours from '@/src/constants/palette';
import { OnboardActionButtonsProps } from './company-form-details.types';

const OnboardActionButtons: React.FC<OnboardActionButtonsProps> = ({ isEdit, closeDrawer }) => {
   return (
      <Flex justify={'space-between'} mt={32} className={'w-full'}>
         {isEdit && (
            <Button
               variant={'light'}
               bg={colours.grey4XLight}
               color={colours.error}
               size={'md'}
               onClick={closeDrawer}
            >
               Delete
            </Button>
         )}
         <Box>
            <Button
               variant={'transparent'}
               color={colours.grey}
               className={'mr-5'}
               onClick={closeDrawer}
            >
               Cancel
            </Button>
            <Button color={colours.shadeBlue} size={'md'} type={'submit'}>
               {isEdit ? 'Update' : 'Add'}
            </Button>
         </Box>
      </Flex>
   );
};

export default OnboardActionButtons;
