export interface VisionContentCoreValuesList {
   key: string;
   value: string;
}

export interface VisionContentCoreValues {
   coreValuesList: VisionContentCoreValuesList[];
}

export interface VisionContentCoreFocus {
   mainDescription: string;
   whyDoWeExist: string;
   whatBusinessAreWeIn: string;
}

export interface VisionContentTargetMarketValue {
   targetMarketValue: string;
}

export interface VisionContentTargetMarket {
   key: string;
   values: VisionContentTargetMarketValue[];
}

export interface VisionContentUniqueValue {
   uniqueValue: string;
}

export interface VisionContentMarketingStrategy {
   mainDescription: string;
   targetMarket: VisionContentTargetMarket[];
   northStar: string;
   threeUniques: VisionContentUniqueValue[];
   guarantee: string;
}

export interface VisionContentTermTarget {
   title: string;
   content: {
      mainDescription: string;
      targetDate: Date | null;
      revenue: number | null;
      profit: number | null;
      successMetrics: string;
      description: string;
   };
}

export interface VisionContentMoreInfo {
   key: string;
   value: string;
}

export interface Vision {
   id?: string;
   title: string;
   content:
      | VisionContentCoreValues
      | VisionContentCoreFocus
      | VisionContentMarketingStrategy
      | VisionContentTermTarget[]
      | VisionContentMoreInfo[];
   type: string;
}
