import { Node, Edge } from 'reactflow';

export interface OrganizationChartUserType {
   id: string;
   userType: string;
   email: string;
   isTopLevelEmployee: boolean;
   isPrimaryUser: boolean;
   firstName: string;
   lastName: string;
   gender: string | null;
   profilePhoto: string | null;
   empId: string | null;
   title: string | null;
   role: string | null;
   reportsToId: string | null;
   reportsToEmail: string | null;
}

export interface OrganizationChartCardProps {
   /* eslint-disable @typescript-eslint/no-explicit-any */
   data: any;
}

export type LayoutElements = {
   nodes: Node[];
   edges: Edge[];
};

export interface OrganizationUserCardScoreProps {
   score: number;
   color?: string;
}

export interface AddEmployeeProps {
   handleFormClose: () => void;
}
