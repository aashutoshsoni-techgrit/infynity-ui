import React from 'react';
import CreateNewPassword from '@/src/containers/log-in/CreateNewPassword';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Infynity | Create new password'
};

const CreateNewPasswordPage = () => <CreateNewPassword />;

export default CreateNewPasswordPage;
