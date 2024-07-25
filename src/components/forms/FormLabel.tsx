import React from 'react';
import { Tooltip, Button, Flex } from '@mantine/core';
import { infoOutlineIcon } from '@/src/constants/icons';
import Optional from '../Optional';
import { FormLabelProps } from '../components.types';

const FormLabel: React.FC<FormLabelProps> = ({ label, info, optional }) => {
   return (
      <Flex align={'center'} columnGap={6}>
         <p className={`text-sm ${info ? 'mb-0' : 'mb-1'} text-black-x-light font-medium`}>
            {label} {optional && <Optional />}{' '}
            {info && (
               <Tooltip
                  label={info}
                  position={'right'}
                  arrowSize={8}
                  withArrow
                  className={'max-w-[25rem]'}
                  multiline
               >
                  <Button variant={'transparent'} p={0} className={'cursor-pointer m-0'} size='xs'>
                     {infoOutlineIcon}
                  </Button>
               </Tooltip>
            )}
         </p>
      </Flex>
   );
};

export default FormLabel;
