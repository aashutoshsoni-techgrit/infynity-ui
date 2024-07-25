import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { Vision } from '../containers/vision-statement/vision-types';

export const fetchVisionData = async () => {
   try {
      const response = await httpService.get('/vision');
      const data = response?.data?.data?.vision;
      return data;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: 'Error fetching vision data' });
   }
};

export const updateVisionData = async (updatedVisionStatement: Vision[]) => {
   try {
      await httpService.put('/vision', updatedVisionStatement);
      toastService.showToast({ color: colours.success, title: 'Vision statement updated' });
   } catch (error) {
      toastService.showToast({
         color: colours.error,
         title: 'Error updating Vision statement'
      });
   }
};

export const addVisionData = async (updatedVisionStatement: Vision[]) => {
   try {
      await httpService.post('/vision', updatedVisionStatement);
      toastService.showToast({
         color: colours.success,
         title: 'Vision statement added successfully'
      });
   } catch (error) {
      toastService.showToast({
         color: colours.error,
         title: 'Error adding Vision statement'
      });
   }
};
