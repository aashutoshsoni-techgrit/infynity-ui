import React from 'react';
import LogIn from '@/src/containers/log-in';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Infynity | Login'
};

const LogInPage = () => <LogIn />;

export default LogInPage;
