import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { EMPLOYEE_PROFILE_STRING } from '../constants/server-errors';

const getEmployeeProfileData = async (id: string | string[]) => {
   try {
      const response = await httpService.get(`/employee/${id}`);
      return response?.data?.data;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: EMPLOYEE_PROFILE_STRING });
   }
};

export default getEmployeeProfileData;
