import React, { FC } from 'react';
import { Avatar, Box, Flex, Grid, Menu } from '@mantine/core';
import { CompanyEditProps, industryColors } from '@/src/utils/company-list.utils';
import colours from '@/src/constants/palette';
import {
   MdOutlineEmail,
   MdOutlineMoreVert,
   MdOutlinePhone,
   MdDocumentScanner
} from 'react-icons/md';
import { CompanyProps } from './company-list.types';
import { formatPhoneNumber } from '@/src/utils/form-utils';

export const User: FC<CompanyProps> = ({ title, subtitle, profilePhoto, center = true }) => (
   <Box className={`flex ${center ? 'items-center' : 'items-start'} gap-x-3 w-full`}>
      <Avatar src={profilePhoto} />
      <Box className={'w-full'}>
         <h6 className={'text-h6 font-semibold text-black truncate max-w-[90%]'}>{title}</h6>
         {subtitle && <p className={'text-sm mt-1 max-w-[80%] truncate'}>{subtitle}</p>}
      </Box>
   </Box>
);

export const Industry: FC<{ industry: string }> = ({ industry }) => {
   const colors = Object.keys(industryColors);
   const color: number = Math.floor(Math.random() * colors.length);
   const industryColor: string = industryColors[colors[color]];
   const formattedIndustry: string = industry?.charAt(0) + industry?.substring(1)?.toLowerCase();

   return (
      <span className={'inline-block bg-grey-4x-light max-w-[80%] px-2 py-1 rounded'}>
         <p className={'text-xs font-semibold truncate'} style={{ color: industryColor }}>
            {formattedIndustry}
         </p>
      </span>
   );
};

const GridView: FC<CompanyEditProps> = ({ companies, setViewCompany }) => {
   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const handleItemClick = (company: any) => {
      setViewCompany?.({ ...company });
   };

   return (
      <Grid>
         {companies?.map?.((company, index: number) => {
            const formattedPhoneNumber = formatPhoneNumber(
               company?.companyPhone,
               company?.countryCode
            );

            return (
               <Grid.Col span={{ base: 12, xs: 12, md: 6, lg: 4, xl: 3 }} key={index}>
                  <Flex
                     direction={'column'}
                     justify={'space-between'}
                     className={
                        'bg-white w-full p-5 pl-6 rounded-[0.7rem] flex shadow-sm hover:shadow min-h-[12.4rem] max-h-[12.4rem]'
                     }
                  >
                     <Flex direction={'column'} rowGap={16}>
                        <Flex justify={'space-between'} align={'flex-start'}>
                           <User
                              title={company.companyName}
                              subtitle={`${company.city}, ${company.zipCode}`}
                              profilePhoto={company.logo}
                              center={false}
                           />
                           <Flex align={'center'} columnGap={8}>
                              <Menu shadow={'md'} position={'bottom-end'}>
                                 <Menu.Target>
                                    <Box
                                       className={
                                          'inline-block hover:bg-grey-4x-light rounded-[50%] p-1'
                                       }
                                    >
                                       <MdOutlineMoreVert size={20} className={'cursor-pointer'} />
                                    </Box>
                                 </Menu.Target>
                                 <Menu.Dropdown>
                                    <Menu.Item
                                       leftSection={
                                          <MdDocumentScanner color={colours.grey} size={16} />
                                       }
                                       onClick={() => handleItemClick(company)}
                                    >
                                       <p className={'text-base text-grey'}>View Details</p>
                                    </Menu.Item>
                                 </Menu.Dropdown>
                              </Menu>
                           </Flex>
                        </Flex>
                        <Box>
                           <Flex align={'center'}>
                              <MdOutlineEmail
                                 className={'min-w-[0.875rem]'}
                                 color={colours.shadeBlue}
                              />
                              <p className={'text-sm ml-2 underline truncate max-w-[80%]'}>
                                 {company.companyEmail}
                              </p>
                           </Flex>
                           {company.countryCode && (
                              <Flex align={'center'} mt={4}>
                                 <MdOutlinePhone
                                    className={'min-w-[0.875rem]'}
                                    color={colours.shadeBlue}
                                 />
                                 <p className={'text-sm ml-2'}>
                                    {formattedPhoneNumber
                                       ? `${company.countryCode} ${formattedPhoneNumber}`
                                       : formattedPhoneNumber}
                                 </p>
                              </Flex>
                           )}
                        </Box>
                     </Flex>
                     <Flex align={'center'} justify={'space-between'} columnGap={8}>
                        {company.industry ? (
                           <Industry industry={company.industry} />
                        ) : (
                           <span tabIndex={-1} />
                        )}
                        <Avatar className={'cursor-pointer'} />
                     </Flex>
                  </Flex>
               </Grid.Col>
            );
         })}
      </Grid>
   );
};

export default GridView;
