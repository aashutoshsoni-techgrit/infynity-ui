import React from 'react';
import { FileUpload } from '@/src/components';
import { Optional } from '@/src/components';
import { LogoUploadProps } from './company-form-details.types';

const LogoUpload: React.FC<LogoUploadProps> = ({ logo, onLogoUpload, onLogoDelete }) => {
   return (
      <FileUpload
         label={
            <p className={'text-sm font-medium mb-1 text-black-x-light'}>
               Logo <Optional />
            </p>
         }
         imageSrc={logo}
         onLogoDelete={onLogoDelete}
         onLogoUpload={onLogoUpload}
      />
   );
};

export default LogoUpload;
