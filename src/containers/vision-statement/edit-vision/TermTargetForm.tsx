import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex, Group, NumberInput, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { FaDollarSign } from 'react-icons/fa';
import { Vision, VisionContentTermTarget } from '../vision-types';
import { CustomVision, useVisionFormContext } from './vision-context';
import colours from '@/src/constants/palette';
import { capitalize } from '@/src/utils/string-format-utils';
import CustomRichTextEditor from './CustomRichTextEditor';
import { dateIcon, editGreyIcon } from '@/src/constants/icons';

export const getInitialTermTarget = (visionStatement?: Vision[]) => {
   const initialValues =
      visionStatement &&
      visionStatement.length &&
      visionStatement.find((x) => x.type == 'TermTarget')
         ? (visionStatement.find((x) => x.type == 'TermTarget') as CustomVision<
              VisionContentTermTarget[]
           >)
         : ({
              id: '',
              title: 'Term Target (does not matter)',
              content: [
                 {
                    title: 'Long Term Target',
                    content: {
                       mainDescription: '',
                       targetDate: null,
                       revenue: null,
                       profit: null,
                       successMetrics: '',
                       description: ''
                    }
                 },
                 {
                    title: 'Three-year target',
                    content: {
                       mainDescription: '',
                       targetDate: null,
                       revenue: null,
                       profit: null,
                       successMetrics: '',
                       description: ''
                    }
                 }
              ],
              type: 'TermTarget'
           } as CustomVision<VisionContentTermTarget[]>);
   initialValues?.content?.map((x) => {
      if (x?.content?.targetDate) {
         x.content.targetDate = new Date(x.content.targetDate);
      }
   });
   return initialValues;
};

const TermTargetForm = () => {
   const form = useVisionFormContext();
   const termTarget = form.getValues()?.termTarget;
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

   return (
      <Group key={'term-target'} mt='xs'>
         {termTarget.content.map((item, index) => {
            const datePickerRef = useRef<HTMLButtonElement | null>(null);
            const capitalizedTitle = capitalize(item.title);
            return (
               <Group
                  key={`term-target-${index}`}
                  mt='xs'
                  align='start'
                  display={'flex'}
                  style={{ flexDirection: 'column', width: '100%' }}
               >
                  <Box className='flex'>
                     {editableIndex === index ? (
                        <TextInput
                           placeholder='Long Term Target'
                           withAsterisk
                           className='font-bold text-[1.125rem]'
                           size='lg'
                           variant='unstyled'
                           key={form.key(`termTarget.content.${index}.title`)}
                           {...form.getInputProps(`termTarget.content.${index}.title`)}
                           ref={inputRef}
                           onBlur={handleBlur}
                           onKeyDown={handleKeyDown}
                        />
                     ) : (
                        <div className='flex items-center'>
                           <div className='font-bold text-[1.125rem] cursor-pointer text-black'>
                              {capitalizedTitle}
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
                  <Box className='w-full'>
                     <CustomRichTextEditor
                        content={item.content.mainDescription ?? ''}
                        placeholder={`Enter ${capitalizedTitle}`}
                        onUpdate={(content) =>
                           form.setFieldValue(
                              `termTarget.content.${index}.content.mainDescription`,
                              content
                           )
                        }
                     />
                  </Box>
                  <Box key={index} className='w-full'>
                     <Flex className='w-full' gap='md' align={'center'}>
                        <DatePickerInput
                           label={<p className={'text-sm mb-1'}>Target Date</p>}
                           placeholder='MM/DD/YYYY'
                           mt='sm'
                           size='md'
                           className='w-full'
                           rightSection={
                              <div
                                 className='cursor-pointer'
                                 onClick={() => datePickerRef?.current?.click()}
                              >
                                 {dateIcon}
                              </div>
                           }
                           ref={datePickerRef}
                           key={form.key(`termTarget.content.${index}.content.targetDate`)}
                           {...form.getInputProps(`termTarget.content.${index}.content.targetDate`)}
                        />
                        <NumberInput
                           leftSection={
                              item.content.revenue ? (
                                 <FaDollarSign size={12} color={colours.black} />
                              ) : null
                           }
                           label={<p className={'text-sm mb-1'}>Revenue</p>}
                           placeholder='$.00.00'
                           mt='sm'
                           size='md'
                           className='w-full'
                           thousandSeparator=','
                           decimalSeparator='.'
                           key={form.key(`termTarget.content.${index}.content.revenue`)}
                           {...form.getInputProps(`termTarget.content.${index}.content.revenue`)}
                           hideControls
                        />
                        <NumberInput
                           leftSection={
                              item.content.profit ? (
                                 <FaDollarSign size={12} color={colours.black} />
                              ) : null
                           }
                           label={<p className={'text-sm mb-1'}>Profit</p>}
                           placeholder='$.00.00'
                           mt='sm'
                           size='md'
                           className='w-full'
                           thousandSeparator=','
                           decimalSeparator='.'
                           key={form.key(`termTarget.content.${index}.content.profit`)}
                           {...form.getInputProps(`termTarget.content.${index}.content.profit`)}
                           hideControls
                        />
                     </Flex>
                  </Box>
                  <Box className='w-full'>
                     <p className={'text-sm mb-1'}>Success Metrics</p>
                     <CustomRichTextEditor
                        content={item.content.successMetrics ?? ''}
                        placeholder='Enter Success Metrics'
                        onUpdate={(content) =>
                           form.setFieldValue(
                              `termTarget.content.${index}.content.successMetrics`,
                              content
                           )
                        }
                     />
                     <p className={'text-sm mb-1 mt-3'}>Description of what it looks like</p>
                     <CustomRichTextEditor
                        content={item.content.description ?? ''}
                        placeholder='Description'
                        onUpdate={(content) =>
                           form.setFieldValue(
                              `termTarget.content.${index}.content.description`,
                              content
                           )
                        }
                     />
                  </Box>
               </Group>
            );
         })}
      </Group>
   );
};

export default TermTargetForm;
