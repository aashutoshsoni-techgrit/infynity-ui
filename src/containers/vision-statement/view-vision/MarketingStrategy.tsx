import React from 'react';
import { Grid, Text } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { VisionContentMarketingStrategy } from '../vision-types';
import { CustomVision } from '../edit-vision/vision-context';
import colours from '@/src/constants/palette';
import RichTextEditorWrapper from './RichTextEditorWrapper';

interface MarketingStrategyProps {
   marketingStrategy: CustomVision<VisionContentMarketingStrategy>;
}

const MarketingStrategy: React.FC<MarketingStrategyProps> = ({ marketingStrategy }) => {
   const editor = useEditor({
      extensions: [StarterKit],
      content: marketingStrategy.content.mainDescription,
      editable: false,
      editorProps: {
         attributes: {
            class: 'border: none'
         }
      }
   });

   const formatText = (text: string) => {
      const index = text.indexOf(':');
      if (index !== -1) {
         const title = text.slice(0, index + 1);
         const description = text.slice(index + 1); //
         return (
            <>
               <span className='font-semibold text-dark-gray text-md w-auto'>{title}</span>
               <span className='font-normal text-dark-gray text-md w-auto'>{description}</span>
            </>
         );
      }
      return text;
   };

   return (
      <Grid>
         <Grid.Col span={3}>
            <h5 className='text-h6 font-medium'>{marketingStrategy.title}</h5>
         </Grid.Col>
         <Grid.Col span={8}>
            <div>
               <RichTextEditor editor={editor} style={{ border: 'none', color: colours.greyDark }}>
                  <RichTextEditor.Content />
               </RichTextEditor>
               <div className='py-2'>
                  <strong>Target Market</strong>
               </div>
               {marketingStrategy.content.targetMarket.map((item, index) => (
                  <div key={`vision-${index}`} className='ml-6 text-dark-gray'>
                     <Text>
                        <strong className='text-black'>{item.key}:</strong>
                     </Text>
                     <Text pb={'1.5rem'}>
                        {item.values?.map((x) => x.targetMarketValue).join(', ')}
                     </Text>
                  </div>
               ))}
               <Text>
                  <strong>North Star </strong>
               </Text>
               <RichTextEditorWrapper content={marketingStrategy?.content?.northStar} />
               <Text>
                  <strong>Three Uniques</strong>
               </Text>
               {marketingStrategy.content.threeUniques?.map((value, index) => (
                  <Text pb={'1rem'} ml={'1.5rem'} key={`three-uniques-${index}`}>
                     {formatText(value.uniqueValue)}
                  </Text>
               ))}
               <Text>
                  <strong>Guarantee</strong>
               </Text>
               <RichTextEditorWrapper content={marketingStrategy?.content?.guarantee} />
            </div>
         </Grid.Col>
      </Grid>
   );
};

export default MarketingStrategy;
