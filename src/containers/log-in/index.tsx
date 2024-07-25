'use client';

import React, { useEffect } from 'react';
import { Box, Button, Center, Flex, PasswordInput, TextInput } from '@mantine/core';
import colours from '@/src/constants/palette';
import { MdEmail, MdLock } from 'react-icons/md';
import LogInWrapper from '@/src/containers/log-in/LogInWrapper';
import { useForm, UseFormReturnType } from '@mantine/form';
import { loginFormData, loginFormFields, LoginFormType } from '@/src/utils/login-form.utils';
import useAmplify from '@/src/hooks/useAmplify';
import { useRouter } from 'next/navigation';
import toastService from '@/src/services/toast.service';
import { UserTypes } from '@/src/constants';
import httpService from '@/src/services/http.service';

const LogIn = () => {
   const { signIn, resetPassword, error } = useAmplify();
   const logInForm: UseFormReturnType<LoginFormType> = useForm(loginFormFields);
   const router = useRouter();

   useEffect(() => {
      loginFormData.isInCorrectCredentials = error === 'Incorrect username or password.';

      if (error) {
         logInForm.validate();
      }
   }, [error]);

   const handleLoginFormSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      loginFormData.isInCorrectCredentials = false;

      if (logInForm.validate().hasErrors) {
         return;
      }

      const { email, password } = logInForm.values;
      const user = await signIn(email, password);

      if (user) {
         if (user.userType.userType === UserTypes.INFYNITY_ADMIN) {
            router.replace('/admin/dashboard');
         } else if (user.userType.userType === UserTypes.COMPANY_ADMIN) {
            router.replace('/employees');
         }
      } else {
         if (error) {
            toastService.showToast({ color: colours.error, title: error });
         }
      }
   };

   const handleForgotPassword = async () => {
      loginFormData.inCorrectEmail = false;

      if (logInForm.validateField('email').hasError) {
         return;
      }

      const { email } = logInForm.values;

      try {
         const response = await httpService.post('/user/getPublicSchemaUserByEmail', { email });

         if (!response?.data?.data) {
            loginFormData.inCorrectEmail = true;
            logInForm.validateField('email');
            return;
         }
      } catch (error) {
         toastService.showToast({
            color: colours.success,
            title: 'Unable to reach the server'
         });
      }

      if (await resetPassword(email)) {
         toastService.showToast({
            color: colours.success,
            title: 'A reset password link sent to given email.'
         });
      } else {
         toastService.showToast({ color: colours.error, title: 'Something went wrong.' });
      }
   };

   return (
      <LogInWrapper>
         <Box mt={20}>
            <h4 className={'text-h4 font-bold text-midnight-blue'}>Welcome</h4>
            <p>Please use your email address to continue</p>
         </Box>
         <form
            autoComplete={'off'}
            className={'flex flex-col gap-y-3'}
            onSubmit={handleLoginFormSubmit}
         >
            <TextInput
               label={<p className={'text-base mb-1'}>Email address</p>}
               placeholder={'jamesbrown@company.com'}
               size={'lg'}
               leftSection={<MdEmail size={16} color={colours.grey3XLight} />}
               autoComplete={'off'}
               {...logInForm.getInputProps('email')}
            />
            <PasswordInput
               label={<p className={'text-base mb-1'}>Password</p>}
               placeholder={'*********'}
               size={'lg'}
               leftSection={<MdLock size={16} color={colours.grey3XLight} />}
               autoComplete={'off'}
               {...logInForm.getInputProps('password')}
            />
            <Flex justify={'flex-end'}>
               <p
                  onClick={handleForgotPassword}
                  className={'underline cursor-pointer text-shade-blue'}
               >
                  Forgot password?
               </p>
            </Flex>
            <Button type={'submit'} color={colours.shadeBlue} size={'lg'} className={'mt-5'}>
               Login
            </Button>
            <Center>{error && <p className={'text-error'}>{error}</p>}</Center>
         </form>
      </LogInWrapper>
   );
};

export default LogIn;
