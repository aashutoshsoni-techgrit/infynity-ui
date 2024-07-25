import React, { FC, ReactNode } from 'react';
import { Progress } from '@mantine/core';
import colours from '@/src/constants/palette';

const ProgressBar: FC<{ label: ReactNode; progress: number }> = ({ label, progress }) => (
   <>
      {label}
      <Progress className={'mt-1'} value={progress} color={colours.shadeBlue} />
   </>
);

export default ProgressBar;
