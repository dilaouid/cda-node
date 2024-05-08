import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/user/me';

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    select: (data) => data.data
  });
};