import React, { useState, useRef, useEffect } from 'react';
import { Box, SimpleGrid, TextInput } from '@mantine/core';
import { Vision, VisionContentCoreFocus } from '../vision-types';
import { CustomVision, useVisionFormContext } from './vision-context';
import CustomRichTextEditor from '@/src/containers/vision-statement/edit-vision/CustomRichTextEditor';
import { editGreyIcon } from '@/src/constants/icons';

export const getIntialCoreFocus = (visionStatement?: Vision[]) =>
   visionStatement && visionStatement.length && visionStatement.find((x) => x.type == 'CoreFocus')
      ? (visionStatement.find((x) => x.type == 'CoreFocus') as CustomVision<VisionContentCoreFocus>)
      : ({
           id: '',
           title: 'Core Focus',
           content: {
              mainDescription: '',
              whyDoWeExist: '',
              whatBusinessAreWeIn: ''
           },
           type: 'CoreFocus'
        } as CustomVision<VisionContentCoreFocus>);

const CoreFocusForm: React.FC = () => {
   const form = useVisionFormContext();
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
   const coreFocus = form.getValues()?.coreFocus;

   return (
      <SimpleGrid cols={1} className='py-5'>
         <Box className='flex'>
            {isEditable ? (
               <TextInput
                  placeholder='Core Focus'
                  withAsterisk
                  variant='unstyled'
                  className='font-bold'
                  size='lg'
                  key={form.key(`coreFocus.title`)}
                  {...form.getInputProps(`coreFocus.title`)}
                  ref={inputRef}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
               />
            ) : (
               <div className='flex items-center'>
                  <div className='font-bold text-[1.125rem] cursor-pointer text-black'>
                     {form.getInputProps('coreFocus.title').value}
                  </div>
                  <div className='ml-2 cursor-pointer' onClick={() => setIsEditable(true)}>
                     {editGreyIcon}
                  </div>
               </div>
            )}
         </Box>
         <Box className='w-full'>
            <CustomRichTextEditor
               content={coreFocus?.content?.mainDescription ?? ''}
               placeholder='Enter Core Focus'
               onUpdate={(content) =>
                  form.setFieldValue('coreFocus.content.mainDescription', content)
               }
            />
         </Box>
         <TextInput
            label={<p className={'text-sm mb-1 text-dark-gray font-medium'}>Why do we exist</p>}
            placeholder='Enter Description'
            style={{ flex: 1 }}
            size='md'
            key={form.key(`coreFocus.content.whyDoWeExist`)}
            {...form.getInputProps(`coreFocus.content.whyDoWeExist`)}
         />
         <TextInput
            label={
               <p className={'text-sm mb-1 text-dark-gray font-medium'}>What business are we in</p>
            }
            placeholder='Enter Description'
            style={{ flex: 1 }}
            size='md'
            key={form.key(`coreFocus.content.whatBusinessAreWeIn`)}
            {...form.getInputProps(`coreFocus.content.whatBusinessAreWeIn`)}
         />
      </SimpleGrid>
   );
};

export default CoreFocusForm;
