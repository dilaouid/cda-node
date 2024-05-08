const API_URL = import.meta.env.VITE_API_URL;

export const login = async ({ username, password }: { username: string, password: string }) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({ username, password })
        });
        const res = await response.json();
        if (!response.ok) 
            throw res.message
        return res;
    } catch (err) {
        throw new Error(err as string);
    }
};