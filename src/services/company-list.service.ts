import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { COMPANY_LIST_STRING } from '../constants/server-errors';

const fetchCompanies = async () => {
   try {
      const response = await httpService.get('company');
      if (response?.data?.data?.length) {
         return response?.data?.data;
      }
   } catch (error) {
      toastService.showToast({ color: colours.error, title: COMPANY_LIST_STRING });
   }
};

export default fetchCompanies;
