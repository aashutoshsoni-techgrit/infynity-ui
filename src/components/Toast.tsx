'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Flex, Notification } from '@mantine/core';
import { MdNotifications } from 'react-icons/md';
import { EVENT_CONSTANTS } from '@/src/constants';
import toastService, { ToastDataType } from '@/src/services/toast.service';
import { Timeout } from 'react-number-format/types/types';

interface ToastProps {
   show: boolean;
   toast?: ToastDataType;
}

let timer: Timeout | null = null;

const TOAST_DISAPPEAR_TIME = 5000;

const Toast = () => {
   const toastRef = useRef<HTMLDivElement | null>(null);
   const [event, setEvent] = useState<ToastProps | null>(null);

   if (typeof document !== 'undefined') {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      document.addEventListener(EVENT_CONSTANTS.toastEvent, (event: any) => {
         if (event.data.show && timer === null) {
            timer = setTimeout(() => {
               if (event.data.show) {
                  setEvent({ show: false });
               }
               timer = null;
            }, TOAST_DISAPPEAR_TIME);
         }
         setEvent({ ...event?.data });
      });
   }

   useEffect(() => {
      if (toastRef?.current?.style) {
         toastRef.current.style.borderColor = event?.toast?.color ?? '';
      }
   }, [event]);

   return (
      <>
         {event?.show && (
            <Flex
               className={
                  'absolute right-6 top-5 z-[1000] max-w-[35vw] rounded-tl rounded-bl border-l-[0.4rem] border-solid'
               }
               ref={toastRef}
            >
               <Notification
                  title={event?.toast?.title}
                  icon={event?.toast?.icon ?? <MdNotifications />}
                  color={event?.toast?.color}
                  onClose={() => toastService.hideToast()}
               >
                  {event?.toast?.subtitle}
               </Notification>
            </Flex>
         )}
      </>
   );
};

export default Toast;
