/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import { CompaniesView, onboardFromData } from '@/src/utils/onboard-company-form.utils';
import GridView from '@/src/containers/admin/companies-list/GridView';
import ListView from '@/src/containers/admin/companies-list/ListView';
import { Box, Button, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MdCreate } from 'react-icons/md';
import colours from '@/src/constants/palette';
import EditCompany from '@/src/containers/admin/companies-list/edit-company';
import CompanyDetails from '@/src/containers/admin/companies-list/edit-company/CompanyDetails';
import { CompanyEditContext } from '@/src/context/companies-view.context';
import { ViewCompaniesProps } from './company-list.types';

const ViewCompanies: FC<ViewCompaniesProps> = ({ view, companies }) => {
   const [viewCompany, setViewCompany] = useState<any>();
   const [opened, { open, close }] = useDisclosure(false);
   const [showEditForm, setEditForm] = useState<boolean>(false);

   const getEditCompany = () => viewCompany;

   useEffect(() => {
      if (!viewCompany) {
         return;
      }

      setEditForm(false);
      open();
   }, [viewCompany]);

   const handleFormClose = () => {
      onboardFromData.company = null;
      onboardFromData.user = null;
      setViewCompany(null);
      close();
   };

   return (
      <>
         <Box className={'py-8'}>
            {view === CompaniesView.CARD_VIEW ? (
               <GridView companies={companies} setViewCompany={setViewCompany} />
            ) : (
               <ListView companies={companies} setViewCompany={setViewCompany} />
            )}
         </Box>
         <Drawer
            opened={opened}
            onClose={handleFormClose}
            position={'right'}
            size={'lg'}
            closeOnEscape={false}
            closeOnClickOutside={false}
            padding={20}
         >
            <CompanyEditContext.Provider value={{ getEditCompany, handleFormClose }}>
               {showEditForm ? (
                  <EditCompany />
               ) : (
                  <Flex rowGap={32} direction={'column'} align={'flex-start'} px={36} pb={42}>
                     <Button
                        variant={'outline'}
                        leftSection={<MdCreate color={colours.shadeBlue} />}
                        color={colours.shadeBlue}
                        onClick={() => setEditForm(true)}
                        style={{
                           color: colours.grey
                        }}
                     >
                        Edit Company
                     </Button>
                     <CompanyDetails />
                  </Flex>
               )}
            </CompanyEditContext.Provider>
         </Drawer>
      </>
   );
};

export default ViewCompanies;
