'use client';

import React, { useEffect, useState } from 'react';
import { EVENT_CONSTANTS } from '@/src/constants';
import './loader.scss';
import { Box } from '@mantine/core';

const Loader = () => {
   const [loading, setLoading] = useState<boolean>(false);

   if (typeof document !== 'undefined') {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      document.addEventListener(EVENT_CONSTANTS.loaderEvent, (event: any) => {
         setLoading(event.showLoader);
      });
   }

   useEffect(() => {
      document.body.style.pointerEvents = loading ? 'none' : 'all';
   }, [loading]);

   return (
      <>
         {loading && (
            <Box className={'absolute top-0 left-0 w-full z-[100] overflow-hidden'}>
               <Box className={'bg-grey-3x-light w-full h-1.5'}>
                  <Box className={'w-[40vw] h-1.5 bg-shade-blue spinner'} />
               </Box>
            </Box>
         )}
      </>
   );
};

export default Loader;
