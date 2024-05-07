import { IUser } from "./IUser";

export type AuthStore = {
    isAuthenticated: boolean;
    toggleAuth: (isAuthenticated: boolean) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
};