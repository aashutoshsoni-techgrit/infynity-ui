'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Drawer, Flex, Menu } from '@mantine/core';
import { MdOutlineMoreVert, MdLogout, MdBusiness, MdCreate } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { authSessionStorageKey, UserTypes } from '@/src/constants';
import { AuthContext, authStore } from '@/src/context/AuthWrapper';
import loaderService from '@/src/services/loader.service';
import colours from '@/src/constants/palette';
import { useDisclosure } from '@mantine/hooks';
import { CompanyEditContext } from '@/src/context/companies-view.context';
import EditCompany from '@/src/containers/admin/companies-list/edit-company';
import { CompanyEditFormView, onboardFromData } from '@/src/utils/onboard-company-form.utils';
import CompanyDetails from '@/src/containers/admin/companies-list/edit-company/CompanyDetails';
import { useQuery } from '@tanstack/react-query';
import getCompanyDetails from '@/src/services/employee-company-edit.service';

const ProfileMenu = () => {
   const router = useRouter();
   const { getSignedInUser } = useContext(AuthContext);
   const signedInUser = getSignedInUser?.();
   const [showCompanyEditForm, setShowCompanyEditForm] = useState<boolean | number>(false);
   const [opened, { open, close }] = useDisclosure(false);
   const isCompanyAdmin = signedInUser?.user?.userType.userType === UserTypes.COMPANY_ADMIN;

   const { data: company, refetch } = useQuery({
      queryKey: ['companyDetails', authStore.tenantId],
      queryFn: async () => await getCompanyDetails(authStore.tenantId),
      enabled: showCompanyEditForm === CompanyEditFormView.DETAILS_VIEW
   });

   const handleLogout = async () => {
      loaderService.showLoader();
      if (typeof sessionStorage !== 'undefined') {
         authStore.jwtToken = '';
         authStore.tenantId = '';
         sessionStorage.removeItem(authSessionStorageKey);
      }
      router.replace('/');
      loaderService.hideLoader();
   };

   const handleFormClose = () => {
      onboardFromData.company = null;
      onboardFromData.user = null;
      setShowCompanyEditForm(false);
      close();
   };

   useEffect(() => {
      if (showCompanyEditForm === CompanyEditFormView.DETAILS_VIEW) {
         refetch();
         open();
      }
   }, [showCompanyEditForm]);

   return (
      <>
         <Menu position={'bottom-end'}>
            <Menu.Target>
               <Box className={'inline-block hover:bg-grey-4x-light rounded-[50%] p-1.5'}>
                  <MdOutlineMoreVert size={24} className={'cursor-pointer'} />
               </Box>
            </Menu.Target>
            <Menu.Dropdown>
               <Menu.Label>Profile</Menu.Label>
               {isCompanyAdmin && (
                  <>
                     <Menu.Item
                        onClick={() => setShowCompanyEditForm(CompanyEditFormView.DETAILS_VIEW)}
                     >
                        <Flex align={'center'} className={'text-grey'} columnGap={8}>
                           <MdBusiness size={16} />
                           <p className={'text-body'}>Company Profile</p>
                        </Flex>
                     </Menu.Item>
                  </>
               )}
               <Menu.Item onClick={handleLogout}>
                  <Flex align={'center'} columnGap={8}>
                     <MdLogout color={colours.error} size={16} />
                     <p className={'text-error text-body'}>Log out</p>
                  </Flex>
               </Menu.Item>
            </Menu.Dropdown>
         </Menu>
         {isCompanyAdmin && (
            <Drawer
               opened={opened}
               onClose={handleFormClose}
               closeOnEscape={false}
               closeOnClickOutside={false}
               position={'right'}
               size={'lg'}
               padding={20}
            >
               <CompanyEditContext.Provider
                  value={{ getEditCompany: () => company, handleFormClose }}
               >
                  {showCompanyEditForm === CompanyEditFormView.EDIT_VIEW ? (
                     <EditCompany />
                  ) : (
                     <Flex rowGap={32} direction={'column'} align={'flex-start'} px={36} pb={42}>
                        <Button
                           variant={'outline'}
                           leftSection={<MdCreate color={colours.shadeBlue} />}
                           color={colours.shadeBlue}
                           style={{ color: colours.grey }}
                           onClick={() => setShowCompanyEditForm(CompanyEditFormView.EDIT_VIEW)}
                        >
                           Edit Company
                        </Button>
                        <CompanyDetails />
                     </Flex>
                  )}
               </CompanyEditContext.Provider>
            </Drawer>
         )}
      </>
   );
};

export default ProfileMenu;
