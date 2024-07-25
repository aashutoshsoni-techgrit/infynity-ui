import React, { FC, useEffect, useState } from 'react';
import colours from '@/src/constants/palette';
import Image from 'next/image';
import { Box, Flex } from '@mantine/core';
import { MdOutlinePersonOutline } from 'react-icons/md';

interface UserAvatarProps {
   logo: string;
   progress: number;
   color: string;
}

const initialDashoffset = 282.6;

const UserAvatar: FC<UserAvatarProps> = ({ color, logo = '', progress = 0 }) => {
   const [fillProgress, setFillProgress] = useState<number>(initialDashoffset);

   useEffect(() => {
      setTimeout(() => {
         const dashoffset = 282.6 - progress * 2.826;
         setFillProgress(dashoffset);
      }, 500);
   }, [progress]);

   return (
      <Box className={'relative inline-block w-36'}>
         <Box className={'w-36 h-36'}>
            <svg viewBox={'0 0 100 100'} xmlns={'http://www.w3.org/2000/svg'}>
               <circle
                  cx={'50'}
                  cy={'50'}
                  r={'45'}
                  fill={'none'}
                  stroke={colours.white}
                  strokeWidth={'5'}
               />
               <circle
                  cx={'50'}
                  cy={'50'}
                  r={'45'}
                  fill={'none'}
                  stroke={color}
                  strokeWidth={'5'}
                  strokeDasharray={'282.6'}
                  strokeDashoffset={fillProgress}
                  transform={'rotate(90 50 50)'}
                  style={{ transition: 'stroke-dashoffset 0.6s ease-in-out' }}
               />
            </svg>
         </Box>
         <Box className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[7.3rem]'}>
            {logo ? (
               <Image
                  src={logo}
                  alt={''}
                  width={20}
                  height={20}
                  className={'w-full rounded-[50%]'}
               />
            ) : (
               <Flex justify={'center'}>
                  <MdOutlinePersonOutline size={54} />
               </Flex>
            )}
         </Box>
         <Box
            className={
               'absolute bottom-0 left-1/2 -translate-x-1/2 bg-grey-5x-light py-0.5 px-1.5 rounded-[0.3rem] text-black text-sm'
            }
         >
            {progress}%
         </Box>
      </Box>
   );
};

export default UserAvatar;
