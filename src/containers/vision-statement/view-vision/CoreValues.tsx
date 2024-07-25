import React from 'react';
import { Grid, Text } from '@mantine/core';
import { VisionContentCoreValues } from '../vision-types';
import { CustomVision } from '../edit-vision/vision-context';
import colours from '@/src/constants/palette';

interface CoreValuesProps {
   coreValues: CustomVision<VisionContentCoreValues>;
}

const CoreValues: React.FC<CoreValuesProps> = ({ coreValues }) => (
   <Grid>
      <Grid.Col span={3}>
         <h5 className='text-h6 font-medium'>{coreValues.title}</h5>
      </Grid.Col>
      <Grid.Col span={8}>
         <ul>
            {coreValues?.content?.coreValuesList?.map((item, index) => (
               <li key={`vision-${index}`} className='flex flex-col pb-4'>
                  <Text>
                     <strong>{item?.key}</strong>
                  </Text>
                  <Text style={{ color: colours.greyDark }}>{item?.value}</Text>
               </li>
            ))}
         </ul>
      </Grid.Col>
   </Grid>
);

export default CoreValues;
