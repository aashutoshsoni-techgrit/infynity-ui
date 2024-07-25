import { EVENT_CONSTANTS } from '@/src/constants';

class LoaderService {
   private switchLoader(show: boolean = false) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const event: any = document.createEvent('Event');

      event.initEvent(EVENT_CONSTANTS.loaderEvent, true, true);
      event['showLoader'] = show;
      document.dispatchEvent(event);
   }

   public showLoader() {
      this.switchLoader(true);
   }

   public hideLoader() {
      this.switchLoader(false);
   }
}

const loaderService = new LoaderService();

export default loaderService;
