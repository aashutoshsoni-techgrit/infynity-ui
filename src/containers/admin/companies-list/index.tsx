'use client';

import React, { useState, useEffect } from 'react';
import { InfynityAdminWrapper } from '@/src/components';
import OnboardCompany from '@/src/containers/admin/companies-list/onboard-company';
import { CompaniesView } from '@/src/utils/onboard-company-form.utils';
import { Box, Button, Flex, Select, TextInput } from '@mantine/core';
import { MdOutlineSearch } from 'react-icons/md';
import colours from '@/src/constants/palette';
import ViewCompanies from '@/src/containers/admin/companies-list/ViewCompanies';
import { companiesSortBy } from '@/src/utils/company-list.utils';
import fetchCompanies from '@/src/services/company-list.service';
import { CompaniesViewContext } from '@/src/context/companies-view.context';
import { useQuery } from '@tanstack/react-query';
import { gridViewIcon, listViewIcon } from '@/src/constants/icons';

const CompaniesList = () => {
   const [isActive, setActive] = useState<boolean>(true);
   const [companiesView, setCompaniesView] = useState<number>(CompaniesView.CARD_VIEW);
   const [reFetch, setCompaniesFetch] = useState<{ fetch: boolean }>({ fetch: true });

   const { data: companies, refetch } = useQuery({
      queryFn: async () => await fetchCompanies(),
      queryKey: ['companies']
   });

   useEffect(() => {
      if (reFetch.fetch) {
         refetch();
         setCompaniesFetch({ fetch: false });
      }
   }, [reFetch, refetch]);

   const handleActiveItemsClick = (isActive: boolean) => setActive(isActive);

   const handleCompaniesViewClick = (view: number) => setCompaniesView(view);

   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const activeCompanies = companies?.filter?.((company: any) => company.isActive) ?? [];
   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const inActiveCompanies = companies?.filter?.((company: any) => !company.isActive) ?? [];

   const applySelectedColor = (isSelected: boolean) => ({
      filter: isSelected
         ? 'brightness(0) invert(1)'
         : 'invert(47%) sepia(76%) saturate(3033%) hue-rotate(210deg) brightness(96%) contrast(101%)'
   });

   return (
      <InfynityAdminWrapper pageTitle={'List of Companies'}>
         <CompaniesViewContext.Provider value={{ setCompaniesFetch }}>
            <Flex justify={'space-between'}>
               <Flex columnGap={24} align={'center'}>
                  <Box
                     className={`inline-flex items-center gap-x-2 font-semibold cursor-pointer ${isActive ? 'text-midnight-blue' : ''}`}
                     onClick={() => handleActiveItemsClick(true)}
                  >
                     <h5 className={'text-h5'}>Active</h5>
                     <h6 className={'text-base mt-0.5'}>{activeCompanies?.length ?? 0}</h6>
                  </Box>
                  <Box
                     className={`inline-flex items-center gap-x-2 font-semibold cursor-pointer ${!isActive ? 'text-midnight-blue' : ''}`}
                     onClick={() => handleActiveItemsClick(false)}
                  >
                     <h5 className={'text-h5'}>Inactive</h5>
                     <h6 className={'text-base mt-0.5'}>{inActiveCompanies?.length ?? 0}</h6>
                  </Box>
               </Flex>
               <Flex columnGap={16}>
                  <Box>
                     <Button
                        size={'md'}
                        pl={12}
                        pr={12}
                        bg={companiesView === CompaniesView.CARD_VIEW ? colours.shadeBlue : 'white'}
                        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        onClick={() => handleCompaniesViewClick(CompaniesView.CARD_VIEW)}
                     >
                        <Box style={applySelectedColor(companiesView === CompaniesView.CARD_VIEW)}>
                           {gridViewIcon}
                        </Box>
                     </Button>
                     <Button
                        size={'md'}
                        pl={14}
                        pr={14}
                        bg={companiesView === CompaniesView.LIST_VIEW ? colours.shadeBlue : 'white'}
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        onClick={() => handleCompaniesViewClick(CompaniesView.LIST_VIEW)}
                     >
                        <Box style={applySelectedColor(companiesView === CompaniesView.LIST_VIEW)}>
                           {listViewIcon}
                        </Box>
                     </Button>
                  </Box>
                  <Select
                     size={'md'}
                     className={'w-32'}
                     placeholder={'Sort by'}
                     data={companiesSortBy}
                     styles={() => ({
                        input: {
                           border: 0
                        }
                     })}
                  />
                  <TextInput
                     size={'md'}
                     leftSection={<MdOutlineSearch size={18} />}
                     placeholder={'Search Companies'}
                     className={'w-[18.5rem]'}
                     styles={() => ({
                        input: {
                           border: 0
                        }
                     })}
                  />
                  <OnboardCompany />
               </Flex>
            </Flex>
            <ViewCompanies
               view={companiesView}
               companies={isActive ? activeCompanies : inActiveCompanies}
            />
         </CompaniesViewContext.Provider>
      </InfynityAdminWrapper>
   );
};

export default CompaniesList;
