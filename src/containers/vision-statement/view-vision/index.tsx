import React, { FC, useRef, useEffect } from 'react';
import { Button, Card, Divider, SimpleGrid } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { MdCreate } from 'react-icons/md';
import { CustomVision } from '../edit-vision/vision-context';
import colours from '@/src/constants/palette';
import {
   Vision,
   VisionContentCoreFocus,
   VisionContentCoreValues,
   VisionContentMarketingStrategy,
   VisionContentMoreInfo,
   VisionContentTermTarget
} from '../vision-types';
import CoreFocus from './CoreFocus';
import CoreValues from './CoreValues';
import MarketingStrategy from './MarketingStrategy';
import TermTarget from './TermTarget';
import MoreInfo from './MoreInfo';

interface ViewVisionProps {
   visionData: Vision[];
}

const ViewVision: FC<ViewVisionProps> = ({ visionData }) => {
   const coreValues = visionData.find(
      (x) => x.type == 'CoreValues'
   ) as CustomVision<VisionContentCoreValues>;
   const coreFocus = visionData.find(
      (x) => x.type == 'CoreFocus'
   ) as CustomVision<VisionContentCoreFocus>;
   const marketingStrategy = visionData.find(
      (x) => x.type == 'MarketingStrategy'
   ) as CustomVision<VisionContentMarketingStrategy>;
   const termTarget = visionData.find((x) => x.type == 'TermTarget') as CustomVision<
      VisionContentTermTarget[]
   >;
   const moreInfo = visionData.find((x) => x.type == 'MoreInfo') as CustomVision<
      VisionContentMoreInfo[]
   >;
   const cardRef = useRef<HTMLDivElement>(null);
   const router = useRouter();

   useEffect(() => {
      if (cardRef.current) {
         cardRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, []);

   return (
      <Card
         p={'2rem 3rem'}
         radius='lg'
         withBorder
         className='border rounded-[0.8rem] border-solid border-grey -mt-6'
         ref={cardRef}
      >
         <div className='flex items-center justify-between'>
            <h4 className='text-h4 mb-6 font-bold text-title-blue'>Our Vision</h4>
            <Button
               variant={'outline'}
               leftSection={<MdCreate color={colours.shadeBlue} />}
               color={colours.shadeBlue}
               style={{ color: colours.grey }}
               onClick={() => {
                  router.replace('/vision-statement?edit=true');
               }}
            >
               Edit vision
            </Button>
         </div>
         <SimpleGrid cols={1}>
            <CoreValues coreValues={coreValues} />
            <Divider className='mb-2' />
            <CoreFocus coreFocus={coreFocus} />
            <Divider className='mb-2' />
            <MarketingStrategy marketingStrategy={marketingStrategy} />
            <Divider className='mb-2' />
            <TermTarget termTarget={termTarget} />
            <Divider className='mb-2' />
            <MoreInfo moreInfo={moreInfo} />
         </SimpleGrid>
      </Card>
   );
};

export default ViewVision;
