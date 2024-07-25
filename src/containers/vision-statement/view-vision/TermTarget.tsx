import React from 'react';
import { Divider, Grid, Text } from '@mantine/core';
import { VisionContentTermTarget } from '../vision-types';
import RichTextEditorWrapper from './RichTextEditorWrapper';
import { CustomVision } from '../edit-vision/vision-context';

interface TermTargetProps {
   termTarget: CustomVision<VisionContentTermTarget[]>;
}

const TermTarget: React.FC<TermTargetProps> = ({ termTarget }) => {
   if (!termTarget?.content?.length) return null;

   return (
      <>
         {termTarget.content.map((value, index) => (
            <div key={`term-target-${index}`}>
               <Grid className='mt-2 mb-2'>
                  <Grid.Col span={3}>
                     <h5 className='text-h6 font-medium'>{value.title}</h5>
                  </Grid.Col>
                  <Grid.Col span={8}>
                     <div className='flex flex-col'>
                        <RichTextEditorWrapper content={value.content.mainDescription} />
                        <Text>
                           <strong>Target Date</strong>
                        </Text>
                        <p className='text-dark-gray pb-[0.5rem]'>
                           {value?.content?.targetDate
                              ? new Date(value?.content?.targetDate).toLocaleDateString()
                              : '-'}
                        </p>
                        <Text>
                           <strong>Revenue</strong>
                        </Text>
                        <p className='flex items-center text-dark-gray pb-[0.5rem]'>
                           ${new Intl.NumberFormat().format(value?.content?.revenue ?? 0)}
                        </p>
                        <Text>
                           <strong>Profit:</strong>
                        </Text>
                        <p className='flex items-center text-dark-gray pb-[0.5rem]'>
                           ${new Intl.NumberFormat().format(value?.content?.profit ?? 0)}
                        </p>
                        <Text>
                           <strong>Success Metrics:</strong>
                        </Text>
                        <RichTextEditorWrapper content={value.content.successMetrics} />
                        <Text>
                           <strong>Description of what it looks like</strong>
                        </Text>
                        <RichTextEditorWrapper content={value.content.description} />
                     </div>
                  </Grid.Col>
               </Grid>
               {termTarget.content.length - 1 === index ? '' : <Divider />}
            </div>
         ))}
      </>
   );
};

export default TermTarget;
