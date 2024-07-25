/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex } from '@mantine/core';
import { MdImage } from 'react-icons/md';
import colours from '@/src/constants/palette';

interface FileUploadProps {
   imageSrc: File | null | string;
   label: string | ReactNode;
   onLogoDelete: () => void;
   onLogoUpload: (event: ChangeEvent<HTMLInputElement>) => void;
   accept?: string;
}

const FileUpload: FC<FileUploadProps> = ({
   imageSrc,
   label,
   onLogoDelete,
   onLogoUpload,
   accept = '.png,.jpg,.jpeg'
}) => {
   const logoInputRef = useRef<HTMLInputElement | null>(null);
   const [image, setImage] = useState<any>(null);

   const handleLogoUploadClick = () => {
      logoInputRef?.current && logoInputRef.current?.click();
   };

   useEffect(() => {
      if (typeof imageSrc === 'string') {
         setImage(imageSrc);
      } else {
         if (!imageSrc) {
            return setImage(null);
         }
         const file: any = imageSrc;
         const reader = new FileReader();

         reader.onload = function (event: any) {
            const base64String = event.target.result;
            setImage(base64String);
         };
         reader.readAsDataURL(file);
      }
   }, [imageSrc]);

   return (
      <Box>
         {label}
         <Flex
            align={'center'}
            columnGap={20}
            pl={24}
            className={'w-full h-28 rounded border border-solid border-grey-3x-light'}
         >
            <Flex
               align={'center'}
               justify={'center'}
               className={
                  'rounded-[0.5rem] w-[4.5rem] h-[60%] border border-solid border-grey-3x-light'
               }
               onClick={handleLogoUploadClick}
            >
               {imageSrc ? (
                  <img src={image} className={'w-[85%] h-[85%] rounded-[0.5rem]'} alt={'Logo'} />
               ) : (
                  <MdImage size={30} />
               )}
            </Flex>
            <input
               type={'file'}
               ref={logoInputRef}
               tabIndex={-1}
               onChange={onLogoUpload}
               accept={accept}
               hidden
            />
            <Flex columnGap={12}>
               <Button
                  variant={'outline'}
                  color={colours.shadeBlue}
                  size={'compact-sm'}
                  onClick={handleLogoUploadClick}
               >
                  {imageSrc ? 'Replace' : 'Upload'}
               </Button>
               {imageSrc && (
                  <Button
                     variant={'outline'}
                     color={colours.error}
                     size={'compact-sm'}
                     onClick={onLogoDelete}
                  >
                     Delete
                  </Button>
               )}
            </Flex>
         </Flex>
      </Box>
   );
};

export default FileUpload;
