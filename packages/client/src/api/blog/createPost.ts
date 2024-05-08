const API_URL = import.meta.env.VITE_API_URL;

export const createPost = async ({ title, content }: { title: string, content: string }) => {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({ title, content })
        });
        const res = await response.json();
        if (!response.ok) 
            throw res.message
        return res;
    } catch (err) {
        throw new Error(err as string);
    }
};