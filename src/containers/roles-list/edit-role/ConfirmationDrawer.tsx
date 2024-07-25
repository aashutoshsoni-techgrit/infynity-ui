import React, { FC } from 'react';
import { Drawer, Button, Flex } from '@mantine/core';
import colours from '@/src/constants/palette';

interface ConfirmationDrawerProps {
   opened: boolean;
   onClose: () => void;
   onConfirm: () => void;
}

const ConfirmationDrawer: FC<ConfirmationDrawerProps> = ({ opened, onClose, onConfirm }) => {
   return (
      <Drawer
         opened={opened}
         onClose={onClose}
         title='Are you sure you want to submit?'
         padding='xl'
         size='md'
         position='right'
      >
         <p>Are You Sure you want to update the changes that you have edited</p>
         <Flex justify={'space-between'} mt={32} className={'w-full'}>
            <Button
               variant={'light'}
               bg={colours.grey4XLight}
               color={colours.grey}
               size={'md'}
               onClick={onClose}
            >
               Cancel
            </Button>
            <Button color={colours.shadeBlue} size={'md'} onClick={onConfirm}>
               Update
            </Button>
         </Flex>
      </Drawer>
   );
};

export default ConfirmationDrawer;
