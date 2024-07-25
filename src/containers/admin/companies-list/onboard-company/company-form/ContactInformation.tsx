import React from 'react';
import { Box, TextInput } from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import { Optional } from '@/src/components';
import { ContactInformationProps } from './company-form-details.types';

const ContactInformation: React.FC<ContactInformationProps> = ({
   companyForm,
   handlePhoneNumberChange,
   handleFieldChange
}) => {
   return (
      <>
         <Box>
            <p className={'text-sm font-medium mb-1 text-black-x-light'}>
               Company Phone <Optional />
            </p>
            <PhoneInput
               onChange={handlePhoneNumberChange}
               inputStyle={{ width: '100%', height: '2.7rem', borderRadius: '0.25rem' }}
               value={companyForm.values['companyPhone']}
               country={'us'}
            />
            {companyForm.errors.companyPhone && (
               <div className={'mt-1 text-error'}>
                  <label>{companyForm.errors.companyPhone}</label>
               </div>
            )}
         </Box>
         <TextInput
            label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>Email</p>}
            placeholder={'david@yourcompany.com'}
            size={'md'}
            {...companyForm.getInputProps('companyEmail')}
            onChange={async (event) => handleFieldChange('companyEmail', event.target.value)}
         />
         <TextInput
            label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>Website</p>}
            placeholder={'Eg. www.yourwebsite.com'}
            size={'md'}
            {...companyForm.getInputProps('website')}
            onChange={async (event) => handleFieldChange('website', event.target.value)}
         />
      </>
   );
};

export default ContactInformation;
