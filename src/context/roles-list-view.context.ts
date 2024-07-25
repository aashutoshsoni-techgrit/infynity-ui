'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

export interface RolesListContextType {
   setRolesFetch?: Dispatch<SetStateAction<{ fetch: boolean }>>;
   isDataFetching?: () => boolean;
}

export const RolesListContext = createContext<RolesListContextType>({});
