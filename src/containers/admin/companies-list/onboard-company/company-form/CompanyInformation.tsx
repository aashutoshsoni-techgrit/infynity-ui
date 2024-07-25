import React from 'react';
import { TextInput, Select } from '@mantine/core';
import { formatIndustryTypes } from '@/src/utils/string-format-utils';
import { industryTypes } from '@/src/utils/onboard-company-industry-types.utils';
import { Optional } from '@/src/components';
import { CompanyInformationProps } from './company-form-details.types';

const CompanyInformation: React.FC<CompanyInformationProps> = ({
   companyForm,
   handleFieldChange
}) => {
   return (
      <>
         <TextInput
            label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>Company Name</p>}
            placeholder={'Enter Company Name'}
            size={'md'}
            {...companyForm.getInputProps('companyName')}
            onChange={async (event) => handleFieldChange('companyName', event.target.value)}
         />
         <Select
            label={
               <p className={'text-sm mb-1 text-black-x-light font-medium'}>
                  Industry <Optional />
               </p>
            }
            placeholder={'Select Industry'}
            size={'md'}
            data={formatIndustryTypes(industryTypes)}
            {...companyForm.getInputProps('industry')}
            onChange={async (value: string | null) => {
               if (!value) {
                  return;
               }
               handleFieldChange('industry', value, false);
            }}
         />
      </>
   );
};

export default CompanyInformation;
