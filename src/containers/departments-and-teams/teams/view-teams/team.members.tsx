import colours from '@/src/constants/palette';
import { Avatar, Box } from '@mantine/core';
import React from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from '../team.types';

interface MemberDetailsProps {
   member: TeamMember;
   isHead: boolean;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, isHead }) => {
   const router = useRouter();
   const redirectToEmployeeDetails = (empID: string) => {
      router.replace('/employees/' + empID);
   };

   return (
      <Box
         className={`px-2 py-2 flex items-center ${isHead ? '' : 'my-1 ml-auto'} rounded-md`}
         style={{ background: colours.grey6XLight, width: '90%' }}
      >
         {member.profilePhoto && member.profilePhoto !== 'null' ? (
            <Avatar src={member.profilePhoto} />
         ) : (
            <Avatar radius='xl' />
         )}
         <Box className='ml-4'>
            <p
               className='font-semibold cursor-pointer'
               style={{ color: colours.greyDark }}
               onClick={() => {
                  if (member?.id) {
                     redirectToEmployeeDetails(member.id);
                  }
               }}
            >
               {`${member.firstName} ${member.lastName}`}
            </p>
            <p className='text-sm' style={{ color: colours.shadeBlue }}>
               {member.email}
            </p>
            <p className='text-sm' style={{ color: colours.greyLight }}>
               {member.title}
            </p>
         </Box>
      </Box>
   );
};

export default MemberDetails;
