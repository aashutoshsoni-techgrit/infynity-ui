import { Dispatch, SetStateAction } from 'react';

export const companiesSortBy = ['Name', 'Industry'];

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type CompanyEditProps = { companies: any[]; setViewCompany: Dispatch<SetStateAction<any>> };

export const industryColors: { [key: string]: string } = {
   shadeBlue: '#4361EE',
   success: '#24B765',
   info: '#48CAE4',
   midnightBlue: '#191970',
   dodgerBlue: '#1E90FF',
   error: '#EF233C',
   turquoise: '#48CAE4'
};
