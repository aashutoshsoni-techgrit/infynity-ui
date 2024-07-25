'use client';

import React from 'react';
import LogInWrapper from '@/src/containers/log-in/LogInWrapper';
import { Box, Button, Center, PasswordInput } from '@mantine/core';
import colours from '@/src/constants/palette';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
   loginFormData,
   passwordSetupFields,
   ResetPasswordType
} from '@/src/utils/login-form.utils';
import useAmplify from '@/src/hooks/useAmplify';
import toastService from '@/src/services/toast.service';

const ForgotPassword = ({
   userName,
   confirmation_code
}: {
   userName: string;
   confirmation_code: string;
}) => {
   const resetPasswordForm: UseFormReturnType<ResetPasswordType> = useForm(passwordSetupFields);
   const router = useRouter();

   const { confirmPassword, error } = useAmplify();

   const handleSaveClick = async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      loginFormData.password = resetPasswordForm.values['password'];

      if (resetPasswordForm.validate().hasErrors) {
         return;
      }

      const { password } = resetPasswordForm.values;

      if (await confirmPassword(userName, password, confirmation_code)) {
         toastService.showToast({
            color: colours.success,
            title: 'Password successfully updated.'
         });
         router.replace('/password-created?update=true');
      } else {
         toastService.showToast({ color: colours.error, title: 'Something went wrong.' });
      }
   };

   return (
      <LogInWrapper>
         <Box mt={20}>
            <h4 className={'text-h4 font-bold text-midnight-blue'}>Reset password</h4>
            <p>Choose a secure, unique password with a mix of characters.</p>
         </Box>
         <form autoComplete={'off'} className={'flex flex-col gap-y-3'} onSubmit={handleSaveClick}>
            <PasswordInput
               label={<p className={'text-base mb-1'}>Password</p>}
               placeholder={'*********'}
               size={'lg'}
               autoComplete={'off'}
               {...resetPasswordForm.getInputProps('password')}
            />
            <PasswordInput
               label={<p className={'text-base mb-1'}>Confirm password</p>}
               placeholder={'*********'}
               size={'lg'}
               autoComplete={'off'}
               {...resetPasswordForm.getInputProps('confirmPassword')}
            />
            <Button type={'submit'} color={colours.shadeBlue} size={'lg'} className={'mt-5'}>
               Save
            </Button>
            <Center>{error && <p className={'text-error'}>{error}</p>}</Center>
         </form>
      </LogInWrapper>
   );
};

export default ForgotPassword;
