import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/user/logout";

export const useLogout = () => {
    return useMutation({ mutationFn: logout, mutationKey: ['logout'] })
};