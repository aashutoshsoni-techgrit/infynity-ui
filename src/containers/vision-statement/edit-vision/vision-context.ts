import { createFormContext } from '@mantine/form';
import {
   VisionContentCoreFocus,
   VisionContentCoreValues,
   VisionContentMarketingStrategy,
   VisionContentMoreInfo,
   VisionContentTermTarget
} from '../vision-types';

interface VisionFormValues {
   coreValues: CustomVision<VisionContentCoreValues>;
   coreFocus: CustomVision<VisionContentCoreFocus>;
   marketingStrategy: CustomVision<VisionContentMarketingStrategy>;
   termTarget: CustomVision<VisionContentTermTarget[]>;
   moreInfo?: CustomVision<VisionContentMoreInfo[]>;
}

export interface CustomVision<T> {
   id?: string;
   title: string;
   content: T;
   type: string;
}

// You can give context variables any name
export const [VisionFormProvider, useVisionFormContext, useVisionForm] =
   createFormContext<VisionFormValues>();
