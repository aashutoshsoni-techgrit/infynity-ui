import React, { useState } from 'react';
import { Box, Card, Flex, Title } from '@mantine/core';
import colours from '@/src/constants/palette';
import { EmployeeProfileActionItems } from '@/src/utils/onboard-company-form.utils';

const ActionItemsAndIssues: React.FC = () => {
   const [selectedTab, setSelectedTab] = useState<EmployeeProfileActionItems>(
      EmployeeProfileActionItems.ACTION_ITEMS
   );

   return (
      <Card withBorder radius={'lg'} className='shadow' padding='lg'>
         <Flex gap='lg' align='center'>
            <Box
               className='cursor-pointer text-lg'
               style={{
                  color:
                     selectedTab === EmployeeProfileActionItems.ACTION_ITEMS
                        ? colours.shadeBlue
                        : colours.greyXLight,
                  borderBottom:
                     selectedTab === EmployeeProfileActionItems.ACTION_ITEMS
                        ? `0.2rem solid ${colours.shadeBlue}`
                        : '0.2rem solid transparent',
                  transition: 'color 0.3s linear, border-bottom 0.1s linear'
               }}
               onClick={() => setSelectedTab(EmployeeProfileActionItems.ACTION_ITEMS)}
            >
               <Title order={4}>Action Items</Title>
            </Box>
            <Box
               style={{
                  cursor: 'pointer',
                  color:
                     selectedTab === EmployeeProfileActionItems.ISSUES
                        ? colours.shadeBlue
                        : colours.greyXLight,
                  borderBottom:
                     selectedTab === EmployeeProfileActionItems.ISSUES
                        ? `0.2rem solid ${colours.shadeBlue}`
                        : '0.2rem solid transparent',
                  transition: 'color 0.3s linear, border-bottom 0.1s linear'
               }}
               onClick={() => setSelectedTab(EmployeeProfileActionItems.ISSUES)}
            >
               <Title order={4}>Issues</Title>
               {/* Placeholder for Issues */}
            </Box>
         </Flex>
      </Card>
   );
};

export default ActionItemsAndIssues;
