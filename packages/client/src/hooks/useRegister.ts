import { useMutation } from "@tanstack/react-query";
import { register } from "../api/user/register";

export const useRegister = () => {
    return useMutation({ mutationFn: register, mutationKey: ['register'] })
};