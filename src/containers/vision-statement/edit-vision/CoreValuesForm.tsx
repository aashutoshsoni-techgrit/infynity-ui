import React, { useState, useRef, useEffect } from 'react';
import colours from '@/src/constants/palette';
import { Box, Group, Text, TextInput } from '@mantine/core';
import { RiAddFill } from 'react-icons/ri';
import { Vision, VisionContentCoreValues } from '../vision-types';
import { CustomVision, useVisionFormContext } from './vision-context';
import { editGreyIcon } from '@/src/constants/icons';
import { trashIcon } from '@/src/constants/icons';

export const getIntialCoreValues = (visionStatement?: Vision[]) =>
   visionStatement && visionStatement.length && visionStatement.find((x) => x.type == 'CoreValues')
      ? (visionStatement.find(
           (x) => x.type == 'CoreValues'
        ) as CustomVision<VisionContentCoreValues>)
      : ({
           id: '',
           title: 'Core Values',
           content: {
              coreValuesList: [
                 { key: '', value: '' },
                 { key: '', value: '' },
                 { key: '', value: '' }
              ]
           },
           type: 'CoreValues'
        } as CustomVision<VisionContentCoreValues>);

const CoreValuesForm = () => {
   const form = useVisionFormContext();
   const coreValues = form.getValues()?.coreValues;

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

   const handleAddMoreCoreValues = (index: number) => {
      const isKeyValid = form.validateField(
         `coreValues.content.coreValuesList.${index}.key`
      ).hasError;
      const isValueValid = form.validateField(
         `coreValues.content.coreValuesList.${index}.value`
      ).hasError;
      if (isKeyValid || isValueValid) {
         return;
      }
      form.insertListItem('coreValues.content.coreValuesList', { key: '', value: '' });
   };

   const coreValuesFields = coreValues?.content.coreValuesList?.map((item, index) => (
      <Box key={index} className='flex flex-row items-center gap-x-2 mt-3'>
         <p className='px-2 font-bold text-black'>{index + 1}.</p>
         <TextInput
            placeholder='Title'
            withAsterisk
            size='md'
            className='flex-grow-0 flex-shrink-0 basis-[30%]'
            key={form.key(`coreValues.content.coreValuesList.${index}.key`)}
            {...form.getInputProps(`coreValues.content.coreValuesList.${index}.key`)}
         />
         <TextInput
            placeholder='Description'
            withAsterisk
            size='md'
            className={`flex-grow-0 flex-shrink-0  ${index < 3 ? 'basis-[55%]' : 'basis-[51.3%]'}`}
            key={form.key(`coreValues.content.coreValuesList.${index}.value`)}
            {...form.getInputProps(`coreValues.content.coreValuesList.${index}.value`)}
         />
         {index > 2 ? (
            <div
               className='flex items-center justify-center w-7 h-7 rounded bg-red-100 relative cursor-pointer'
               onClick={() => form.removeListItem('coreValues.content.coreValuesList', index)}
            >
               {trashIcon}
            </div>
         ) : (
            ''
         )}
      </Box>
   ));

   return (
      <Group
         key={coreValues.id ?? 'core-values'}
         align='start'
         display={'flex'}
         style={{ flexDirection: 'column', width: '100%' }}
         className='py-3 mt-2'
      >
         <Box className='flex flex-col w-[100%]'>
            <Box className='flex'>
               {isEditable ? (
                  <TextInput
                     placeholder='Core Values'
                     withAsterisk
                     variant='unstyled'
                     className='font-bold pb-3'
                     size='lg'
                     key={form.key(`coreValues.title`)}
                     {...form.getInputProps(`coreValues.title`)}
                     ref={inputRef}
                     onBlur={handleBlur}
                     onKeyDown={handleKeyDown}
                  />
               ) : (
                  <div className='flex items-center'>
                     <div className='font-bold text-[1.125rem] cursor-pointer text-black'>
                        {form.getInputProps('coreValues.title').value}
                     </div>
                     <div className='ml-2 cursor-pointer' onClick={() => setIsEditable(true)}>
                        {editGreyIcon}
                     </div>
                  </div>
               )}
            </Box>
            <Box className='w-full'>{coreValuesFields}</Box>
         </Box>
         <Box className='mt-2 w-[100%] flex justify-end'>
            <Text
               onClick={() => {
                  handleAddMoreCoreValues(coreValues?.content?.coreValuesList?.length - 1);
               }}
               className='flex items-center underline cursor-pointer font-bold'
               style={{ color: `${colours.shadeBlue}`, textDecoration: 'underline' }}
            >
               <RiAddFill color={colours.shadeBlue} /> Add more
            </Text>
         </Box>
      </Group>
   );
};

export default CoreValuesForm;
