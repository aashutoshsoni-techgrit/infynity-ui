import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import httpService from '@/src/services/http.service';
import { ROLES_STRINGS } from '../constants/server-errors';

export const getRoles = async () => {
   try {
      const response = await httpService.get(`/role`);
      return response?.data.data.allRoles;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: ROLES_STRINGS.GET_ROLES });
   }
};

export const getEmployeesToAssignRoles = async () => {
   try {
      const response = await httpService.get(`/employee`);
      return response?.data?.data.map(
         (employee: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            title: string;
            profilePhoto: string;
         }) => ({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            emailId: employee.email,
            role: employee.title,
            avatar: employee.profilePhoto ? employee.profilePhoto : '/images/iu.png'
         })
      );
   } catch (error) {
      toastService.showToast({
         color: colours.error,
         title: 'Unable to fetch employees to assign roles'
      });
   }
};

export const getRolesDetails = async (roleId: string) => {
   try {
      const response = await httpService.get(`/role/${roleId}`);
      return response?.data?.data;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: ROLES_STRINGS.GET_ROLES_DETAILS });
   }
};

export const assignRoles = async (roleId: string, formData: FormData) => {
   try {
      await httpService.put(`role/${roleId}/attach-users`, formData);
      return true;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: ROLES_STRINGS.ASSIGN_ROLES });
   }
};
