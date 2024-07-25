import React, { FC } from 'react';
import { OrganizationUserCardScoreProps } from './organization-chart.types';

const OrganizationUserCardScore: FC<OrganizationUserCardScoreProps> = ({ score, color }) => (
   <div
      className='relative flex justify-center w-[1.875rem] h-[1.875rem] items-center rounded-full p-1.5'
      style={{ background: color }}
   >
      <div className='flex justify-center items-center w-5 h-5 bg-white rounded-full'>
         <div className='relative z-10 text-black font-bold text-xs text-center'>{score}</div>
      </div>
   </div>
);

export default OrganizationUserCardScore;
