import React from 'react';
import { infinityLogo } from '@/src/constants/image-paths';
import Image from 'next/image';

const InfynityLogo: React.FC<{ className?: string }> = ({ className }) => (
   <Image
      src={infinityLogo}
      alt={'Logo'}
      width={100}
      height={40}
      className={`w-[9.833rem] ${className}`}
   />
);

export default InfynityLogo;
