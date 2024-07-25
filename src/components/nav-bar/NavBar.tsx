'use client';

import React, { FC, useContext, useEffect, useState } from 'react';
import { MdNotificationsNone } from 'react-icons/md';
import colours from '@/src/constants/palette';
import ProfileMenu from '@/src/components/nav-bar/ProfileMenu';
import { Avatar, Flex, Indicator } from '@mantine/core';
import { MdOutlineSearch } from 'react-icons/md';
import { AuthContext } from '@/src/context/AuthWrapper';

type NavBarProps = { pageTitle?: string; bg?: string; border?: string; search?: boolean };

const NavBar: FC<NavBarProps> = ({
   pageTitle,
   bg = 'bg-white',
   border = 'border-b border-solid border-grey-3x-light',
   search = false
}) => {
   const { getSignedInUser } = useContext(AuthContext);
   const [selectedPath, setSelectedPath] = useState('');

   let signedInUser = null;
   if (getSignedInUser) {
      signedInUser = getSignedInUser()?.user;
   }
   const { firstName, lastName } = signedInUser || {};

   useEffect(() => {
      const path = window.location.pathname;
      const parts = path.split('/').filter((part) => part);

      if (parts.length > 1 && parts[0] !== 'admin') {
         setSelectedPath(parts[0]);
      } else {
         setSelectedPath('');
      }
   }, []);

   return (
      <Flex
         justify={'space-between'}
         align={'center'}
         className={`h-[5rem] w-full rounded-br-[0.625rem] px-6 ${border} ${bg}`}
      >
         <h5 className={`text-[1.563rem] text-midnight-dark-blue font-semibold`}>
            {selectedPath ? (
               <span className='text-[gray] font-normal text-md capitalize'>{selectedPath} / </span>
            ) : null}
            {pageTitle}
         </h5>

         <Flex align={'center'} columnGap={24}>
            {search && (
               <MdOutlineSearch size={24} color={colours.shadeBlue} className={'cursor-pointer'} />
            )}
            <Indicator processing={true} color={colours.shadeBlue} className={'cursor-pointer'}>
               <MdNotificationsNone size={24} color={colours.shadeBlue} />
            </Indicator>
            <Flex align={'center'} columnGap={16}>
               <Avatar src={null} />
               <p className={'font-semibold text-black'}>
                  {firstName ?? '..'} {lastName ?? '..'}
               </p>
               <ProfileMenu />
            </Flex>
         </Flex>
      </Flex>
   );
};

export default NavBar;
