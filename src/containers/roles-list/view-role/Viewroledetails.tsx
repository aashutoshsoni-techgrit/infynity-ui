/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { Box, Flex, Accordion, Avatar } from '@mantine/core';
import { userRoleData } from '@/src/utils/user-role-form.utils';
import colours from '@/src/constants/palette';
import { capitalizeFirstLetter } from '@/src/utils/string-format-utils';

const ViewRoleDetails: FC<{
   assignedUsers: any;
   roleId?: any;
   closeDrawer: (params: { fetch: boolean }) => void;
}> = ({ roleId, assignedUsers }) => {
   const formatTitle = (title: string) => {
      return title
         .split('-')
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
         .join(' ');
   };

   const titlesfordefaultval =
      userRoleData.data.permissions?.map((item: { title: string }) => formatTitle(item.title)) ||
      [];

   const permissionsGroupedByTitle =
      userRoleData?.data?.permissions?.reduce(
         (acc: Record<string, string[]>, permission: { title: string; type: string }) => {
            const formattedTitle = formatTitle(permission.title);
            if (!acc[formattedTitle]) {
               acc[formattedTitle] = [];
            }
            acc[formattedTitle].push(permission.type);
            return acc;
         },
         {}
      ) || {};

   return (
      <Flex direction={'column'} rowGap={28} px={36} pb={42}>
         <h5 className={'text-h4 font-semibold mb-5'} style={{ color: colours.midNightDarkBlue }}>
            Role Details
         </h5>
         <form className={'flex flex-col gap-y-3'}>
            <label className={'text-sm font-semibold'}>Role Name</label>
            <span className='font-bold text-2xl' style={{ color: colours.black }}>
               {roleId?.name}
            </span>

            <Box className='max-h-[37.5rem] overflow-y-auto'>
               <span className={'text-sm font-semibold mb-1'}>Permission(s)</span>
               <Accordion className='bg-transparent' defaultValue={titlesfordefaultval}>
                  {Object.keys(permissionsGroupedByTitle).map((title, index) => (
                     <Accordion.Item
                        key={index}
                        value={title}
                        className='bg-transparent'
                        style={{ border: '0rem', padding: '0' }}
                     >
                        <Accordion.Control
                           className={'hover:bg-transparent'}
                           styles={{
                              chevron: {
                                 backgroundColor: colours.grey4XLight,
                                 borderRadius: '0.3rem',
                                 paddingLeft: 5,
                                 paddingRight: 4,
                                 width: 22,
                                 height: 22
                              }
                           }}
                        >
                           <Flex align='center' columnGap={10}>
                              <Box className='inline-block min-w-2 min-h-2 rounded bg-grey' />
                              <p
                                 className='font-semibold text-md hover:bg-transparent'
                                 style={{ color: colours.greyDark }}
                              >
                                 {title}
                              </p>
                           </Flex>
                        </Accordion.Control>
                        <Accordion.Panel>
                           <ul className='list-none'>
                              {permissionsGroupedByTitle[title].map(
                                 (
                                    type: { toString: () => string },
                                    index: React.Key | null | undefined
                                 ) => (
                                    <li key={index} className='text-sm font-normal ml-5'>
                                       {type
                                          .toString()
                                          .toLowerCase()
                                          .split(' ')
                                          .map(
                                             (word: string) =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                          )
                                          .join(' ')}
                                    </li>
                                 )
                              )}
                           </ul>
                        </Accordion.Panel>
                     </Accordion.Item>
                  ))}
               </Accordion>

               {assignedUsers?.length > 0 && (
                  <>
                     <p className={'text-sm mb-4 font-semibold'}>Assigned to</p>
                     <ul>
                        {assignedUsers.map((user: any) => (
                           <span key={user.email} className='flex items-center space-x-2 mb-4'>
                              <label className='flex items-start space-x-3'>
                                 {user.profilePhoto && user.profilePhoto !== 'null' ? (
                                    <Avatar src={user.profilePhoto} />
                                 ) : (
                                    <Avatar radius='xl' />
                                 )}
                                 <div>
                                    <div className='text-sm font-semibold'>
                                       {capitalizeFirstLetter(user.firstName)}{' '}
                                       {capitalizeFirstLetter(user.lastName)}
                                    </div>
                                    <div className='text-xs text-shade-blue'>{user.email}</div>
                                    {user.title && user.title.trim().toLowerCase() !== 'null' && (
                                       <div className='text-xs'>
                                          {capitalizeFirstLetter(user.title)}
                                       </div>
                                    )}
                                 </div>
                              </label>
                           </span>
                        ))}
                     </ul>
                  </>
               )}
            </Box>
         </form>
      </Flex>
   );
};

export default ViewRoleDetails;
