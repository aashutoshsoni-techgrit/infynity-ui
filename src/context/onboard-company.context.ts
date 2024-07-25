'use client';

import { createContext } from 'react';

export interface OnboardCompanyContextType {
   getCompanyForm?: () => void;
   getUserForm?: () => void;
   handleFormSubmit?: (event?: { preventDefault: () => void }) => void;
   handleCompanyFormSubmit?: (event: { preventDefault: () => void }) => void;
}

export const OnboardCompanyContext = createContext<OnboardCompanyContextType>({});
