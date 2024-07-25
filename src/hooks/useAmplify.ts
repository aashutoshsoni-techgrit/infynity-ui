import Amplify, { Auth } from 'aws-amplify';
import { useState, useCallback, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext, authStore } from '@/src/context/AuthWrapper';
import { encryptData } from '@/src/utils/crypto.utils';
import { authSessionStorageKey, userXTenantId } from '@/src/constants';
import httpService from '@/src/services/http.service';
import loaderService from '@/src/services/loader.service';

interface SignUpAttributes {
   [key: string]: string;
}

const useAmplify = () => {
   const router = useRouter();
   const [user, setUser] = useState(null);
   const [error, setError] = useState<string>('');
   const { setSignInUser } = useContext(AuthContext);

   const configureAmplify = useCallback(() => {
      Amplify.configure({
         Auth: {
            identityPoolId: process.env.NEXT_PUBLIC_REACT_APP_AMPLIFY_AUTH_IDENTITY_POOL_ID,
            userPoolId: process.env.NEXT_PUBLIC_REACT_APP_AMPLIFY_AUTH_USER_POOL_ID,
            userPoolWebClientId:
               process.env.NEXT_PUBLIC_REACT_APP_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID
         }
      });
   }, []);

   useEffect(() => {
      configureAmplify();
   }, [configureAmplify]);

   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const setErrorMessage = (error: any) => {
      const errorMessage =
         typeof error === 'object' && error !== null && 'message' in error && error.message
            ? error.message
            : 'Something went wrong';
      setError(String(errorMessage));
   };

   const signIn = useCallback(async (username: string, password: string) => {
      try {
         loaderService.showLoader();
         const signInUser = await Auth.signIn(username, password);

         setSignInUser?.({
            data: signInUser,
            username
         });

         if (signInUser?.challengeName == 'NEW_PASSWORD_REQUIRED') {
            router.replace('/create-new-password');
            return false;
         }

         if (typeof sessionStorage !== 'undefined') {
            authStore.jwtToken = signInUser?.signInUserSession?.idToken?.jwtToken;
            sessionStorage.setItem(authSessionStorageKey, encryptData(signInUser));
         }

         setUser(signInUser);
         setError('');

         const response = await httpService.get(`/user/loginByToken`);

         if (response?.status === 200) {
            authStore.tenantId = response?.data?.data?.tenantId;
            if (typeof sessionStorage !== 'undefined') {
               sessionStorage.setItem(userXTenantId, response?.data?.data?.tenantId);
            }
            setSignInUser?.({
               data: signInUser,
               username,
               user: response?.data?.data
            });
            return response?.data?.data;
         }
      } catch (signInError) {
         setErrorMessage(signInError);
      } finally {
         loaderService.hideLoader();
      }

      return null;
   }, []);

   const changePassword = useCallback(
      async (signInUser: unknown, oldPassword: string, newPassword: string) => {
         try {
            //const user = await Auth.currentAuthenticatedUser();
            const result = await Auth.changePassword(signInUser, oldPassword, newPassword);
            setError('');
            return result;
         } catch (changePasswordError) {
            setErrorMessage(changePasswordError);
            return null;
         }
      },
      []
   );

   const resetPassword = useCallback(async (username: string) => {
      try {
         await Auth.forgotPassword(username);
         setError('');
         return true;
      } catch (resetPasswordError) {
         setErrorMessage(resetPasswordError);
         return false;
      }
   }, []);

   const confirmPassword = useCallback(
      async (username: string, newPassword: string, code: string) => {
         try {
            await Auth.forgotPasswordSubmit(username, code, newPassword);
            setError('');
            return true;
         } catch (confirmPasswordError) {
            setErrorMessage(confirmPasswordError);
            return false;
         }
      },
      []
   );

   const signOut = useCallback(async () => {
      try {
         await Auth.signOut();
         setUser(null);
         setError('');
      } catch (signOutError) {
         setErrorMessage(signOutError);
      }
   }, []);

   const signUp = useCallback(
      async (username: string, password: string, attributes: SignUpAttributes = {}) => {
         try {
            const signUpUser = await Auth.signUp({
               username,
               password,
               attributes
            });
            return signUpUser;
         } catch (signUpError) {
            setErrorMessage(signUpError);
            return null;
         }
      },
      []
   );

   const confirmSignUp = useCallback(async (username: string, code: string) => {
      try {
         await Auth.confirmSignUp(username, code);
         setError('');
      } catch (confirmSignUpError) {
         setErrorMessage(confirmSignUpError);
      }
   }, []);

   return {
      user,
      error,
      signIn,
      signOut,
      changePassword,
      signUp,
      confirmSignUp,
      resetPassword,
      confirmPassword
   };
};

export default useAmplify;
