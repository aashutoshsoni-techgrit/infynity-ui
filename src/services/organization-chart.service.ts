import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { ORGANIZATION_CHART_STRINGS } from '../constants/server-errors';

export const getOrganizationChartData = async () => {
   try {
      const response = await httpService.get(`/org-chart`);
      return response?.data?.data;
   } catch (error) {
      toastService.showToast({
         color: colours.error,
         title: ORGANIZATION_CHART_STRINGS.GET_ORGANIZATION_CHART_DATA
      });
   }
};

export const addEmployeeToOrgChart = async (formData: FormData) => {
   try {
      await httpService.post(`/employee/addEmployeeToOrgChart`, formData);
      return true;
   } catch (error) {
      toastService.showToast({
         color: colours.error,
         title: ORGANIZATION_CHART_STRINGS.ADD_EMPLOYEE_TO_ORG_CHART
      });
   }
};
