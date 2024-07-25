import React from 'react';
import { Grid, Text } from '@mantine/core';
import { VisionContentCoreFocus } from '../vision-types';
import { CustomVision } from '../edit-vision/vision-context';
import RichTextEditorWrapper from './RichTextEditorWrapper';
import colours from '@/src/constants/palette';

interface CoreFocusProps {
   coreFocus: CustomVision<VisionContentCoreFocus>;
}

const CoreFocus: React.FC<CoreFocusProps> = ({ coreFocus }) => (
   <Grid>
      <Grid.Col span={3}>
         <h5 className='text-h6 font-medium'>{coreFocus.title}</h5>
      </Grid.Col>
      <Grid.Col span={8}>
         <RichTextEditorWrapper content={coreFocus.content.mainDescription} />
         <Text>
            <strong className='text-black'>Why Do We Exist</strong>
         </Text>
         <Text pb={'1rem'} style={{ color: colours.greyDark }}>
            {coreFocus.content.whyDoWeExist}
         </Text>
         <Text>
            <strong className='text-black'>What Business Are We In</strong>
         </Text>
         <Text pb={'1rem'} style={{ color: colours.greyDark }}>
            {coreFocus.content.whatBusinessAreWeIn}
         </Text>
      </Grid.Col>
   </Grid>
);

export default CoreFocus;
