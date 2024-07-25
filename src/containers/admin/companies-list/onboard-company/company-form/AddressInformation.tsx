import React from 'react';
import { Flex, TextInput } from '@mantine/core';
import { AddressInformationProps } from './company-form-details.types';

const AddressInformation: React.FC<AddressInformationProps> = ({
   companyForm,
   handleCharPress,
   handleDigitPress,
   handleFieldChange
}) => {
   return (
      <>
         <TextInput
            label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>Mailing Address</p>}
            placeholder={'4032 Big Elm'}
            size={'md'}
            {...companyForm.getInputProps('address')}
            onChange={async (event) => handleFieldChange('address', event.target.value)}
         />
         <Flex justify={'space-between'}>
            <TextInput
               label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>City</p>}
               placeholder={'San Francisco'}
               size={'md'}
               className={'w-[48%]'}
               onKeyDown={handleCharPress}
               {...companyForm.getInputProps('city')}
               onChange={async (event) => handleFieldChange('city', event.target.value)}
            />
            <TextInput
               label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>State</p>}
               placeholder={'CA'}
               size={'md'}
               className={'w-[48%]'}
               onKeyDown={handleCharPress}
               {...companyForm.getInputProps('state')}
               onChange={async (event) => handleFieldChange('state', event.target.value)}
            />
         </Flex>
         <Flex justify={'space-between'}>
            <TextInput
               label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>Country</p>}
               placeholder={'United States'}
               size={'md'}
               className={'w-[48%]'}
               onKeyDown={handleCharPress}
               {...companyForm.getInputProps('country')}
               onChange={async (event) => handleFieldChange('country', event.target.value)}
            />
            <TextInput
               label={<p className={'text-sm mb-1 text-black-x-light font-medium'}>Zip code</p>}
               placeholder={'94103'}
               size={'md'}
               className={'w-[48%]'}
               onKeyDown={handleDigitPress}
               {...companyForm.getInputProps('zipCode')}
               onChange={async (event) => handleFieldChange('zipCode', event.target.value)}
            />
         </Flex>
      </>
   );
};

export default AddressInformation;
