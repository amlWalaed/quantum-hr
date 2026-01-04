import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/axios';

interface ExampleData {
  id: number;
  name: string;
}

export const useExampleQuery = () => {
  return useQuery<ExampleData>({
    queryKey: ['example'],
    queryFn: async () => {
      const response = await apiClient.get<ExampleData>('/example');
      return response.data;
    },
    enabled: false, // Set to true when you want to fetch data
  });
};

