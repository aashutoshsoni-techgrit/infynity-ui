import { authSessionStorageKey, userXTenantId } from '@/src/constants';
import { authStore } from '@/src/context/AuthWrapper';

const clearCurrentUserData = () => {
   sessionStorage.removeItem(authSessionStorageKey);
   sessionStorage.removeItem(userXTenantId);
   authStore.jwtToken = '';
   authStore.tenantId = '';
   window.location.href = '/';
};

export default clearCurrentUserData;
