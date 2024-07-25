import React, { FC } from 'react';
import colours from '@/src/constants/palette';

const CircularProgress: FC<{ progress: number }> = ({ progress }) => {
   const dashoffset = 282.6 - progress * 2.826;

   return (
      <div className={'relative w-16 h-16'}>
         <svg viewBox={'0 0 100 100'} xmlns={'http://www.w3.org/2000/svg'}>
            <circle
               cx={'50'}
               cy={'50'}
               r={'45'}
               fill={'none'}
               stroke={colours.grey3XLight}
               strokeWidth={'10'}
            />
            <circle
               cx={'50'}
               cy={'50'}
               r={'45'}
               fill={'none'}
               stroke={progress === 100 ? colours.success : colours.shadeBlue}
               strokeWidth={'10'}
               strokeDasharray={'282.6'}
               strokeDashoffset={dashoffset}
               transform={'rotate(-90 50 50)'}
               style={{ transition: 'stroke-dashoffset 0.3s ease-in-out' }}
            />
            <text
               x={'50%'}
               y={'50%'}
               dominantBaseline={'middle'}
               textAnchor={'middle'}
               fill={colours.grey}
               fontSize={'22'}
               opacity={'1'}
               fontWeight={'bold'}
            >
               {progress}%
            </text>
         </svg>
      </div>
   );
};

export default CircularProgress;
