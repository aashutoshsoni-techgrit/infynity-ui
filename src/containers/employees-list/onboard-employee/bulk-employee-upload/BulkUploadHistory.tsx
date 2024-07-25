import React from 'react';
import { Box, Center, Divider, Drawer, Flex, Loader, Menu, Skeleton } from '@mantine/core';
import { MdOutlineFileDownload, MdOutlineMoreVert } from 'react-icons/md';
import colours from '@/src/constants/palette';
import {
   downloadBulkUploadHistoryFile,
   getBulkUploadHistory
} from '@/src/services/bulk-employee-onboard.service';
import { useDisclosure } from '@mantine/hooks';
import { BulkUploadHistoryStatus, HistoryCardType } from '@/src/utils/bulk-employee-upload';
import { getDateInFormat } from '@/src/utils/dates.utils';
import { useQuery } from '@tanstack/react-query';
import { uploadHistoryIcon } from '@/src/constants/icons';

const BulkUploadHistory = () => {
   const [opened, { open, close }] = useDisclosure(false);

   const { data: uploadHistory, isFetching } = useQuery({
      queryKey: ['bulkUploadHistory'],
      queryFn: async () => await getBulkUploadHistory(),
      enabled: opened
   });

   return (
      <>
         <Drawer opened={opened} onClose={close} position={'right'} size={'lg'} padding={20}>
            <Flex direction={'column'} px={36} pb={42}>
               {uploadHistory?.length ? (
                  <>
                     <h5 className={'text-h5 font-semibold text-midnight-blue mb-5'}>
                        Upload History
                     </h5>
                     {uploadHistory?.map?.((history: HistoryCardType, index: number) => (
                        <Box key={index}>
                           <Flex className={'w-full py-3'}>
                              <Flex direction={'column'} className={'w-[80%]'}>
                                 <p className={'text-base font-semibold text-black'}>
                                    {history.fileName}
                                 </p>
                                 {history.status !== BulkUploadHistoryStatus.IN_PROGRESS && (
                                    <>
                                       <p>Succeeded: {history.importSuccessCount}</p>
                                       <p>Failed: {history.importFailureCount}</p>
                                    </>
                                 )}
                                 <p>Uploaded data: {getDateInFormat(history.createdAt)}</p>
                              </Flex>
                              <Flex align={'center'} justify={'flex-end'} className={'w-[20%]'}>
                                 {history.status === BulkUploadHistoryStatus.IN_PROGRESS ? (
                                    <Flex align={'center'} justify={'center'} columnGap={8}>
                                       <Loader color={colours.shadeBlue} size={16} />
                                       <p className={'text-shade-blue text-xs font-semibold'}>
                                          Importing
                                       </p>
                                    </Flex>
                                 ) : (
                                    <MdOutlineFileDownload
                                       color={colours.shadeBlue}
                                       size={25}
                                       className={'cursor-pointer'}
                                       onClick={async () => {
                                          await downloadBulkUploadHistoryFile(history.fileLocation);
                                       }}
                                    />
                                 )}
                              </Flex>
                           </Flex>
                           {index < uploadHistory.length - 1 && <Divider />}
                        </Box>
                     ))}
                  </>
               ) : (
                  <Center>
                     {isFetching ? (
                        <Flex direction={'column'} rowGap={12} className={'w-full'}>
                           {[1, 2, 3].map((i) => (
                              <Flex key={i} direction={'column'} rowGap={8} className={'w-full'}>
                                 <Skeleton height={18} radius={'xl'} width={'50%'} />
                                 <Skeleton height={12} radius={'xl'} width={'25%'} />
                                 <Skeleton height={12} radius={'xl'} width={'25%'} />
                                 {i < 3 && <Divider className={'mt-3'} />}
                              </Flex>
                           ))}
                        </Flex>
                     ) : (
                        <h4 className={'text-h4 font-bold'}>No recent uploads!</h4>
                     )}
                  </Center>
               )}
            </Flex>
         </Drawer>
         <Menu position={'bottom-end'}>
            <Menu.Target>
               <Box className={'inline-block hover:bg-grey-4x-light rounded-[50%] p-1.5'}>
                  <MdOutlineMoreVert size={20} className={'cursor-pointer'} />
               </Box>
            </Menu.Target>
            <Menu.Dropdown>
               <Menu.Item onClick={open}>
                  <Flex align={'center'} columnGap={4} className={'text-grey'}>
                     {uploadHistoryIcon}
                     <p>Upload History</p>
                  </Flex>
               </Menu.Item>
            </Menu.Dropdown>
         </Menu>
      </>
   );
};

export default BulkUploadHistory;
