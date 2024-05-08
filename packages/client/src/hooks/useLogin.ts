import { useMutation } from "@tanstack/react-query";
import { login } from "../api/user/login";

export const useLogin = () => {
    return useMutation({ mutationFn: login, mutationKey: ['login'] })
};