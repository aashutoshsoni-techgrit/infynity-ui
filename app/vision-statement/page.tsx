import React, { Suspense } from 'react';
import { Metadata } from 'next';
import VisionStatement from '@/src/containers/vision-statement';

export const metadata: Metadata = {
   title: 'Infynity | Vision Statement'
};

const VisionStatementPage: React.FC = () => {
   return (
      <>
         <Suspense>
            <VisionStatement />
         </Suspense>
      </>
   );
};

export default VisionStatementPage;
