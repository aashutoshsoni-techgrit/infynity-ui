/* eslint-disable max-lines-per-function */

'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, Center, Checkbox, Divider, Flex, TextInput } from '@mantine/core';
import colours from '@/src/constants/palette';
import { MdOutlineSearch, MdClose, MdCheck } from 'react-icons/md';
import {
   SearchableDropDownProps,
   SearchableDropDownItemDataType,
   SearchableDropDownLabelType,
   SearchableDropDownItemType
} from '@/src/components/components.types';
import { downArrowIcon } from '@/src/constants/icons';

const SearchableDropDown: FC<SearchableDropDownProps> & {
   Item: FC<SearchableDropDownItemType>;
} & { Label: FC<SearchableDropDownLabelType> } = ({
   data,
   multiSelect,
   placeholder,
   maxSelectCount,
   onChange,
   dropDownFooter,
   error,
   style = {},
   defaultSelectedValues
}) => {
   const [show, setShow] = useState<boolean>(false);
   const [selectedValues, setSelectedValues] = useState<SearchableDropDownItemDataType[]>([]);
   const [dropDownValues, setDropDownValues] = useState<SearchableDropDownItemDataType[]>(data);
   const [isInitialDefaultValues, setIsInitialDefaultValues] = useState<boolean>(true);
   const searchableRef = useRef<HTMLDivElement>(null);

   const handleItemClick = async (item: SearchableDropDownItemDataType) => {
      let updatedValues: SearchableDropDownItemDataType[] = [];
      let values: string[] = [];
      if (multiSelect) {
         if (selectedValues.includes(item)) {
            updatedValues = selectedValues.filter((selectedValue) => selectedValue !== item);
         } else {
            if (typeof maxSelectCount !== 'undefined' && selectedValues.length >= maxSelectCount) {
               return;
            }
            updatedValues = [...selectedValues, item];
         }

         updatedValues.forEach((updatedValue) => values.push(updatedValue.value ?? ''));
      } else {
         updatedValues = [item];
         values = [item.value ?? ''];
      }

      setSelectedValues(updatedValues);
      !multiSelect && setShow(false);
      onChange?.(values);
   };

   const handleRemoveClick = async (
      event: React.MouseEvent<SVGElement, MouseEvent>,
      item: SearchableDropDownItemDataType
   ) => {
      event.stopPropagation();

      const values: string[] = [];
      const updatedValues = selectedValues.filter((selectedValue) => selectedValue !== item);

      setSelectedValues(updatedValues);
      updatedValues.forEach((updatedValue) => values.push(updatedValue.value ?? ''));
      onChange?.(values);
   };

   const handleSearch = async (event: { target: { value: string } }) => {
      const queryParts = event.target.value.toLowerCase().split(' ');
      const searchResults = data.filter((value: SearchableDropDownItemDataType) =>
         queryParts.some((part) => {
            return value.searchPatterns
               ? value.searchPatterns.some((pattern: string) =>
                    pattern.toLowerCase().includes(part)
                 )
               : true;
         })
      );
      setDropDownValues(searchResults);
   };

   const handleClickOutside = async (event: MouseEvent) => {
      if (
         searchableRef?.current &&
         !searchableRef.current.contains(event.target as Node) &&
         // @ts-expect-error any
         !event.target?.closest('.searchable-component')
      ) {
         setShow(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   useEffect(() => {
      setDropDownValues(data);
   }, [data, show]);

   useEffect(() => {
      if (isInitialDefaultValues && data?.length && defaultSelectedValues?.length) {
         setIsInitialDefaultValues(false);
         setSelectedValues(
            data?.filter?.((item) => defaultSelectedValues?.includes(item.value ?? ''))
         );
      }
   }, [defaultSelectedValues]);

   return (
      <Box className={'relative'}>
         <Flex
            className={`w-full min-h-10 rounded border border-solid ${error ? 'border-error' : 'border-grey-3x-light'} pl-3 pr-6 py-2 flex-wrap relative ${show ? 'border border-solid border-shade-blue' : 'cursor-pointer'}`}
            align={'center'}
            rowGap={4}
            columnGap={4}
            onClick={() => setShow((prev) => !prev)}
            ref={searchableRef}
            style={style}
         >
            {selectedValues.length > 0 ? (
               selectedValues.map(
                  (selectedValue: SearchableDropDownItemDataType, index: number) => (
                     <>
                        {multiSelect ? (
                           <Flex
                              key={index}
                              columnGap={4}
                              align={'center'}
                              className={'rounded-xl bg-grey-5x-light text-sm'}
                              px={10}
                              py={2.5}
                           >
                              {selectedValue.label}
                              <MdClose
                                 size={12}
                                 className={'cursor-pointer'}
                                 onClick={(event) => handleRemoveClick(event, selectedValue)}
                              />
                           </Flex>
                        ) : (
                           <p className={'text-black'}>{selectedValue.label}</p>
                        )}
                     </>
                  )
               )
            ) : (
               <p className={'text-grey-x-light'}>{placeholder || 'Select'}</p>
            )}
            <Flex direction={'column'} className={'inline-block absolute right-4'}>
               {downArrowIcon}
            </Flex>
         </Flex>
         {show && (
            <Flex
               direction={'column'}
               rowGap={16}
               className={
                  'w-full mt-1 rounded-md shadow border-[0.006rem] border-solid border-gray-300 z-50 searchable-component absolute bg-white'
               }
               p={16}
            >
               <TextInput
                  size={'md'}
                  placeholder={'Search'}
                  styles={{
                     input: {
                        backgroundColor: colours.grey6XLight
                     }
                  }}
                  rightSection={<MdOutlineSearch size={18} />}
                  onChange={handleSearch}
               />
               <Divider />
               <Flex direction={'column'} className={'w-full max-h-[18rem] overflow-y-auto'}>
                  {dropDownValues.length > 0 ? (
                     dropDownValues.map((item: SearchableDropDownItemDataType, index: number) => (
                        <Flex
                           key={index}
                           className={'cursor-pointer hover:bg-grey-6x-light rounded'}
                           onClick={() => handleItemClick(item)}
                        >
                           {multiSelect ? (
                              <Flex align={'center'} pl={12} pr={2}>
                                 <Checkbox
                                    id={`checkbox-${index + 1}`}
                                    color={colours.shadeBlue}
                                    checked={selectedValues.includes(item)}
                                 />
                              </Flex>
                           ) : (
                              <>
                                 {selectedValues?.[0]?.value === item.value && (
                                    <Flex align={'center'} pl={12}>
                                       <MdCheck />
                                    </Flex>
                                 )}
                              </>
                           )}
                           {item.item}
                        </Flex>
                     ))
                  ) : (
                     <Center>{data.length ? 'No matches!' : 'Empty!'}</Center>
                  )}
               </Flex>
               {dropDownFooter}
            </Flex>
         )}
      </Box>
   );
};

SearchableDropDown.Label = ({ children }) => <Flex align={'center'}>{children}</Flex>;

SearchableDropDown.Item = ({ children }) => (
   <Box px={12} py={6}>
      {children}
   </Box>
);

SearchableDropDown.displayName = 'SearchableDropDown';
SearchableDropDown.Label.displayName = 'SearchableDropDown.Label';
SearchableDropDown.Item.displayName = 'SearchableDropDown.Item';

export default SearchableDropDown;
