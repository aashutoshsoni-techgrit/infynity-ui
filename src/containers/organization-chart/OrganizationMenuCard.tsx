import React, { FC, useState, useEffect } from 'react';
import { Box, Flex, Menu, Drawer } from '@mantine/core';
import {
   MdDocumentScanner,
   MdOutlineEdit,
   MdOutlineMoreVert,
   MdOutlinePersonAdd
} from 'react-icons/md';
import colours from '@/src/constants/palette';
import { OrganizationChartCardProps } from '@/src/containers/organization-chart/organization-chart.types';
import ViewTeams from '../departments-and-teams/teams/view-teams/Viewteams';
import { accountGroupOutlintIcon, deleteUserIcon } from '@/src/constants/icons';
import TeamsForm from '@/src/containers/departments-and-teams/teams/create-teams/CreateTeamsForm';
import { OrganizationForms, OrgChartNodeTypes } from '@/src/utils/organization-chart.utils';
import DepartmentDetails from '@/src/containers/departments-and-teams/departments/department-details';
import { DepartmentType } from '@/src/containers/departments-and-teams/departments/departments.types';
import { getDepartmentById } from '@/src/services/departments.service';
import { EVENT_CONSTANTS } from '@/src/constants';

let editTeamId: string;

const OrganizationMenuCard: FC<OrganizationChartCardProps> = ({ data }) => {
   const [currentForm, setCurrentForm] = useState<number>(OrganizationForms.NONE);
   const [showMenu, setShowMenu] = useState<boolean>(false);
   const [viewDepartment, setViewDepartment] = useState<DepartmentType>();

   useEffect(() => {
      document.addEventListener(EVENT_CONSTANTS.orgChartPanelClickEvent, () => {
         setShowMenu(false);
      });
   }, []);

   const handleViewDepartmentDetailsClick = async (
      event: { stopPropagation: () => void },
      departmentId: string
   ) => {
      showMenu && setShowMenu(false);
      const department = await getDepartmentById(departmentId);
      setViewDepartment(department);
      handleMenuItemClick(event, OrganizationForms.VIEW_DEPARTMENT_DETAILS);
   };

   const handleTeamListClose = () => setCurrentForm(OrganizationForms.NONE);

   const handleMenuItemClick = (
      event: { stopPropagation: () => void },
      formType: OrganizationForms
   ) => {
      event.stopPropagation();
      setCurrentForm(formType);
      showMenu && setShowMenu(false);
   };

   const handleMenuIconClick = (event: { stopPropagation: () => void }) => {
      event?.stopPropagation?.();
      const hideEvent = document.createEvent('Event');
      hideEvent.initEvent(EVENT_CONSTANTS.orgChartPanelClickEvent, true, true);
      document.dispatchEvent(hideEvent);
      setTimeout(() => setShowMenu((prev) => !prev), 10);
   };

   return (
      <>
         <Menu opened={showMenu} position={'bottom'}>
            <Menu.Target>
               <Box className={'inline-block hover:bg-grey-4x-light rounded-[50%] p-1.5'}>
                  <MdOutlineMoreVert
                     size={18}
                     className={'cursor-pointer'}
                     onClick={handleMenuIconClick}
                  />
               </Box>
            </Menu.Target>
            <Menu.Dropdown className={'shadow-xl'}>
               {data.type === OrgChartNodeTypes.TEAM && (
                  <Menu.Item
                     onClick={(event) => {
                        if (!data.teamDetails?.id) {
                           return;
                        }
                        editTeamId = data.teamDetails.id;
                        handleMenuItemClick(event, OrganizationForms.EDIT_TEAM_FORM);
                     }}
                  >
                     <Flex align={'center'} columnGap={6} className={'text-grey'}>
                        <MdOutlineEdit size={16} />
                        <p>Edit</p>
                     </Flex>
                  </Menu.Item>
               )}
               {data.type === OrgChartNodeTypes.TEAM && (
                  <Menu.Item
                     onClick={(event) =>
                        handleMenuItemClick(event, OrganizationForms.TEAM_LIST_FORM)
                     }
                  >
                     <Flex align={'center'} columnGap={6} className={'text-grey'}>
                        {accountGroupOutlintIcon}
                        <p>Teams</p>
                     </Flex>
                  </Menu.Item>
               )}
               {data.type === OrgChartNodeTypes.DEPARTMENT && (
                  <Menu.Item
                     onClick={(event) =>
                        handleViewDepartmentDetailsClick(event, data.departmentDetails.id)
                     }
                  >
                     <Flex align={'center'} columnGap={6} className={'text-grey'}>
                        <MdDocumentScanner color={colours.grey} size={14} />
                        <p>Details</p>
                     </Flex>
                  </Menu.Item>
               )}
               <Menu.Item>
                  <Flex align={'center'} columnGap={6} className={'text-grey'}>
                     <MdOutlinePersonAdd size={16} />
                     <p>Reassign</p>
                  </Flex>
               </Menu.Item>
               <Menu.Item>
                  <Flex align={'center'} columnGap={6} className={'text-grey'}>
                     {deleteUserIcon}
                     <p style={{ color: colours.error }}>Deactivate</p>
                  </Flex>
               </Menu.Item>
            </Menu.Dropdown>
         </Menu>

         <Box className={'w-full z-50'} onClick={(event) => event.stopPropagation()}>
            <Drawer
               opened={currentForm !== OrganizationForms.NONE}
               onClose={handleTeamListClose}
               position={'right'}
               size={'lg'}
               padding={20}
               closeOnClickOutside={false}
               closeOnEscape={false}
            >
               {currentForm === OrganizationForms.EDIT_TEAM_FORM && (
                  <TeamsForm edit teamId={editTeamId} closeDrawer={handleTeamListClose} />
               )}
               {currentForm === OrganizationForms.TEAM_LIST_FORM && (
                  <ViewTeams
                     employeeId={data.teamDetails?.head}
                     closeDrawer={handleTeamListClose}
                  />
               )}
               {currentForm === OrganizationForms.VIEW_DEPARTMENT_DETAILS && (
                  <>{viewDepartment && <DepartmentDetails department={viewDepartment} />}</>
               )}
            </Drawer>
         </Box>
      </>
   );
};

export default OrganizationMenuCard;
