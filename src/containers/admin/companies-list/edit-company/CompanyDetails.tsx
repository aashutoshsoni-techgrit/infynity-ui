import React, { useContext } from 'react';
import { Avatar, Box, Flex } from '@mantine/core';
import colours from '@/src/constants/palette';
import { Industry } from '@/src/containers/admin/companies-list/GridView';
import { MdOutlineEmail, MdOutlinePhone, MdLanguage } from 'react-icons/md';
import Link from 'next/link';
import UserCard from '@/src/containers/admin/companies-list/edit-company/UserCard';
import { CompanyEditContext } from '@/src/context/companies-view.context';
import { AuthContext } from '@/src/context/AuthWrapper';
import { UserTypes } from '@/src/constants';
import { formatPhoneNumber } from '@/src/utils/form-utils';

const CompanyDetails = () => {
   const { getEditCompany } = useContext(CompanyEditContext);
   const { getSignedInUser } = useContext(AuthContext);

   let signedInUser = null;
   if (getSignedInUser) {
      signedInUser = getSignedInUser()?.user;
   }
   const { userType } = signedInUser || {};

   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const company: any = getEditCompany?.();

   if (!company) {
      return <></>;
   }

   const formattedPhoneNumber = formatPhoneNumber(company.companyPhone, company.countryCode);

   return (
      <Flex className={'w-full'} direction={'column'} rowGap={20}>
         <Avatar src={company.logo} size={'lg'} />
         <Box>
            <h5 className={'text-h5 font-semibold text-black'}>{company.companyName}</h5>
            <p className={'text-base'}>
               {company.address}, {company.city}, {company.state}, {company.country},{' '}
               {company.zipCode}
            </p>
            {company?.industry && (
               <Box className={'mt-3'}>
                  <Industry industry={company.industry} />
               </Box>
            )}
         </Box>
         <Flex direction={'column'} rowGap={4}>
            <Flex align={'center'} columnGap={8}>
               <MdOutlineEmail color={colours.shadeBlue} />
               <p className={'underline'}>{company.companyEmail}</p>
            </Flex>
            {company.companyPhone && (
               <Flex align={'center'} columnGap={8}>
                  <MdOutlinePhone color={colours.shadeBlue} />
                  <p>
                     {formattedPhoneNumber
                        ? `${company.countryCode} ${formattedPhoneNumber}`
                        : formattedPhoneNumber}
                  </p>
               </Flex>
            )}
            <Link
               href={'www.google.com'}
               target={'_blank'}
               className={'flex items-center text-shade-blue'}
            >
               <MdLanguage color={colours.shadeBlue} />
               <p className={'ml-2'}>{company.website}</p>
            </Link>
         </Flex>
         {userType?.userType !== UserTypes.COMPANY_ADMIN && <UserCard user={company.rootUser} />}
      </Flex>
   );
};

export default CompanyDetails;
