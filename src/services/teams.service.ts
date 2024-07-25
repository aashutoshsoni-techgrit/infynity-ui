import httpService from '@/src/services/http.service';
import toastService from '@/src/services/toast.service';
import colours from '@/src/constants/palette';
import { TEAMS_STRINGS } from '../constants/server-errors';

export const getTeamsDetailsbyHeadId = async (headId: string) => {
   try {
      const response = await httpService.get(`/team/head/${headId}`);
      return response?.data?.data?.allTeams;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: TEAMS_STRINGS.GET_TEAMS_DATA });
   }
};

export const getTeamsData = async (teamId: string) => {
   try {
      const response = await httpService.get(`/team/${teamId}`);
      return response?.data?.data;
   } catch (error) {
      toastService.showToast({ color: colours.error, title: TEAMS_STRINGS.GET_TEAMS_DATA });
   }
};

export const addTeam = async (formData: FormData) => {
   try {
      await httpService.post(`/team`, formData);
      return true;
   } catch (error) {
      console.log(error);
      toastService.showToast({
         color: colours.error,
         title: TEAMS_STRINGS.ADD_TEAM
      });
   }
};

export const updateTeam = async (teamId: string, formData: FormData) => {
   try {
      await httpService.put(`/team/${teamId}`, formData);
      return true;
   } catch (error) {
      toastService.showToast({
         color: colours.error,
         title: TEAMS_STRINGS.UPDATE_TEAM
      });
   }
};
