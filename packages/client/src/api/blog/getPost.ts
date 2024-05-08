/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = import.meta.env.VITE_API_URL;

export const getPost = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'GET',
            credentials: "include"
        });
        const res = await response.json();
        if (!response.ok) 
            throw res.message
        return res;
    } catch (error: string | any) {
        throw new Error(error as string);
    }
};