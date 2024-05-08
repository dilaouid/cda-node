import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/blog/createPost";

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({ mutationFn: createPost, mutationKey: ['publish'], onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts', 'get'] }) });
};