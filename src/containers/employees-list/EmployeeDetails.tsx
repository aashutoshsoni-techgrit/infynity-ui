import React, { FC } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Avatar, Box, Drawer, Flex } from '@mantine/core';
import UserAvatar from '@/src/components/UserAvatar';
import { MdOutlineDateRange, MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import colours from '@/src/constants/palette';
import { EmployeeEditProps } from '@/src/utils/onboard-employee-form.utils';

const EmployeeDetails: FC<EmployeeEditProps> = ({ profilePhoto, employeeName }) => {
   const [opened, { open, close }] = useDisclosure(false);

   return (
      <>
         <Drawer opened={opened} onClose={close} position={'right'} size={'lg'}>
            <Flex direction={'column'} rowGap={20} px={56} py={32}>
               <UserAvatar progress={80} logo={profilePhoto} color={colours.success} />
               <Flex direction={'column'} rowGap={3}>
                  <h5 className={'text-h5 mt-3'}>John Doe</h5>
                  <p className={'text-base text-shade-blue'}>Software Developer</p>
                  <p className={'text-base'}>
                     <b>Role Based Access: </b>
                     Manager
                  </p>
                  <p className={'text-base'}>Delivery &lt; Supply Chain Management</p>
               </Flex>
               <Flex direction={'column'} rowGap={3}>
                  <Flex align={'center'} columnGap={8}>
                     <MdOutlineDateRange color={colours.shadeBlue} />
                     <p>04/22/23</p>
                  </Flex>
                  <Flex align={'center'} columnGap={8}>
                     <MdOutlineEmail color={colours.shadeBlue} />
                     <p className={'underline text-shade-blue'}>michaeljohnson@adobe.com</p>
                  </Flex>
                  <Flex align={'center'} columnGap={8}>
                     <MdOutlinePhone color={colours.shadeBlue} />
                     <p>+1 (555) 555-5555</p>
                  </Flex>
               </Flex>
               <Flex direction={'column'} rowGap={3}>
                  <b className={'text-black'}>Address</b>
                  <p className={'text-base'}>
                     123 Market St.,San Francisco, CA, United States, 94103.
                  </p>
               </Flex>
            </Flex>
         </Drawer>
         <Box className={`flex items-center gap-x-3 cursor-pointer`} onClick={open}>
            <Avatar src={profilePhoto} />
            <h6 className={'text-h6 font-semibold text-black hover:underline'}>{employeeName}</h6>
         </Box>
      </>
   );
};

export default EmployeeDetails;
