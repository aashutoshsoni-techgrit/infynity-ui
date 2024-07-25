/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactFlow, {
   addEdge,
   Connection,
   Controls,
   Edge,
   getConnectedEdges,
   getOutgoers,
   Node,
   useEdgesState,
   useNodesState,
   useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box } from '@mantine/core';
import OrganizationUserCard from '@/src/containers/organization-chart/OrganizationUserCard';
import { OrganizationChartUserType } from '@/src/containers/organization-chart/organization-chart.types';
import {
   getLayoutElements,
   hiddenNodes,
   orgChartNodesData
} from '@/src/utils/organization-chart.utils';
import { OrgChartContext, OrgChartNodesContext } from '@/src/context/org-chart.context';
import { EVENT_CONSTANTS } from '@/src/constants';

const nodeTypes = {
   employeeCard: OrganizationUserCard
};

let expandNode: Node;

const DrawOrganizationChart = () => {
   const { fitView } = useReactFlow();
   const [nodes, setNodes, onNodesChange] = useNodesState([]);
   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
   const [temp, setTemp] = useState<string>('');
   const [expandedNodes, setExpandedNodes] = useState<boolean>(false);
   const onConnect = useCallback(
      (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
      []
   );
   const { getOrgChartData } = useContext(OrgChartContext);
   const orgChartData: OrganizationChartUserType[] = getOrgChartData?.() ?? [];

   const onLayout = useCallback(
      (nodes: Node[], edges: Edge[]) => {
         const layout = getLayoutElements(nodes, edges);

         if (!layout?.nodes || !layout?.edges) {
            return;
         }

         setNodes([...layout.nodes]);
         setEdges([...layout.edges]);
         setTemp(Math.random().toString());
      },
      [nodes, edges]
   );

   const onPaneClick = () => {
      const event = document.createEvent('Event');
      event.initEvent(EVENT_CONSTANTS.orgChartPanelClickEvent, true, true);
      document.dispatchEvent(event);
   };

   const handleNodeClick = async (_event: any, node: Node) => {
      if (!expandedNodes) {
         expandNode = node;
         return;
      }

      setExpandedNodes(false);

      const hideNode =
         (hidden: boolean, childEdgeID: string[], childNodeID: string[]) => (nodeOrEdge: any) => {
            if (childEdgeID.includes(nodeOrEdge.id) || childNodeID.includes(nodeOrEdge.id)) {
               if (hidden && hiddenNodes.has(nodeOrEdge.id)) {
                  hiddenNodes.delete(nodeOrEdge.id);
               }
               nodeOrEdge.hidden = hidden;
            }
            return nodeOrEdge;
         };

      const getSourceNode = (edge: Edge[], id: string) => edge.filter((ed) => ed.target !== id);

      let hide: boolean = false;

      if (!hiddenNodes.has(node.id)) {
         hiddenNodes.add(node.id);
         hide = true;
      } else {
         hiddenNodes.delete(node.id);
      }

      const nodeStack: Node[] = [];
      const outGoers: Node[] = [];
      const connectedEdges: Edge[] = [];

      nodeStack.push(node);

      while (nodeStack.length) {
         const lastNode = nodeStack.pop();

         if (!lastNode) {
            continue;
         }

         const childNodes = getOutgoers(lastNode, nodes, edges);
         const childEdges = getSourceNode(getConnectedEdges([lastNode], edges), node.id);

         childNodes.map((goer) => {
            !nodeStack.includes(goer) && nodeStack.push(goer);
            !outGoers.includes(goer) && outGoers.push(goer);
         });
         childEdges.map((edge) => {
            !connectedEdges.includes(edge) && connectedEdges.push(edge);
         });
      }

      const childNodesIDs = outGoers.map((node) => node.id);
      const childEdgesIDs = connectedEdges.map((edge) => edge.id);

      setNodes((node) => node.map(hideNode(hide, childEdgesIDs, childNodesIDs)));
      setEdges((edge) => edge.map(hideNode(hide, childEdgesIDs, childNodesIDs)));
   };

   useEffect(() => {
      expandedNodes && handleNodeClick(null, expandNode);
   }, [expandedNodes]);

   useEffect(() => {
      fitView();
   }, [nodes, edges]);

   useEffect(() => {
      const nodes: Node[] = [];
      const edges: Edge[] = [];

      const createNodesAndEdges = (data: any, parentNode: string | null = null) => {
         if (!data.node) {
            return;
         }

         const node: Node = {
            id: data.node.id,
            data: data.node,
            type: 'employeeCard',
            position: {
               x: 0,
               y: 0
            },
            draggable: false
         };

         nodes.push(node);

         if (parentNode) {
            const edge: Edge = {
               source: parentNode,
               target: data.node.id,
               id: data.node.id,
               type: 'step'
            };

            edges.push(edge);
         }

         orgChartNodesData.childrenCount[data.node.id] = data.children?.length ?? 0;
         data.children?.forEach((children: any) => {
            createNodesAndEdges(children, data.node.id);
         });
      };

      orgChartNodesData.childrenCount = {};
      createNodesAndEdges(orgChartData);
      onLayout(nodes, edges);
   }, [getOrgChartData]);

   return (
      <Box className={'w-full h-[69vh] layoutflow'}>
         <div className='invisible'>{temp}</div>
         <OrgChartNodesContext.Provider value={{ setExpandedNodes }}>
            <ReactFlow
               nodes={nodes}
               edges={edges}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               onConnect={onConnect}
               nodeTypes={nodeTypes}
               fitView
               minZoom={0.1}
               onNodeClick={handleNodeClick}
               draggable={false}
               nodesConnectable={false}
               nodesDraggable={true}
               zoomOnScroll={false}
               zoomOnPinch={true}
               preventScrolling={false}
               panOnScroll={false}
               onPaneClick={onPaneClick}
            >
               <Controls />
            </ReactFlow>
         </OrgChartNodesContext.Provider>
      </Box>
   );
};

export default DrawOrganizationChart;
