import React from 'react';
import LogInWrapper from '@/src/containers/log-in/LogInWrapper';
import colours from '@/src/constants/palette';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { Metadata } from 'next';
import { successIcon } from '@/src/constants/icons';

export const metadata: Metadata = {
   title: 'Infynity | Password updated'
};

const PasswordCreatedPage: React.FC<{
   searchParams: { update?: boolean };
}> = ({ searchParams }) => (
   <LogInWrapper>
      {successIcon}
      <h4 className={'text-h4 font-semibold text-midnight-blue'}>
         {/*{searchParams}*/}
         Password {searchParams.update ? 'updated' : 'created'} successfully
      </h4>
      <p>Please login to you account using your email and new password to continue.</p>
      <Link href={'/log-in'} replace>
         <Button color={colours.shadeBlue} size={'lg'} className={'mt-5'}>
            Login
         </Button>
      </Link>
   </LogInWrapper>
);

export default PasswordCreatedPage;
