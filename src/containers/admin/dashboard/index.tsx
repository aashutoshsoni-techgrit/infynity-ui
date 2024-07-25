import React from 'react';
import { InfynityAdminWrapper } from '@/src/components';
import { Box } from '@mantine/core';

const Dashboard = () => {
   return (
      <InfynityAdminWrapper pageTitle={'Dashboard'}>
         <Box m={40}>
            <h3 className={'text-h3'}>Dashboard</h3>
         </Box>
      </InfynityAdminWrapper>
   );
};

export default Dashboard;
