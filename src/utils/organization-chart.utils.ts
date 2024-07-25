import { Edge, Node } from 'reactflow';
import { LayoutElements } from '@/src/containers/organization-chart/organization-chart.types';
import { HierarchyNode, stratify, tree } from 'd3-hierarchy';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { Required } from '@/src/utils/onboard-employee-form.utils';

export enum OrganizationForms {
   NONE,
   ADD_EMPLOYEE_FORM,
   ADD_DEPARTMENT_FORM,
   ADD_SUB_DEPARTMENT_FORM,
   VIEW_DEPARTMENT_DETAILS,
   ADD_TEAM_FORM,
   EDIT_TEAM_FORM,
   TEAM_LIST_FORM
}

export enum OrgChartNodeTypes {
   EMPLOYEE = 'employee',
   DEPARTMENT = 'department',
   TEAM = 'team',
   TEAM_EMPLOYEE = 'team_employee'
}

export const getLayoutElements = (nodes: Node[], edges: Edge[]): LayoutElements | undefined => {
   if (nodes.length === 0) {
      return { nodes, edges };
   }

   // const clientRect = document
   //    ?.querySelector(`[data-id="${nodes[0].id}"]`)
   //    ?.getBoundingClientRect();
   //
   // if (!clientRect) {
   //    return { nodes, edges };
   // }

   // const { width, height } = clientRect;
   const width = 500,
      height = 300;
   const hierarchy = stratify<Node>()
      .id((node: Node) => node.id)
      .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
   let root: HierarchyNode<Node> | null = null;

   try {
      root = hierarchy(nodes);
   } catch (error) {
      toastService.showToast({
         color: colours.error,
         title: 'Unable draw org chart due to incorrect data'
      });
      return;
   }

   const layout = tree<Node>().nodeSize([width, height])(root);

   return {
      nodes: layout
         .descendants()
         .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
      edges
   };
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const orgChartAddEmployeeFormFields: any = {
   initialValues: {
      employee: []
   },
   validate: {
      employee: Required
   }
};

export enum OrgChartAddEmployeeForms {
   SELECT_EMPLOYEE_FORM,
   CREATE_EMPLOYEE_FORM
}

export const hiddenNodes: Set<string> = new Set<string>();

export const orgChartNodesData: {
   childrenCount: { [key: string]: number };
   parentOrgChartId: string;
} = {
   childrenCount: {},
   parentOrgChartId: ''
};
