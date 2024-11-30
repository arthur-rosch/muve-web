import { useMutation } from '@tanstack/react-query';
import { AnalyticsService } from './../services/AnalyticsService';
import type { AddViewTimestamps, AddViewUnique } from '../types';

export const useAnalytics = () => {
  const addViewTimestamps = useMutation({
    mutationFn: async (view: AddViewTimestamps) => {
      const { data, success, error } = await AnalyticsService.addViewTimestamps(view);
      return { data, success, error };
    }
  });

  const addViewUnique = useMutation({
    mutationFn: async (view: AddViewUnique) => {
      const { data, success, error } = await AnalyticsService.addViewUnique(view);
      return { data, success, error };
    }
  });

  return {
    addViewTimestamps,
    addViewUnique,
  };
};
