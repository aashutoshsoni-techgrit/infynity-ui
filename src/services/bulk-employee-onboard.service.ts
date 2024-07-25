import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { authStore } from '@/src/context/AuthWrapper';

export const uploadBulkEmployeeData = async (formData: FormData): Promise<boolean | undefined> => {
   try {
      await httpService.post(`/employee/bulk-import`, formData, {
         'Content-Type': 'multipart/form-data'
      });
      toastService.showToast({ color: colours.success, title: 'Employees data has been uploaded' });
      return true;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: 'Failed to upload file' });
   }
};

export const getBulkUploadHistory = async () => {
   try {
      const response = await httpService.get(`/employee/bulk-import/history`);
      return response?.data?.data;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: 'Failed to fetch previous history' });
   }
};

export const downloadBulkUploadHistoryFile = async (fileLocation: string) => {
   window.open(fileLocation, '_blank');
};

export const getTopLevelEmployeeOfCompany = async () => {
   try {
      const response = await httpService.post(`/user/getTopLevelEmployeeOfCompany`, {
         tenantId: authStore.tenantId
      });
      return response?.data?.data;
   } catch (error) {
      throw new Error((error as Error).message);
   }
};
