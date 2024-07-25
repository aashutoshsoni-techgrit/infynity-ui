'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { CompanyAdminWrapper } from '@/src/components';
import EditVisionStatement from './edit-vision';
import ViewVision from './view-vision';
import { Vision } from './vision-types';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchVisionData } from '@/src/services/vision-statement.service';

const VisionStatementContent = () => {
   const [isReload, setIsReload] = useState<boolean>(true);
   const searchParams = useSearchParams();
   const isEdit = searchParams.get('edit') === 'true';

   const { data: visionStatement, refetch } = useQuery<Vision[]>({
      queryKey: ['visionData'],
      queryFn: async () => await fetchVisionData(),
      enabled: false
   });

   useEffect(() => {
      if (isReload) {
         refetch();
         setIsReload(false);
      }
   }, [isReload, refetch]);

   return (
      <CompanyAdminWrapper pageTitle={'Vision'}>
         {visionStatement && !isEdit ? (
            <ViewVision visionData={visionStatement} />
         ) : (
            <EditVisionStatement
               setIsReload={setIsReload}
               editVision={isEdit}
               visionStatement={visionStatement || []}
            />
         )}
      </CompanyAdminWrapper>
   );
};

const VisionStatement = () => {
   return (
      <Suspense>
         <VisionStatementContent />
      </Suspense>
   );
};

export default VisionStatement;
