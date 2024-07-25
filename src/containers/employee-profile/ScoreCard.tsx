import React from 'react';
import { Card, Flex, Text, Title } from '@mantine/core';

const Scorecard: React.FC = () => {
   return (
      <Card withBorder radius={'lg'} padding='xl' mb='lg' className='shadow'>
         <Title style={{ color: '#4361EE' }} order={3}>
            Scorecard
         </Title>
         <Flex align={'center'} justify={'center'} style={{ height: '18.75rem' }}>
            <Text style={{ textAlign: 'center', width: '70%' }}>
               This section will be designed once we get to scorecard screens. Here we will show emp
               scorecard along with scorecards with one level drill down in hierarchy.
            </Text>
         </Flex>
      </Card>
   );
};

export default Scorecard;
