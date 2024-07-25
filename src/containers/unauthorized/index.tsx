'use client';
import React from 'react';
import { CompanyAdminWrapper } from '@/src/components';
import { Flex } from '@mantine/core';
import colours from '@/src/constants/palette';

const Unauthorized: React.FC = () => {
   return (
      <CompanyAdminWrapper pageTitle='Alert'>
         <Flex
            justify='space-between'
            className='bg-white rounded-[0.8rem] -mt-6 border border-solid border-grey-3x-light'
         >
            <Flex align='center' justify='space-between' className='px-5 py-3.5 w-full'>
               <p className='text-3xl font-bold' style={{ color: colours.error }}>
                  Sorry, you do not have the necessary permissions to view this page.
               </p>
            </Flex>
         </Flex>
      </CompanyAdminWrapper>
   );
};

export default Unauthorized;
