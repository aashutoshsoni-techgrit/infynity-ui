import React from 'react';
import { Divider, Grid, Text } from '@mantine/core';
import { VisionContentMoreInfo } from '../vision-types';
import { CustomVision } from '../edit-vision/vision-context';

interface MoreInfoProps {
   moreInfo: CustomVision<VisionContentMoreInfo[]>;
}

const MoreInfo: React.FC<MoreInfoProps> = ({ moreInfo }) => {
   if (!moreInfo?.content?.length) return null;

   return (
      <>
         {moreInfo.content.map((value, index) => (
            <div key={`more-info-${index}`}>
               <Grid>
                  <Grid.Col span={3}>
                     <h5 className='text-h6 font-medium'>{value.key}</h5>
                  </Grid.Col>
                  <Grid.Col span={8}>
                     <Text pb={'1.5rem'}>{value.value}</Text>
                  </Grid.Col>
               </Grid>
               {moreInfo.content.length - 1 === index ? '' : <Divider />}
            </div>
         ))}
      </>
   );
};

export default MoreInfo;
