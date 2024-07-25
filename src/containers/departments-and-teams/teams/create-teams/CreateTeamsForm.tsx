import React, { useState } from 'react';
import { Avatar, Button, Flex, Textarea, TextInput } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import colours from '@/src/constants/palette';
import toastService from '@/src/services/toast.service';
import { SearchableDropDown } from '@/src/components';
import { getEmployees } from '@/src/services/employee-list.service';
import { useQuery } from '@tanstack/react-query';
import {
   AddTeamFormValueType,
   Teamtype,
   TeamsFormFields,
   TeamsFormProps,
   TeamsFormData
} from '../team.types';
import { addTeam, getTeamsData, updateTeam } from '@/src/services/teams.service';
import { orgChartNodesData } from '@/src/utils/organization-chart.utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TeamsForm: React.FC<TeamsFormProps> = ({ edit, employeeId, closeDrawer, teamId }) => {
   const teamsForm: UseFormReturnType<AddTeamFormValueType> = useForm(TeamsFormFields);
   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
   const [teamHead, setTeamHead] = useState<string>('');
   const [selectedTeamHead, setSelectedTeamHead] = useState<string[]>([]);

   if (edit && teamId) {
      useQuery({
         queryFn: async () => {
            const teamDetails = (await getTeamsData(teamId)) ?? [];
            teamsForm.setValues({
               title: teamDetails.title,
               description: teamDetails.description
            });
            setSelectedUsers(teamDetails.members.map((member: Teamtype) => member.id));
            setSelectedTeamHead([teamDetails.head]);
         },
         queryKey: ['team-details-byteamId', teamId]
      });
   }

   const handleSelectedEmployeesChange = (selectedEmployees: string[]) => {
      setSelectedUsers(selectedEmployees);
   };

   const handleSelectedHeadChange = (selectedTeamHead: string) => {
      setTeamHead(selectedTeamHead);
   };

   useQuery({
      queryFn: async () => {
         const employees = (await getEmployees()) ?? [];
         if (employees?.length) {
            TeamsFormData.teamemployees = employees.map((employee: Teamtype) => ({
               label: (
                  <SearchableDropDown.Label>
                     <Flex columnGap={6} align={'center'}>
                        <Avatar src={employee.profilePhoto} size={22} />
                        <p>
                           {employee.firstName} {employee.lastName}
                        </p>
                     </Flex>
                  </SearchableDropDown.Label>
               ),
               value: employee.id,
               item: (
                  <SearchableDropDown.Item>
                     <Flex align={'center'} columnGap={12}>
                        <Flex>
                           <Avatar src={employee.profilePhoto} />
                        </Flex>
                        <Flex direction={'column'}>
                           <p className={'font-medium'}>
                              {employee.firstName} {employee.lastName}
                           </p>
                           <p className={'text-xs text-shade-blue'}>{employee.email}</p>
                           <p className={'text-xs'}>{employee.title}</p>
                        </Flex>
                     </Flex>
                  </SearchableDropDown.Item>
               ),
               searchPatterns: [employee.firstName, employee.lastName]
            }));
         }

         return employees;
      },
      queryKey: ['add-team-employees']
   });

   const handleEmployeeFormSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      if (teamsForm.validate().hasErrors) {
         return;
      }

      if (selectedUsers.length === 0) {
         toastService.showToast({
            color: colours.error,
            title: 'Please select at least one user to proceed'
         });
         return;
      }

      const formData = new FormData();
      formData.append('title', teamsForm.values.title);
      formData.append('description', teamsForm.values.description);

      if (teamHead) {
         formData.append('headId', teamHead);
      }

      selectedUsers.forEach((userId, index) => {
         formData.append(`memberIds[${index}]`, userId);
      });
      if (orgChartNodesData.parentOrgChartId) {
         formData.append('orgChartNodeId', orgChartNodesData.parentOrgChartId);
         orgChartNodesData.parentOrgChartId = '';
      }

      if (edit && teamId) {
         await updateTeam(teamId, formData);
         toastService.showToast({
            color: colours.success,
            title: 'Success',
            subtitle: `Team details updated successfully`
         });
      } else if (await addTeam(formData)) {
         toastService.showToast({
            color: colours.success,
            title: 'Success',
            subtitle: `${teamsForm.values.title} created successfully`
         });
      }
      closeDrawer();
   };

   return (
      <Flex direction='column' rowGap={28} px={36} pb={42}>
         <Flex direction={'column'}>
            <h5 className={'text-h5 font-semibold'} style={{ color: colours.midNightDarkBlue }}>
               {edit ? 'Edit Team' : 'Create Team'}
            </h5>
            {!edit && (
               <p className='mt-1' style={{ color: colours.grey }}>
                  Please add the details below to create a team.
               </p>
            )}
         </Flex>

         <form className='flex flex-col gap-y-3' onSubmit={handleEmployeeFormSubmit}>
            <Flex direction={'column'} rowGap={5}>
               <div className={'text-sm font-medium'}>Team Leader</div>
               <SearchableDropDown
                  data={TeamsFormData.teamemployees}
                  placeholder={'Select Employee'}
                  onChange={(value: string[]) => handleSelectedHeadChange(value?.[0] ?? '')}
                  defaultSelectedValues={selectedTeamHead}
               />
            </Flex>
            <TextInput
               label={<p className='text-sm mb-1'>Title</p>}
               placeholder='Enter Title'
               size='md'
               {...teamsForm.getInputProps('title')}
            />

            <Textarea
               label={<p className='text-sm mb-1'>Description</p>}
               placeholder='Enter Description'
               autosize
               minRows={5}
               className='w-full font-normal'
               size='md'
               {...teamsForm.getInputProps('description')}
            />

            <Flex direction={'column'} rowGap={5}>
               <p className={'text-sm font-medium'}>{edit ? 'Team Members' : 'Select Employee'}</p>
               <SearchableDropDown
                  data={TeamsFormData.teamemployees}
                  placeholder={'Select Employee'}
                  multiSelect
                  onChange={handleSelectedEmployeesChange}
                  defaultSelectedValues={selectedUsers}
               />
            </Flex>

            <Flex justify='space-between' mt={32} className='w-full'>
               <Button
                  variant='light'
                  bg={colours.grey4XLight}
                  color={colours.grey}
                  size='md'
                  onClick={() => closeDrawer({ fetch: false })}
               >
                  Cancel
               </Button>
               <Button color={colours.shadeBlue} size='md' type='submit'>
                  {edit ? 'Update' : 'Add'}
               </Button>
            </Flex>
         </form>
      </Flex>
   );
};

export default TeamsForm;
