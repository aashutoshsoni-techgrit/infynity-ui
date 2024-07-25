/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ViewCompaniesProps {
   view: number;
   companies: any;
}

export type CompanyProps = {
   title: string;
   subtitle?: string;
   profilePhoto?: string;
   center?: boolean;
};
