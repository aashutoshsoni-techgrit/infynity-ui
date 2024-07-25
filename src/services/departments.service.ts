/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { DEPARTMENT_STRINGS } from '../constants/server-errors';

export const getDepartments = async () => {
   try {
      const response = await httpService.get(`/department`);
      return response?.data?.data;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: DEPARTMENT_STRINGS.GET_DEPARTMENTS });
   }
};

export const getDepartmentById = async (departmentId: string) => {
   try {
      const response = await httpService.get(`/department/${departmentId}`);
      return response?.data?.data;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: 'Unable to fetch department' });
   }
};

export const addDepartment = async (formData: FormData) => {
   try {
      await httpService.post(`/department`, formData);
      return true;
   } catch (error: any) {
      if (error?.response?.data?.error === DEPARTMENT_STRINGS.IS_DEPARTMENT_NAME_ALREADY_EXITS) {
         toastService.showToast({
            color: colours.error,
            title: DEPARTMENT_STRINGS.IS_DEPARTMENT_NAME_ALREADY_EXITS
         });
      } else {
         toastService.showToast({ color: colours.error, title: 'Unable to add department' });
      }
   }
};

export const updateDepartment = async (departmentId: string, formData: FormData) => {
   try {
      await httpService.put(`/department/${departmentId}`, formData);
      return true;
   } catch (error) {
      toastService.showToast({
         color: colours.error,
         title: DEPARTMENT_STRINGS.UPDATE_DEPARTMENTS
      });
   }
};
