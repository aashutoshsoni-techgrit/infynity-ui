import React from 'react';
import { Box, Flex } from '@mantine/core';
import { ProgressBar } from '@/src/components';
import { OnboardCompanyForms } from '@/src/utils/onboard-company-form.utils';
import { ProgressBarProps } from './company-form-details.types';

const CompanyProgressBar: React.FC<ProgressBarProps> = ({
   currentForm,
   companyFormProgress,
   userFormProgress
}) => {
   return (
      <Flex direction={'column'} rowGap={28}>
         <Flex justify={'space-between'} className={'w-full'}>
            <Box className={'w-[48%]'}>
               <ProgressBar
                  label={
                     <small
                        className={
                           currentForm === OnboardCompanyForms.COMPANY_FORM ? 'text-shade-blue' : ''
                        }
                     >
                        Company Details
                     </small>
                  }
                  progress={companyFormProgress}
               />
            </Box>
            <Box className={'w-[48%]'}>
               <ProgressBar
                  label={
                     <small
                        className={
                           currentForm === OnboardCompanyForms.USER_FORM ? 'text-shade-blue' : ''
                        }
                     >
                        Root User Details
                     </small>
                  }
                  progress={userFormProgress}
               />
            </Box>
         </Flex>
      </Flex>
   );
};

export default CompanyProgressBar;
