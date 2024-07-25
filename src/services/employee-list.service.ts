import httpService from '@/src/services/http.service';
import { authStore } from '@/src/context/AuthWrapper';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { EMPLOYEE_LIST_STRING } from '../constants/server-errors';

export const getEmployees = async () => {
   try {
      const response = await httpService.get('/employee', {
         'x-tenant-id': authStore.tenantId
      });
      return response?.data?.data;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: EMPLOYEE_LIST_STRING });
   }
};
