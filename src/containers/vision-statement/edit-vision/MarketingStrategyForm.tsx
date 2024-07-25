import React, { useState, useRef, useEffect } from 'react';
import { Box, Group, Text, TextInput } from '@mantine/core';
import { RiAddFill } from 'react-icons/ri';
import { Vision, VisionContentMarketingStrategy } from '../vision-types';
import { CustomVision, useVisionFormContext } from './vision-context';
import CustomRichTextEditor from './CustomRichTextEditor';
import colours from '@/src/constants/palette';
import { editGreyIcon } from '@/src/constants/icons';

export const getInitialMarketingStrategy = (visionStatement?: Vision[]) =>
   visionStatement &&
   visionStatement.length &&
   visionStatement.find((x) => x.type == 'MarketingStrategy')
      ? (visionStatement.find(
           (x) => x.type == 'MarketingStrategy'
        ) as CustomVision<VisionContentMarketingStrategy>)
      : ({
           id: '',
           title: 'Marketing Strategy',
           content: {
              mainDescription: '',
              targetMarket: [
                 { key: 'Demographic', values: [{ targetMarketValue: '' }] },
                 { key: 'Geographic', values: [{ targetMarketValue: '' }] },
                 { key: 'Phychographic', values: [{ targetMarketValue: '' }] }
              ],
              northStar: '',
              threeUniques: [{ uniqueValue: '' }, { uniqueValue: '' }, { uniqueValue: '' }],
              guarantee: ''
           },
           type: 'MarketingStrategy'
        } as CustomVision<VisionContentMarketingStrategy>);

const MarketingStrategyForm: React.FC = () => {
   const form = useVisionFormContext();
   const marketingStrategy = form.getValues()?.marketingStrategy;

   const [isEditable, setIsEditable] = useState(false);
   const inputRef = useRef<HTMLInputElement | null>(null);

   useEffect(() => {
      if (isEditable && inputRef.current) {
         inputRef.current.focus();
      }
   }, [isEditable]);

   const handleBlur = () => setIsEditable(false);

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         handleBlur();
      }
   };

   const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
         handleBlur();
      }
   };

   useEffect(() => {
      if (isEditable) {
         document.addEventListener('mousedown', handleClickOutside);
         return () => {
            document.removeEventListener('mousedown', handleClickOutside);
         };
      }
   }, [isEditable]);

   const handleAddMoreTargetMarketValues = (index: number, valueIndex: number) => {
      const isValueValid = form.validateField(
         `marketingStrategy.content.targetMarket.${index}.values.${valueIndex}.targetMarketValue`
      ).hasError;
      if (isValueValid) {
         return;
      }
      form.insertListItem(`marketingStrategy.content.targetMarket.${index}.values`, {
         targetMarketValue: ''
      });
   };

   const targetMarketComponents = marketingStrategy?.content?.targetMarket?.map((item, index) => (
      <Box key={`target-market-${index}`}>
         <p className={`text-sm  text-dark-gray font-medium opacity-9`}>{item.key}</p>
         {item.values?.map((value, valueIndex) => (
            <Box key={`target-market-value${valueIndex}`}>
               <TextInput
                  placeholder={`Enter ${item.key}`}
                  withAsterisk
                  mt={'xs'}
                  size='md'
                  key={form.key(
                     `marketingStrategy.content.targetMarket.${index}.values.${valueIndex}.targetMarketValue`
                  )}
                  {...form.getInputProps(
                     `marketingStrategy.content.targetMarket.${index}.values.${valueIndex}.targetMarketValue`
                  )}
               />
            </Box>
         ))}
         <Box className='mt-2 w-[100%] flex justify-end'>
            <Text
               onClick={() => {
                  handleAddMoreTargetMarketValues(index, item.values.length - 1);
               }}
               className='flex items-center underline cursor-pointer font-bold'
               style={{ color: `${colours.shadeBlue}`, textDecoration: 'underline' }}
            >
               <RiAddFill color={colours.shadeBlue} /> Add more
            </Text>
         </Box>
      </Box>
   ));

   const threeUniquesComponent = marketingStrategy?.content?.threeUniques?.map((item, index) => (
      <Box key={`three-uniques-${index}`} className='flex flex-row gap-4 items-baseline '>
         <p className='font-bold text-sm' style={{ color: 'black' }}>
            {index + 1}.
         </p>
         <TextInput
            placeholder='Description'
            withAsterisk
            mt={'sm'}
            className='w-full'
            size='md'
            key={form.key(`marketingStrategy.content.threeUniques.${index}.uniqueValue`)}
            {...form.getInputProps(`marketingStrategy.content.threeUniques.${index}.uniqueValue`)}
         />
      </Box>
   ));

   return (
      <Group
         key={marketingStrategy.id ?? 'MarketingStrategy'}
         align='start'
         display={'flex'}
         style={{ flexDirection: 'column' }}
      >
         <Box mt={'lg'} className='flex'>
            {isEditable ? (
               <TextInput
                  placeholder='Marketing Strategy'
                  withAsterisk
                  variant='unstyled'
                  className='font-bold'
                  size='lg'
                  key={form.key(`marketingStrategy.title`)}
                  {...form.getInputProps(`marketingStrategy.title`)}
                  ref={inputRef}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
               />
            ) : (
               <div className='flex items-center'>
                  <div className='font-bold text-[1.125rem] cursor-pointer text-black'>
                     {form.getInputProps('marketingStrategy.title').value}
                  </div>
                  <div className='ml-2 cursor-pointer' onClick={() => setIsEditable(true)}>
                     {editGreyIcon}
                  </div>
               </div>
            )}
         </Box>
         <Box className='w-full'>
            <CustomRichTextEditor
               content={marketingStrategy?.content?.mainDescription ?? ''}
               placeholder='Enter Marketing Strategy'
               onUpdate={(content) =>
                  form.setFieldValue('marketingStrategy.content.mainDescription', content)
               }
            />
            <p
               className={`text-[${colours.black}] font-bold mt-[1rem]`}
               style={{ marginTop: '1rem', fontWeight: '600' }}
            >
               Target Market
            </p>
            {targetMarketComponents}
            <p className={'text-lg mb-1 font-bold text-black'}>North Star</p>
            <CustomRichTextEditor
               content={marketingStrategy?.content?.northStar ?? ''}
               placeholder='Enter North Star'
               onUpdate={(content) =>
                  form.setFieldValue('marketingStrategy.content.northStar', content)
               }
            />
            <p className={'text-lg mb-1 font-bold text-black'}>Three Uniques</p>
            {threeUniquesComponent}
            <p className={'text-lg mb-1 font-bold text-black'}>Guarantee</p>
            <CustomRichTextEditor
               content={marketingStrategy?.content?.guarantee ?? ''}
               placeholder='Enter Guarantee'
               onUpdate={(content) =>
                  form.setFieldValue('marketingStrategy.content.guarantee', content)
               }
            />
         </Box>
      </Group>
   );
};

export default MarketingStrategyForm;
