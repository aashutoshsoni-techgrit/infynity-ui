'use client';

import React, { FC, ReactNode } from 'react';
import { InfynityLogo } from '@/src/components/index';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Flex } from '@mantine/core';

export type MenuItem = { title: string; icon?: string | ReactNode; route: string };

type SideNavBarProps = { menuItems: MenuItem[] };

const SideNavBar: FC<SideNavBarProps> = ({ menuItems }) => {
   const router = useRouter();
   const currentRoute: string = usePathname();

   const applySelectedColor = (isSelected: boolean) => ({
      filter: isSelected
         ? 'invert(47%) sepia(76%) saturate(3033%) hue-rotate(210deg) brightness(96%) contrast(101%)'
         : 'none'
   });

   return (
      <Box
         className={
            'min-w-[15rem] max-w-[15rem] min-h-screen max-h-screen py-5 border-r border-solid border-grey-3x-light bg-white'
         }
      >
         <Flex justify={'center'} className={'w-full mb-14'}>
            <InfynityLogo />
         </Flex>
         <Box>
            {menuItems?.map?.((item, index: number) => (
               <Flex
                  key={index}
                  align={'center'}
                  className={
                     'w-full min-h-11 max-h-11 gap-x-2.5 pl-7 py-2 cursor-pointer relative hover:bg-grey-4x-light'
                  }
                  onClick={() => router.replace(item.route)}
               >
                  <Box
                     style={applySelectedColor(currentRoute === item.route)}
                     className={'min-w-7 max-w-7'}
                  >
                     {item.icon}
                  </Box>
                  <p
                     className={`font-medium ${currentRoute === item.route ? 'text-midnight-blue' : ''}`}
                  >
                     {item.title}
                  </p>
                  {currentRoute === item.route && (
                     <Box className={'absolute left-0 top-0 h-full w-2 bg-shade-blue'} />
                  )}
               </Flex>
            ))}
         </Box>
      </Box>
   );
};

export default SideNavBar;
