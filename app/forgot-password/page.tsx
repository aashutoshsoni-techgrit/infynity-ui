import React from 'react';
import ResetPassword from '@/src/containers/log-in/ResetPassword';
import { Metadata } from 'next';
import LogIn from '@/src/containers/log-in';

export const metadata: Metadata = {
   title: 'Infynity | Forgot Password'
};

const ForgotPasswordPage: React.FC<{
   searchParams: { userName?: string; confirmation_code?: string };
}> = ({ searchParams }) => {
   return (
      <>
         {searchParams.userName && searchParams.confirmation_code ? (
            <ResetPassword
               userName={searchParams.userName}
               confirmation_code={searchParams.confirmation_code}
            />
         ) : (
            <LogIn />
         )}
      </>
   );
};

export default ForgotPasswordPage;
