'use client';

import React, { useState } from 'react';
import { CompanyAdminWrapper } from '@/src/components';
import { Box, Flex, Select, TextInput } from '@mantine/core';
import ListView from '@/src/containers/roles-list/ListView';
import { MdOutlineSearch } from 'react-icons/md';
import RoleHeader from './create-role';
import colours from '@/src/constants/palette';
import { getRoles } from '@/src/services/roles-permissions.service';
import { RolesListContext } from '@/src/context/roles-list-view.context';
import { Role } from '@/src/utils/roles-permissions-form.utils';
import { useQuery } from '@tanstack/react-query';

const Roles: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState<string>('');
   const [reFetch, setRolesFetch] = useState<{ fetch: boolean }>({ fetch: true });
   const { data: roles = [], isFetching } = useQuery<Role[]>({
      queryFn: async () => {
         setRolesFetch({ fetch: false });
         return await getRoles();
      },
      queryKey: ['roles'],
      enabled: reFetch.fetch
   });

   const isDataFetching = (): boolean => isFetching;

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
   };
   return (
      <CompanyAdminWrapper pageTitle='Roles & Permissions'>
         <RolesListContext.Provider value={{ setRolesFetch, isDataFetching }}>
            <Flex
               justify='space-between'
               className='bg-white rounded-[0.8rem] -mt-6 border border-solid border-grey-3x-light'
            >
               <Flex align='center' justify='space-between' className='px-5 py-3.5 w-full'>
                  <Flex columnGap={16} align='center' className='ml-auto'>
                     <Select size='md' placeholder='Sort by' data={[]} className={'w-32'} />
                     <TextInput
                        size='md'
                        leftSection={<MdOutlineSearch size={18} />}
                        className={'w-[22rem]'}
                        placeholder='Search Role'
                        value={searchQuery}
                        onChange={handleSearch}
                        styles={() => ({
                           input: {
                              backgroundColor: colours.grey5XLight,
                              border: 0
                           }
                        })}
                     />
                     <RoleHeader />
                  </Flex>
               </Flex>
            </Flex>
            <Box className='bg-white rounded-[0.8rem] mt-4 border border-solid border-grey-3x-light py-3'>
               <ListView roles={roles} searchQuery={searchQuery} />
            </Box>
         </RolesListContext.Provider>
      </CompanyAdminWrapper>
   );
};

export default Roles;
