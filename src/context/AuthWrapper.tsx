'use client';

import React, { FC, createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { usePathname, redirect } from 'next/navigation';
import {
   authSessionStorageKey,
   PageModules,
   pageModulePermission,
   publicRoutes,
   userXTenantId
} from '@/src/constants';
import { decryptData } from '@/src/utils/crypto.utils';
import httpService from '@/src/services/http.service';

export interface UserType {
   id: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
   userType: string;
}

export interface Permission {
   title: string;
   type: string;
   isActive: boolean;
}

export interface UserRolesAndPermission {
   permissions: Permission[];
}
export interface User {
   id: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
   firstName: string;
   lastName: string;
   gender: string;
   email: string;
   phone: string;
   userType: UserType;
   tenantId: string | null;
   userRolesAndPermission?: UserRolesAndPermission[];
}
interface PathtoModule {
   [key: string]: string;
}

type SignedInUserType = { data?: { challengeName?: string }; username?: string; user?: User };

export interface AuthContextType {
   getSignedInUser?: () => SignedInUserType | null;
   setSignInUser?: Dispatch<SetStateAction<SignedInUserType | null>>;
   hasPermission?: (title: string, type: string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({});

export const authStore = {
   tenantId: '',
   jwtToken: ''
};

const pathPermissionKeys: PathtoModule = {
   '/employees': PageModules.EMPLOYEE,
   '/roles': PageModules.ROLES
};

export const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
   const pathName = usePathname();
   const sessionData =
      typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(authSessionStorageKey) : null;
   const sessionUser = sessionData ? decryptData(sessionData) : null;
   const [signedInUser, setSignInUser] = useState<SignedInUserType | null>(sessionUser);

   const getSignedInUser = (): SignedInUserType | null => signedInUser;

   const userHasPermission = (module: string, operation: string): boolean => {
      const userRolesAndPermissions = signedInUser?.user?.userRolesAndPermission;
      return !!userRolesAndPermissions?.some((userRolesAndPermission) =>
         userRolesAndPermission?.permissions?.some(({ isActive, title, type }) => {
            return isActive && title === module && type === operation;
         })
      );
   };

   if (typeof sessionStorage !== 'undefined' && !signedInUser && !publicRoutes.includes(pathName)) {
      redirect('/log-in');
   }

   if (
      signedInUser?.user &&
      pathPermissionKeys[pathName] &&
      !userHasPermission(pathPermissionKeys[pathName], pageModulePermission.VIEW)
   ) {
      redirect('/unauthorized');
   }

   const refreshLoginUser = async () => {
      const response = await httpService.get(`/user/loginByToken`);

      if (response?.status === 200) {
         authStore.tenantId = response?.data?.data?.tenantId;
         if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(userXTenantId, response?.data?.data?.tenantId);
         }
         setSignInUser?.({
            data: sessionUser,
            user: response?.data?.data
         });
      }
   };

   if (signedInUser) {
      authStore.tenantId = sessionStorage.getItem(userXTenantId) ?? '';
      authStore.jwtToken = sessionUser?.signInUserSession?.idToken?.jwtToken;
      if (!signedInUser.user && !publicRoutes.includes(pathName)) {
         refreshLoginUser();
      }
   }

   return (
      <AuthContext.Provider
         value={{ getSignedInUser, setSignInUser, hasPermission: userHasPermission }}
      >
         {children}
      </AuthContext.Provider>
   );
};
