const API_URL = import.meta.env.VITE_API_URL;

export const register = async ({ username, password, confirmPassword }: { username: string, password: string, confirmPassword: string }) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({ username, password, confirmPassword })
        });
        const res = await response.json();
        if (!response.ok) 
            throw res.message
        return res;
    } catch (err) {
        throw new Error(err as string);
    }
};