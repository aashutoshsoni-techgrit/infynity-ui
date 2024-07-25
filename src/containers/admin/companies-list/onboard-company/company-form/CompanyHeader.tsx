import React from 'react';
import { Flex } from '@mantine/core';
import { HeaderComponentProps } from './company-form-details.types';

const CompanyHeader: React.FC<HeaderComponentProps> = ({ isEdit }) => {
   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={30}>
         <h5 className={'text-h5 font-semibold text-midnight-blue'}>
            {isEdit ? 'Edit Company' : 'Add Company'}
         </h5>
         {isEdit && <h6 className={'text-h6 font-semibold text-midnight-blue'}>Company Details</h6>}
      </Flex>
   );
};

export default CompanyHeader;
