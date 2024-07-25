/* eslint-disable max-lines-per-function */
import React, { FC, useContext, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { ActionIcon, Avatar, Box, Flex, Menu, Drawer } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { MdAdd, MdOutlinePeople } from 'react-icons/md';
import colours from '@/src/constants/palette';
import OrganizationUserCardScore from '@/src/containers/organization-chart/OrganizationUserCardScore';
import { OrganizationChartCardProps } from '@/src/containers/organization-chart/organization-chart.types';
import DepartmentForm from '../departments-and-teams/departments/add-department/DepartmentForm';
import { AddDepartmentFormContext } from '@/src/context/departments.context';
import {
   orgChartNodesData,
   OrganizationForms,
   OrgChartNodeTypes
} from '@/src/utils/organization-chart.utils';
import TeamsForm from '../departments-and-teams/teams/create-teams/CreateTeamsForm';
import OrganizationMenuCard from './OrganizationMenuCard';
import { Gradients } from '@/src/utils/org-chart-colors.utils';
import { OrgChartContext, OrgChartNodesContext } from '@/src/context/org-chart.context';
import OrgChartAddEmployee from '@/src/containers/organization-chart/org-chart-add-employee';
import {
   subDepartmentIcon,
   addPeopleIcon,
   addEmployeeIcon,
   orgChartDownArrowIcon,
   orgChartUpArrowIcon
} from '@/src/constants/icons';
import { EVENT_CONSTANTS } from '@/src/constants';

const OrganizationUserCard: FC<OrganizationChartCardProps> = ({ data }) => {
   const router = useRouter();
   const [showMenu, setShowMenu] = useState<boolean>(false);
   const [isNodeExpanded, setIsNodeExpanded] = useState<boolean>(false);
   const [currentForm, setCurrentForm] = useState<OrganizationForms>(OrganizationForms.NONE);
   const { setReFetch } = useContext(OrgChartContext);
   const { setExpandedNodes } = useContext(OrgChartNodesContext);
   let nodeName = '';
   let email = '';
   let title = '';
   let profilePhoto = '';
   let departmentName = '';
   let profileId = '';

   switch (data.type) {
      case OrgChartNodeTypes.EMPLOYEE:
      case OrgChartNodeTypes.TEAM_EMPLOYEE:
         nodeName = `${data.employeeDetails.firstName} ${data.employeeDetails.lastName}`;
         email = data.employeeDetails.email;
         title = data.employeeDetails.title;
         profilePhoto = data.employeeDetails.profilePhoto;
         profileId = data.employeeDetails.id;
         break;
      case OrgChartNodeTypes.DEPARTMENT:
         nodeName = `${data.departmentDetails.departmentHeadDetails?.firstName} ${data.departmentDetails.departmentHeadDetails?.lastName}`;
         email = data.departmentDetails.departmentHeadDetails?.email;
         title = data.departmentDetails.departmentHeadDetails?.title;
         profilePhoto = data.departmentDetails.departmentHeadDetails?.profilePhoto;
         departmentName = data.departmentDetails.departmentName;
         profileId = data.departmentDetails.departmentHead;
         break;
      case OrgChartNodeTypes.TEAM:
         nodeName = `${data.teamDetails.teamHeadDetails?.firstName} ${data.teamDetails.teamHeadDetails?.lastName}`;
         email = data.teamDetails.teamHeadDetails?.email;
         title = data.teamDetails?.title;
         profilePhoto = data.teamDetails.teamHeadDetails?.profilePhoto;
         profileId = data.teamDetails.head;
         break;
   }

   const handleFormClose = () => {
      setCurrentForm(OrganizationForms.NONE);
      setReFetch?.({ fetch: true });
   };

   const redirectToEmployeeDetails = (event: { stopPropagation: () => void }, empID: string) => {
      event?.stopPropagation?.();
      router.replace('/employees/' + empID);
   };

   const handleMenuIconClick = (event: { stopPropagation: () => void }) => {
      event?.stopPropagation?.();
      const hideEvent = document.createEvent('Event');
      hideEvent.initEvent(EVENT_CONSTANTS.orgChartPanelClickEvent, true, true);
      document.dispatchEvent(hideEvent);
      setTimeout(() => setShowMenu((prev) => !prev), 10);
   };

   const handleMenuItemClick = (
      event: { stopPropagation: () => void },
      form: number,
      parentOrgChartId: string
   ) => {
      event?.stopPropagation?.();
      orgChartNodesData.parentOrgChartId = parentOrgChartId;
      setShowMenu(false);
      setCurrentForm(form);
   };

   useEffect(() => {
      document.addEventListener(EVENT_CONSTANTS.orgChartPanelClickEvent, () => {
         setShowMenu(false);
      });
   }, []);

   return (
      <>
         <Handle
            type='target'
            position={Position.Top}
            style={{ visibility: 'hidden' }}
            onConnect={(params) => console.log('handle onConnect', params)}
         />
         <Box
            className={
               'relative border-[1.4px] border-solid border-shade-blue inline-block py-5 pl-6 pr-4 rounded-[0.8rem] min-w-[21rem] max-w-[21rem] min-h-[13.3rem] max-h-[13.3rem] bg-white cursor-pointer'
            }
         >
            <Box className={'absolute -top-12 left-6 bg-white cursor-pointer'}>
               <Avatar
                  src={profilePhoto}
                  alt={''}
                  size={90}
                  onClick={(event) => redirectToEmployeeDetails(event, profileId)}
               />
            </Box>
            <Flex>
               <Flex direction={'column'} align={'flex-start'} className={'w-[85%] pt-8 bg-white'}>
                  <Flex direction={'column'} align={'flex-start'} rowGap={4} className={'w-full'}>
                     <Box className={'w-full'}>
                        <h6
                           className={
                              'text-h6 font-semibold text-black cursor-pointer truncate hover:underline'
                           }
                           onClick={(event) => redirectToEmployeeDetails(event, profileId)}
                        >
                           {nodeName}
                        </h6>
                        {data.type === OrgChartNodeTypes.TEAM ? (
                           <Box className={'inline-block'}>
                              <p
                                 className={`bg-grey-4x-light text-black inline-block rounded text-sm w-full truncate py-0.5 px-2 mt-1`}
                              >
                                 {title}
                              </p>
                           </Box>
                        ) : (
                           <p>{title}</p>
                        )}
                     </Box>
                     {departmentName && (
                        <Box>
                           <p
                              className={
                                 'bg-shade-blue text-white inline-block rounded text-sm w-full truncate py-0.5 px-2'
                              }
                           >
                              {departmentName}
                           </p>
                        </Box>
                     )}
                     <Box className={'w-full -mt-2'}>
                        <p className={'underline truncate'}>{email}</p>
                     </Box>
                     <Flex align={'center'} columnGap={4}>
                        <MdOutlinePeople size={18} />
                        <p>0</p>
                     </Flex>
                  </Flex>
               </Flex>
               <Flex
                  className={'bg-white w-[15%]'}
                  direction={'column'}
                  rowGap={4}
                  align={'flex-end'}
               >
                  <OrganizationMenuCard data={data} />
                  <OrganizationUserCardScore score={0} color={Gradients.GREEN} />
                  <OrganizationUserCardScore score={0} color={Gradients.YELLOW} />
                  <OrganizationUserCardScore score={0} color={Gradients.RED} />
               </Flex>
            </Flex>
            <Flex className={'absolute bottom-0 left-0 w-full'}>
               <Flex justify={'space-between'} className={'w-full relative'}>
                  <Box className={'invisible'} />
                  {orgChartNodesData.childrenCount[data.id] > 0 && (
                     <Box className={'inline-block relative'}>
                        <Flex
                           align={'center'}
                           columnGap={4}
                           className={
                              'bg-white z-10 border-[1.4px] border-solid border-shade-blue rounded-xl h-7 text-shade-blue cursor-pointer absolute -left-1 -bottom-4'
                           }
                           px={10}
                           onClick={() => {
                              setIsNodeExpanded((prev) => !prev);
                              setExpandedNodes?.(true);
                           }}
                        >
                           {isNodeExpanded ? orgChartUpArrowIcon : orgChartDownArrowIcon}
                           <p className={'text-xs'}>{orgChartNodesData.childrenCount[data.id]}</p>
                        </Flex>
                     </Box>
                  )}
                  <Menu opened={showMenu} position={'bottom'}>
                     <Menu.Target>
                        <ActionIcon
                           style={{ borderRadius: '50%' }}
                           size={'lg'}
                           color={colours.shadeBlue}
                           className={'absolute left-4 -bottom-4'}
                           onClick={handleMenuIconClick}
                        >
                           <MdAdd size={26} />
                        </ActionIcon>
                     </Menu.Target>
                     <Menu.Dropdown className={'shadow-xl'}>
                        {(data.type === OrgChartNodeTypes.DEPARTMENT ||
                           data.employeeDetails?.isTopLevelEmployee) && (
                           <Menu.Item>
                              <Flex align={'center'} columnGap={6} className={'text-grey'}>
                                 {subDepartmentIcon}
                                 <p
                                    onClick={(event) =>
                                       handleMenuItemClick(
                                          event,
                                          data.employeeDetails?.isTopLevelEmployee
                                             ? OrganizationForms.ADD_DEPARTMENT_FORM
                                             : OrganizationForms.ADD_SUB_DEPARTMENT_FORM,
                                          data.id
                                       )
                                    }
                                 >
                                    Add {!data.employeeDetails?.isTopLevelEmployee && 'Sub-'}
                                    Department
                                 </p>
                              </Flex>
                           </Menu.Item>
                        )}
                        <Menu.Item>
                           <Flex align={'center'} columnGap={6} className={'text-grey'}>
                              {addPeopleIcon}
                              <p
                                 onClick={(event) =>
                                    handleMenuItemClick(
                                       event,
                                       OrganizationForms.ADD_TEAM_FORM,
                                       data.id
                                    )
                                 }
                              >
                                 Add Team
                              </p>
                           </Flex>
                        </Menu.Item>
                        <Menu.Item>
                           <Flex align={'center'} columnGap={6} className={'text-grey'}>
                              {addEmployeeIcon}
                              <p
                                 onClick={(event) =>
                                    handleMenuItemClick(
                                       event,
                                       OrganizationForms.ADD_EMPLOYEE_FORM,
                                       data.id
                                    )
                                 }
                              >
                                 Add Employee
                              </p>
                           </Flex>
                        </Menu.Item>
                     </Menu.Dropdown>
                  </Menu>
               </Flex>
            </Flex>
         </Box>
         <Handle type='source' position={Position.Bottom} style={{ visibility: 'hidden' }} />

         <Box className={'w-full z-50'} onClick={(event) => event.stopPropagation()}>
            <Drawer
               opened={currentForm !== OrganizationForms.NONE}
               onClose={handleFormClose}
               position={'right'}
               size={'lg'}
               padding={20}
               closeOnClickOutside={false}
               closeOnEscape={false}
            >
               {currentForm === OrganizationForms.ADD_EMPLOYEE_FORM && (
                  <OrgChartAddEmployee handleFormClose={handleFormClose} />
               )}
               {(currentForm === OrganizationForms.ADD_DEPARTMENT_FORM ||
                  currentForm === OrganizationForms.ADD_SUB_DEPARTMENT_FORM) && (
                  <AddDepartmentFormContext.Provider value={{ handleFormClose }}>
                     <DepartmentForm
                        isSubDepartment={currentForm === OrganizationForms.ADD_SUB_DEPARTMENT_FORM}
                        showHodDropdownFooter
                     />
                  </AddDepartmentFormContext.Provider>
               )}
               {currentForm === OrganizationForms.ADD_TEAM_FORM && (
                  <TeamsForm
                     createEmployee={true}
                     employeeId={data.id}
                     closeDrawer={handleFormClose}
                     selectedUsers={[]}
                  />
               )}
            </Drawer>
         </Box>
      </>
   );
};

export default OrganizationUserCard;
