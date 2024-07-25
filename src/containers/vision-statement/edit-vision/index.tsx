import React from 'react';
import colours from '@/src/constants/palette';
import { Box, Button, Divider, Flex, SimpleGrid } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Dispatch, FC, SetStateAction } from 'react';
import { Vision } from '../vision-types';
import CoreFocusForm, { getIntialCoreFocus } from './CoreFocusForm';
import CoreValuesForm, { getIntialCoreValues } from './CoreValuesForm';
import MarketingStrategyForm, { getInitialMarketingStrategy } from './MarketingStrategyForm';
import MoreInfoForm, { getInitialMoreInfo } from './MoreInfoForm';
import TermTargetForm, { getInitialTermTarget } from './TermTargetForm';
import { VisionFormProvider, useVisionForm } from './vision-context';
import { useRouter } from 'next/navigation';
import { updateVisionData, addVisionData } from '@/src/services/vision-statement.service';

interface EditVisionStatementProps {
   setIsReload: Dispatch<SetStateAction<boolean>>;
   editVision: boolean;
   visionStatement?: Vision[];
}

const EditVisionStatement: FC<EditVisionStatementProps> = ({
   setIsReload,
   editVision,
   visionStatement
}) => {
   const initialCoreValues = getIntialCoreValues(visionStatement);
   const initialCoreFocus = getIntialCoreFocus(visionStatement);
   const initialMarketingStragey = getInitialMarketingStrategy(visionStatement);
   const initialTermTarget = getInitialTermTarget(visionStatement);
   const initialMoreInfo = getInitialMoreInfo(visionStatement);
   const router = useRouter();
   /* eslint-disable  @typescript-eslint/no-explicit-any */
   const form: UseFormReturnType<any> = useVisionForm({
      initialValues: {
         coreValues: {
            title: initialCoreValues?.title,
            content: initialCoreValues?.content,
            type: initialCoreValues?.type
         },
         coreFocus: {
            title: initialCoreFocus?.title,
            content: initialCoreFocus?.content,
            type: initialCoreFocus?.type
         },
         marketingStrategy: {
            title: initialMarketingStragey?.title,
            content: initialMarketingStragey?.content,
            type: initialMarketingStragey?.type
         },
         termTarget: {
            title: initialTermTarget?.title,
            content: initialTermTarget?.content,
            type: initialTermTarget?.type
         },
         moreInfo: {
            title: initialMoreInfo?.title,
            content: initialMoreInfo?.content,
            type: initialMoreInfo?.type
         }
      }
   });

   const handleFormSubmit = async (form: any) => {
      const coreValues = form.coreValues;
      const coreFocus = form.coreFocus;
      const marketingStrategy = form.marketingStrategy;
      const termTarget = form.termTarget;
      const moreInfo = form.moreInfo;
      const submitData = [] as Vision[];
      submitData.push({
         title: coreValues.title,
         type: coreValues.type,
         content: coreValues.content
      });
      submitData.push({
         title: coreFocus.title,
         type: coreFocus.type,
         content: coreFocus.content
      });
      submitData.push({
         title: marketingStrategy.title,
         type: marketingStrategy.type,
         content: marketingStrategy.content
      });
      submitData.push({
         title: termTarget.title,
         type: termTarget.type,
         content: termTarget.content
      });
      submitData.push({
         title: moreInfo.title,
         type: moreInfo.type,
         content: moreInfo.content
      });

      if (visionStatement && visionStatement.length > 0) {
         await updateVisionData(submitData);
      } else {
         await addVisionData(submitData);
      }
      router.replace('/vision-statement');
      setIsReload(true);
   };

   return (
      <VisionFormProvider form={form}>
         <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <Box p={'1rem 3rem'} className='w-full bg-white shadow rounded-[0.8rem] -mt-6'>
               <h3 className={'text-h4 text-midnight-blue font-semibold pt-10'}>
                  {editVision ? 'Edit Vision' : 'Add Vision'}
               </h3>

               <Box className='w-[60%]'>
                  <SimpleGrid cols={1}>
                     <CoreValuesForm />
                     <Divider className='mt-3' />
                     <CoreFocusForm />
                     <Divider className='mt-3' />
                     <MarketingStrategyForm />
                     <Divider className='mt-3' />
                     <TermTargetForm />
                     <Divider className='mt-3' />
                     <MoreInfoForm />
                  </SimpleGrid>
               </Box>
               <Flex justify={'space-between'} mt={36} className={'w-[60%]'}>
                  <Button
                     variant={'light'}
                     bg={colours.grey4XLight}
                     color={colours.grey}
                     size={'md'}
                     onClick={() => {
                        router.replace('/vision-statement');
                     }}
                  >
                     Cancel
                  </Button>
                  <Button color={colours.shadeBlue} size={'md'} type={'submit'}>
                     {editVision ? 'Update' : 'Add'}
                  </Button>
               </Flex>
            </Box>
         </form>
      </VisionFormProvider>
   );
};

export default EditVisionStatement;
