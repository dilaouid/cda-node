import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../api/blog/getAllPosts';

export const useGetPosts = () => {
    return useQuery({
        queryKey: ['posts', 'get'],
        queryFn: getAllPosts,
        select: (data) => data.data
    });
};