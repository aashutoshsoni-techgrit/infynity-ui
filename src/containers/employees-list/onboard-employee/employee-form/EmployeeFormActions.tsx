import React, { FC } from 'react';
import { Button, Flex } from '@mantine/core';
import colours from '@/src/constants/palette';
import { EmployeeFormActionsProps } from './employee-form.types';

const EmployeeFormActions: FC<EmployeeFormActionsProps> = ({ edit, closeDrawer }) => (
   <Flex justify={'space-between'} mt={32} className={'w-full'}>
      <Button
         variant={'light'}
         bg={colours.grey4XLight}
         color={colours.grey}
         size={'md'}
         onClick={() => {
            if (closeDrawer) {
               closeDrawer();
            }
         }}
      >
         Cancel
      </Button>
      <Button color={colours.shadeBlue} size={'md'} type={'submit'}>
         {edit ? 'Update' : 'Create'}
      </Button>
   </Flex>
);

export default EmployeeFormActions;
