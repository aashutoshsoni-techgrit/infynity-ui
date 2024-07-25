import React, { useState } from 'react';
import { Box, Flex, Avatar, Button, Drawer } from '@mantine/core';
import colours from '@/src/constants/palette';
import { TeamsDetailsProps } from '../team.types';
import { subDepartmentArrowIcon, closeIcon, leftArrowIcon } from '@/src/constants/icons';
import { useQuery } from '@tanstack/react-query';
import { getTeamsData } from '@/src/services/teams.service';
import ViewTeams from './Viewteams';
import { MdEdit } from 'react-icons/md';
import TeamsForm from '../create-teams/CreateTeamsForm';
import { useRouter } from 'next/navigation';
import MemberDetails from './team.members';

const ViewTeamsDetails: React.FC<TeamsDetailsProps> = ({ id, employeeId, onClose }) => {
   const [teamData, setTeamData] = useState<TeamsDetailsProps | null>(null);
   const [showTeamList, setShowTeamList] = useState<boolean>(false);
   const router = useRouter();
   const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
   const [editTeamForm, setEditTeamForm] = useState<boolean>(false);

   const handleEditClick = (event: { stopPropagation: () => void }, id: string) => {
      event.stopPropagation();
      setEditTeamForm(true);
      setSelectedTeamId(id);
   };

   const handleTeamDetailClose = () => {
      setEditTeamForm(false);
      setSelectedTeamId(null);
   };

   const handleTeamListClose = () => {
      onClose();
      setShowTeamList(false);
   };

   const redirectToEmployeeDetails = (empID: string) => {
      router.replace('/employees/' + empID);
   };

   {
      id &&
         useQuery({
            queryKey: ['team-details-byteamId', id],
            queryFn: async () => {
               const teamdetails = (await getTeamsData(id)) ?? [];
               setTeamData(teamdetails);
            }
         });
   }

   return (
      <Flex direction='column' px={36}>
         <Flex direction='row' align='start' justify='between' className='w-full mt-5 mb-5'>
            <Flex className='cursor-pointer' onClick={() => setShowTeamList(true)}>
               {leftArrowIcon}
            </Flex>
            <Flex className='ml-auto cursor-pointer' onClick={onClose}>
               {closeIcon}
            </Flex>
         </Flex>
         {teamData && (
            <>
               <h5
                  className={'text-h4 font-semibold mb-2'}
                  style={{ color: colours.midNightDarkBlue }}
               >
                  {teamData?.title}
               </h5>
               <p className='inline-block break-words leading-5 mb-10'>{teamData?.description}</p>
               {teamData?.headDetails && (
                  <Box
                     className='flex items-center my-2 px-2 py-2 rounded-md'
                     style={{ background: colours.grey6XLight }}
                  >
                     {teamData.headDetails.profilePhoto &&
                     teamData.headDetails.profilePhoto !== 'null' ? (
                        <Avatar src={teamData.headDetails.profilePhoto} />
                     ) : (
                        <Avatar radius='xl' />
                     )}
                     <Box className='ml-4'>
                        <p
                           className='font-semibold cursor-pointer'
                           style={{ color: colours.greyDark }}
                           onClick={() => {
                              if (teamData?.headDetails?.id) {
                                 redirectToEmployeeDetails(teamData.headDetails.id);
                              }
                           }}
                        >
                           {`${teamData.headDetails.firstName} ${teamData.headDetails.lastName}`}
                        </p>
                        <p className='text-sm' style={{ color: colours.shadeBlue }}>
                           {teamData.headDetails.email}
                        </p>
                        <p className='text-sm' style={{ color: colours.greyLight }}>
                           {teamData.headDetails.title}
                        </p>
                     </Box>
                  </Box>
               )}

               {teamData?.members && teamData.members.length > 0 && (
                  <Box className='flex items-center'>
                     <p className='px-1'></p>
                     {subDepartmentArrowIcon}
                     <p className='px-3'></p>
                     <MemberDetails member={teamData.members[0]} isHead={true} />
                  </Box>
               )}

               {teamData?.members
                  ?.slice(1)
                  .map((member) => (
                     <MemberDetails key={member.id} member={member} isHead={false} />
                  ))}

               <Button
                  justify='center'
                  fullWidth
                  className='text-md font-semibold'
                  style={{ color: 'grey' }}
                  size='md'
                  px={2}
                  variant='default'
                  mt={40}
                  leftSection={<MdEdit color={colours.shadeBlue} />}
                  onClick={(event) => handleEditClick(event, teamData.id)}
               >
                  Edit Team
               </Button>
            </>
         )}

         <Box className={'w-full z-50'} onClick={(event) => event.stopPropagation()}>
            <Drawer
               opened={editTeamForm}
               onClose={handleTeamDetailClose}
               position={'right'}
               size={'lg'}
               padding={20}
               closeOnClickOutside={false}
               closeOnEscape={false}
            >
               {selectedTeamId && (
                  <TeamsForm edit teamId={selectedTeamId} closeDrawer={handleTeamListClose} />
               )}
            </Drawer>

            <Drawer
               opened={showTeamList}
               onClose={handleTeamListClose}
               position={'right'}
               size={'lg'}
               padding={20}
               closeOnClickOutside={false}
               closeOnEscape={false}
            >
               <ViewTeams employeeId={employeeId} closeDrawer={handleTeamListClose} />
            </Drawer>
         </Box>
      </Flex>
   );
};

export default ViewTeamsDetails;
