import { ReactNode } from 'react';
import { EVENT_CONSTANTS } from '@/src/constants';

export interface ToastDataType {
   title: string;
   subtitle?: string;
   color: string;
   icon?: ReactNode;
}

class ToastService {
   private switchToast(show: boolean, toast: ToastDataType | undefined = undefined) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const event: any = document.createEvent('Event');
      const data = {
         show,
         toast
      };

      event.initEvent(EVENT_CONSTANTS.toastEvent, true, true);
      event['data'] = data;
      document.dispatchEvent(event);
   }

   public showToast(toast?: ToastDataType) {
      this.switchToast(true, toast);
   }

   public hideToast() {
      this.switchToast(false);
   }
}

const toastService = new ToastService();

export default toastService;
