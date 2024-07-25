'use client';

import React, { useContext, useState } from 'react';
import LogInWrapper from '@/src/containers/log-in/LogInWrapper';
import { Box, Button, Flex, PasswordInput } from '@mantine/core';
import colours from '@/src/constants/palette';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
   CreateNewPasswordFormType,
   passwordSetupFields,
   isValidPassword
} from '@/src/utils/login-form.utils';
import { Auth } from 'aws-amplify';
import { AuthContext } from '@/src/context/AuthWrapper';
import loaderService from '@/src/services/loader.service';
import { PasswordSuccessIcon } from '@/src/constants/icons';

const CreateNewPassword = () => {
   const createPasswordForm: UseFormReturnType<CreateNewPasswordFormType> =
      useForm(passwordSetupFields);
   const { getSignedInUser } = useContext(AuthContext);
   const router = useRouter();

   const [errors, setErrors] = useState({
      password: null as string | null,
      confirmPassword: null as string | null
   });

   const isButtonDisabled = () => {
      const { password, confirmPassword } = createPasswordForm.values;
      return !(
         password &&
         confirmPassword &&
         !errors.password &&
         !errors.confirmPassword &&
         password === confirmPassword
      );
   };

   const validatePassword = (password: string) => {
      const errorMessage = isValidPassword(password);
      setErrors((prev) => ({ ...prev, password: errorMessage || null }));
   };

   const validateConfirmPassword = (password: string, confirmPassword: string) => {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
      if (password !== confirmPassword) {
         setErrors((prev) => ({ ...prev, confirmPassword: 'Confirm password is not matching' }));
      }
   };

   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const password = event.target.value;
      createPasswordForm.setFieldValue('password', password);
      validatePassword(password);

      if (createPasswordForm.values.confirmPassword) {
         validateConfirmPassword(password, createPasswordForm.values.confirmPassword);
      }
   };

   const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const confirmPassword = event.target.value;
      createPasswordForm.setFieldValue('confirmPassword', confirmPassword);
      validateConfirmPassword(createPasswordForm.values.password, confirmPassword);
   };

   const handleSaveClick = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         loaderService.showLoader();
         await Auth.completeNewPassword(
            getSignedInUser?.()?.data,
            String(createPasswordForm.values['password'])
         );
         router.replace('/password-created');
      } finally {
         loaderService.hideLoader();
      }
   };

   return (
      <LogInWrapper>
         <Box mt={20}>
            <h4 className='text-h4 font-bold text-midnight-blue'>Create new password</h4>
            <p>
               Create a secure & unique password using a combination of at least 8 characters
               including One Uppercase, One Lowercase, One Digit and One Special Character
            </p>
         </Box>
         <form autoComplete='off' className='flex flex-col gap-y-3' onSubmit={handleSaveClick}>
            <Flex direction='column' rowGap={4}>
               <p className='text-base'>Password</p>
               <div className='relative'>
                  <PasswordInput
                     placeholder='*********'
                     size='lg'
                     autoComplete='off'
                     {...createPasswordForm.getInputProps('password')}
                     onChange={handlePasswordChange}
                     maxLength={21}
                  />
                  {errors.password && <p className='text-sm text-error mt-1'>{errors.password}</p>}
                  {errors.password === null && createPasswordForm.values.password && (
                     <Flex
                        align='center'
                        className='h-full absolute top-1/2 -translate-y-1/2 right-11'
                     >
                        {PasswordSuccessIcon}
                     </Flex>
                  )}
               </div>
            </Flex>
            <Flex direction='column' rowGap={4}>
               <p className='text-base'>Confirm password</p>
               <div className='relative'>
                  <PasswordInput
                     placeholder='*********'
                     size='lg'
                     autoComplete='off'
                     {...createPasswordForm.getInputProps('confirmPassword')}
                     onChange={handleConfirmPasswordChange}
                     maxLength={21}
                  />
                  {errors.confirmPassword && (
                     <p className='text-sm text-error mt-1'>{errors.confirmPassword}</p>
                  )}
                  {errors.confirmPassword === null && createPasswordForm.values.confirmPassword && (
                     <Flex
                        align='center'
                        className='h-full absolute top-1/2 -translate-y-1/2 right-11'
                     >
                        {PasswordSuccessIcon}
                     </Flex>
                  )}
               </div>
            </Flex>
            <Button
               type='submit'
               color={colours.shadeBlue}
               size='lg'
               className='mt-6'
               disabled={isButtonDisabled()}
            >
               Save
            </Button>
         </form>
      </LogInWrapper>
   );
};

export default CreateNewPassword;
