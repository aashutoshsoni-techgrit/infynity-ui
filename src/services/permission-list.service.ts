/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { authStore } from '../context/AuthWrapper';
import { PERMISSION_LIST_STRING } from '../constants/server-errors';

interface Permission {
   id: number;
   title: string;
   type: string;
}

interface TransformedData {
   [key: string]: {
      [id: number]: string;
   };
}

const fetchPermissions = async (): Promise<TransformedData> => {
   try {
      const response = await httpService.get(`/role/permission`, {
         headers: {
            'x-tenant-id': authStore.tenantId
         }
      });

      if (response?.data?.statusCode === 200) {
         const permissions: Permission[] = response.data.data.permissions;
         const transformedData: TransformedData = {};
         permissions.forEach((permission) => {
            const { id, title, type } = permission;
            const formattedTitle = title
               .replace(/-/g, ' ')
               .replace(/\b\w/g, (char) => char.toUpperCase());

            if (!transformedData[formattedTitle]) {
               transformedData[formattedTitle] = {};
            }

            transformedData[formattedTitle][id] = type.charAt(0).toUpperCase() + type.slice(1);
         });

         return transformedData;
      } else {
         throw new Error('Failed to fetch permissions');
      }
   } catch (error: any) {
      toastService.showToast({ color: colours.error, title: PERMISSION_LIST_STRING });
      return {};
   }
};

export default fetchPermissions;
