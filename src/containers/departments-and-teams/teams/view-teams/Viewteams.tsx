import React, { useState } from 'react';
import { Box, Flex, Card, Text, Drawer } from '@mantine/core';
import colours from '@/src/constants/palette';
import ViewTeamsDetails from './Viewteamdetails';
import { employeeColorIcon, rightArrowIcon } from '@/src/constants/icons';
import { getTeamsDetailsbyHeadId } from '@/src/services/teams.service';
import { useQuery } from '@tanstack/react-query';
import { TeamsListingProps, TeamsListProps } from '../team.types';

const ViewTeams: React.FC<TeamsListProps> = ({ employeeId, closeDrawer }) => {
   const [teamLists, setTeamLists] = useState<TeamsListingProps[]>([]);
   const [showTeamDetails, setShowTeamDetails] = useState<boolean>(false);
   const [selectedTeamId, setselectedTeamId] = useState<string | null>(null);

   const handleIconClick = (event: { stopPropagation: () => void }, id: string) => {
      event.stopPropagation();
      setShowTeamDetails(true);
      setselectedTeamId(id);
   };

   const handleTeamDetailClose = () => {
      setShowTeamDetails(false);
      setselectedTeamId(null);
      closeDrawer();
   };
   {
      employeeId &&
         useQuery({
            queryKey: ['team-list-byhead', employeeId],
            queryFn: async () => {
               const teamdata = (await getTeamsDetailsbyHeadId(employeeId)) ?? [];
               setTeamLists(teamdata);
            }
         });
   }

   return (
      <div>
         <Flex direction='column' gap={28} px={36} pb={42}>
            <h5 className={'text-h5 font-semibold'} style={{ color: colours.midNightDarkBlue }}>
               List of Teams
            </h5>

            {teamLists.length === 0 && <Text size='lg'>There no teams available</Text>}
            {teamLists.length > 0 && (
               <Flex direction='column' gap={3}>
                  {teamLists.map((team) => (
                     <Card
                        key={team.id}
                        className='mb-1 h-18'
                        style={{ backgroundColor: colours.grey6XLight }}
                     >
                        <Flex className='h-full items-center justify-between gap-2'>
                           <Box flex={7.7}>
                              <Text size='lg'>{team.title}</Text>
                           </Box>
                           <Box flex={2}>
                              <Flex align='center' gap={4}>
                                 {employeeColorIcon}
                                 <Text className=''>{team.members}</Text>
                              </Flex>
                           </Box>
                           <Box
                              flex={0.3}
                              className='mr-1 px-2 cursor-pointer'
                              onClick={(event) => handleIconClick(event, team.id)}
                           >
                              {rightArrowIcon}
                           </Box>
                        </Flex>
                     </Card>
                  ))}
               </Flex>
            )}
         </Flex>

         <Box className={'w-full z-50'} onClick={(event) => event.stopPropagation()}>
            <Drawer
               opened={showTeamDetails}
               onClose={handleTeamDetailClose}
               position={'right'}
               size={'lg'}
               padding={20}
               closeOnClickOutside={false}
               closeOnEscape={false}
               withCloseButton={false}
            >
               {selectedTeamId && (
                  <ViewTeamsDetails
                     id={selectedTeamId}
                     employeeId={employeeId}
                     onClose={handleTeamDetailClose}
                  />
               )}
            </Drawer>
         </Box>
      </div>
   );
};

export default ViewTeams;
