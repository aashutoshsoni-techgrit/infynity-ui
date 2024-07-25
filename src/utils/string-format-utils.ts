export const capitalizeFirstLetter = (string: string): string => {
   return string.toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase());
};

export const formatIndustryTypes = (
   industryTypes: string[]
): { value: string; label: string }[] => {
   return industryTypes.map((industry) => ({
      value: industry,
      label: capitalizeFirstLetter(industry)
   }));
};

export const capitalize = (title: string): string => {
   return title.replace(/\b\w/g, (char: string) => char.toUpperCase());
};
