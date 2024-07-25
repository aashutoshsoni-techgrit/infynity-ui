import React, { FC } from 'react';
import { Box, Flex, Grid } from '@mantine/core';
import { User, Industry } from '@/src/containers/admin/companies-list/GridView';
import { CompanyEditProps } from '@/src/utils/company-list.utils';
import { formatPhoneNumber } from '@/src/utils/form-utils';

const ListView: FC<CompanyEditProps> = ({ companies, setViewCompany }) => {
   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const handleCompanyItemClick = (company: any) => {
      setViewCompany?.({ ...company });
   };

   return (
      <Box>
         <Grid className={'bg-grey-4x-light rounded-[0.8rem] mb-5'}>
            <Grid.Col span={2.9} pl={64}>
               <p className={'font-semibold text-black'}>Company</p>
            </Grid.Col>
            <Grid.Col span={2.6}>
               <p className={'font-semibold text-black'}>Address</p>
            </Grid.Col>
            <Grid.Col span={2.3}>
               <p className={'font-semibold text-black'}>Industry</p>
            </Grid.Col>
            <Grid.Col span={2.7}>
               <p className={'font-semibold text-black'}>Email address</p>
            </Grid.Col>
            <Grid.Col span={1.5}>
               <p className={'font-semibold text-black'}>Phone</p>
            </Grid.Col>
         </Grid>
         {companies?.map?.((company, index: number) => {
            const formattedPhoneNumber = formatPhoneNumber(
               company?.companyPhone,
               company?.countryCode
            );
            return (
               <Grid
                  className={
                     'bg-white my-3 py-4 rounded-[0.8rem] shadow-sm hover:shadow cursor-pointer'
                  }
                  key={index}
                  onClick={() => handleCompanyItemClick(company)}
               >
                  <Grid.Col span={2.9} pl={34}>
                     <Flex align={'center'} pr={8} className={'h-full'}>
                        <User title={company.companyName} profilePhoto={company.logo} />
                     </Flex>
                  </Grid.Col>
                  <Grid.Col span={2.6}>
                     <Flex align={'center'} pr={8} className={'h-full'}>
                        <p className={'text-sm mt-1 truncate'}>
                           {company.city}, {company.zipCode}
                        </p>
                     </Flex>
                  </Grid.Col>
                  <Grid.Col span={2.3}>
                     {company.industry && (
                        <Flex align={'center'} pr={8} className={'h-full'}>
                           <Industry industry={company.industry} />
                        </Flex>
                     )}
                  </Grid.Col>
                  <Grid.Col span={2.7}>
                     <Flex align={'center'} pr={8} className={'h-full'}>
                        <p className={'text-sm underline truncate'}>{company.companyEmail}</p>
                     </Flex>
                  </Grid.Col>
                  <Grid.Col span={1.5}>
                     <Flex align={'center'} pr={4} className={'h-full'}>
                        <p className={'text-sm'}>
                           {formattedPhoneNumber
                              ? `${company.countryCode} ${formattedPhoneNumber}`
                              : formattedPhoneNumber}
                        </p>
                     </Flex>
                  </Grid.Col>
               </Grid>
            );
         })}
      </Box>
   );
};

export default ListView;
