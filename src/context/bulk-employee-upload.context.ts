import { createContext, Dispatch, SetStateAction } from 'react';

export interface BulkEmployeeUploadContextType {
   setUploadCSVFormProgress?: Dispatch<SetStateAction<number>>;
   setMapFieldsFormProgress?: Dispatch<SetStateAction<number>>;
   setCurrentForm?: Dispatch<SetStateAction<number>>;
   handleFormClose?: (reFetch?: { fetch: boolean }) => void;
}

export const BulkEmployeeUploadContext = createContext<BulkEmployeeUploadContextType>({});
