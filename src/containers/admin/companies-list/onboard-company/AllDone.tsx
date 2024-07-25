import React, { FC } from 'react';
import { Box, Button, Flex } from '@mantine/core';
import colours from '@/src/constants/palette';
import { AllDoneProps, onboardFromData } from '@/src/utils/onboard-company-form.utils';
import { allDoneIcon } from '@/src/constants/icons';

const AllDone: FC<AllDoneProps> = ({ closeDrawer }) => {
   return (
      <Flex justify={'center'} align={'center'} className={'h-screen w-full'}>
         <Flex direction={'column'} align={'center'} rowGap={24} className={'w-[70%]'}>
            <Box className={'relative'}>{allDoneIcon}</Box>
            <h4 className={'text-h4 text-midnight-blue font-bold'}>All Done!</h4>
            <p className={'text-body'}>
               The {onboardFromData.companyName} is successfully added in the platform
            </p>
            <Button
               variant={'light'}
               color={colours.grey}
               size={'md'}
               onClick={() => closeDrawer({ fetch: true })}
            >
               Close
            </Button>
         </Flex>
      </Flex>
   );
};

export default AllDone;
