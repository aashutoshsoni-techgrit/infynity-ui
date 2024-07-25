import React from 'react';
import { InfynityLogo } from '@/src/components';
import { Flex } from '@mantine/core';

const LogInWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <Flex
         justify={'center'}
         align={'center'}
         className={'min-h-screen pt-10 pb-10 bg-grey-6x-light'}
      >
         <Flex
            direction={'column'}
            rowGap={16}
            p={64}
            pb={54}
            className={'bg-white rounded-[0.625rem] w-[34rem]'}
         >
            <InfynityLogo />
            {children}
         </Flex>
      </Flex>
   );
};

export default LogInWrapper;
