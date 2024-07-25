import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';

const getCompanyDetails = async (XTenantId: string | null) => {
   if (!XTenantId) {
      throw new Error('Company tenant ID is required');
   }

   try {
      const response = await httpService.get(`/company/${XTenantId}`);
      return response?.data?.data;
      /* eslint-disable  @typescript-eslint/no-explicit-any */
   } catch (error: any) {
      toastService.showToast({ color: colours.error, title: error?.response?.data?.error });
   }
};

export default getCompanyDetails;
