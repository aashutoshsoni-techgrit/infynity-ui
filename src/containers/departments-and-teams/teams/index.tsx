import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Flex } from '@mantine/core';
import TeamsForm from './create-teams/CreateTeamsForm';
import { teamsIcon } from '@/src/constants/icons';
import { TeamsFormProps } from './team.types';

const Teams = () => {
   const [opened, { open, close }] = useDisclosure(false);
   const [employeeId, setEmployeeId] = useState<string>('');
   const handleFormClose: TeamsFormProps['closeDrawer'] = () => {
      close();
   };

   return (
      <>
         <Drawer
            opened={opened}
            onClose={handleFormClose}
            position={'right'}
            size={'lg'}
            padding={20}
            closeOnClickOutside={false}
            closeOnEscape={false}
         >
            <TeamsForm
               employeeId={employeeId}
               closeDrawer={handleFormClose}
               selectedUsers={undefined}
               createEmployee={true}
            />
         </Drawer>

         <Flex align={'center'} columnGap={6} className={'text-grey'}>
            {teamsIcon}
            <p
               onClick={() => {
                  setEmployeeId('');
                  open();
               }}
            >
               Add Team
            </p>
         </Flex>
      </>
   );
};

export default Teams;
