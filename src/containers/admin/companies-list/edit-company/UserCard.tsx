import React, { FC } from 'react';
import { Flex } from '@mantine/core';
import { User } from '@/src/containers/admin/companies-list/GridView';
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import colours from '@/src/constants/palette';
import { formatPhoneNumber } from '@/src/utils/form-utils';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const UserCard: FC<{ user: any }> = ({ user }) => {
   const formattedPhoneNumber = formatPhoneNumber(user?.phone, user?.countryCode);

   return (
      <Flex
         direction={'column'}
         rowGap={12}
         className={'w-full rounded-[0.5rem] bg-[#F6F7FE] px-7 py-6'}
      >
         <User
            title={`${user?.firstName} ${user?.lastName}`}
            subtitle={'Root user'}
            profilePhoto={user.profilePhoto}
         />
         <Flex direction={'column'} rowGap={4}>
            <Flex align={'center'}>
               <MdOutlineEmail color={colours.shadeBlue} />
               <p className={'text-sm ml-2 underline'}>{user?.email}</p>
            </Flex>
            {user?.phone && (
               <Flex align={'center'}>
                  <MdOutlinePhone color={colours.shadeBlue} />
                  <p className={'text-sm ml-2'}>
                     {formattedPhoneNumber
                        ? `${user?.countryCode} ${formattedPhoneNumber}`
                        : formattedPhoneNumber}
                  </p>
               </Flex>
            )}
         </Flex>
      </Flex>
   );
};

export default UserCard;
