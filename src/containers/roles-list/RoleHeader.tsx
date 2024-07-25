import React from 'react';
import { Flex, Grid } from '@mantine/core';
import { MdArrowDownward } from 'react-icons/md';
import colours from '@/src/constants/palette';
import { RoleHeaderProps } from '@/src/utils/roles-permissions-form.utils';

const RoleHeader: React.FC<RoleHeaderProps> = ({ label, span, pl }) => (
   <Grid.Col span={span} pl={pl}>
      <Flex className={'h-full cursor-pointer'} align='center'>
         <p className={'font-bold mr-2'} style={{ color: colours.greyDark }}>
            {label}
         </p>
         <MdArrowDownward style={{ color: colours.shadeBlue }} />
      </Flex>
   </Grid.Col>
);

export default RoleHeader;
