import React, { useState, useRef, useEffect } from 'react';
import colours from '@/src/constants/palette';
import { Box, Group, Text, TextInput, Textarea, Divider } from '@mantine/core';
import { RiAddFill } from 'react-icons/ri';
import { Vision, VisionContentMoreInfo } from '../vision-types';
import { CustomVision, useVisionFormContext } from './vision-context';
import { editGreyIcon } from '@/src/constants/icons';

export const getInitialMoreInfo = (visionStatement?: Vision[]) =>
   visionStatement && visionStatement.length && visionStatement.find((x) => x.type == 'MoreInfo')
      ? (visionStatement.find((x) => x.type == 'MoreInfo') as CustomVision<VisionContentMoreInfo[]>)
      : ({
           id: '',
           title: 'More Info',
           content: [],
           type: 'MoreInfo'
        } as CustomVision<VisionContentMoreInfo[]>);

const MoreInfoForm = () => {
   const form = useVisionFormContext();
   const moreInfo = form.getValues()?.moreInfo;
   const [editableIndex, setEditableIndex] = useState<number | null>(null);
   const inputRef = useRef<HTMLInputElement | null>(null);

   useEffect(() => {
      if (editableIndex !== null && inputRef.current) {
         inputRef.current.focus();
      }
   }, [editableIndex]);

   const handleBlur = () => setEditableIndex(null);

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
      if (editableIndex !== null) {
         document.addEventListener('mousedown', handleClickOutside);
         return () => {
            document.removeEventListener('mousedown', handleClickOutside);
         };
      }
   }, [editableIndex]);

   const handleAddMoreInfo = (index: number) => {
      const isKeyValid = form.validateField(`moreInfo.content.${index}.key`).hasError;
      const isValueValid = form.validateField(`moreInfo.content.${index}.value`).hasError;
      if (isKeyValid || isValueValid) {
         return;
      }

      form.insertListItem('moreInfo.content', { key: 'Heading', value: '' });
   };

   return (
      <>
         <Group key={'more-info'} mt='xs'>
            {moreInfo?.content.map((item, index) => (
               <Group
                  key={`more-info-${index}`}
                  mt='xs'
                  align='start'
                  display={'flex'}
                  style={{ flexDirection: 'column', width: '100%' }}
               >
                  <Box className='flex'>
                     {editableIndex === index ? (
                        <TextInput
                           placeholder='Heading'
                           withAsterisk
                           className='font-bold'
                           variant='unstyled'
                           size='lg'
                           key={form.key(`moreInfo.content.${index}.key`)}
                           {...form.getInputProps(`moreInfo.content.${index}.key`)}
                           ref={inputRef}
                           onBlur={handleBlur}
                           onKeyDown={handleKeyDown}
                        />
                     ) : (
                        <div className='flex items-center'>
                           <div className='font-bold text-lg cursor-pointer text-black'>
                              {form.getInputProps(`moreInfo.content.${index}.key`).value}
                           </div>
                           <div
                              className='ml-2 cursor-pointer'
                              onClick={() => setEditableIndex(index)}
                           >
                              {editGreyIcon}
                           </div>
                        </div>
                     )}
                  </Box>
                  <Textarea
                     placeholder='Description'
                     withAsterisk
                     autosize
                     minRows={5}
                     style={{ flex: 1 }}
                     className='w-full'
                     size='md'
                     key={form.key(`moreInfo.content.${index}.value`)}
                     {...form.getInputProps(`moreInfo.content.${index}.value`)}
                  />
               </Group>
            ))}
         </Group>
         {moreInfo?.content?.length !== 0 && <Divider className='mt-3' />}
         <Box className='mt-2 w-[100%] flex justify-center'>
            <Text
               variant='outline'
               onClick={() => {
                  handleAddMoreInfo(moreInfo?.content?.length ? moreInfo?.content?.length - 1 : 0);
               }}
               className='flex items-center underline cursor-pointer font-bold'
               style={{ color: `${colours.shadeBlue}`, textDecoration: 'underline' }}
            >
               <RiAddFill color={colours.shadeBlue} /> Add more
            </Text>
         </Box>
      </>
   );
};

export default MoreInfoForm;
