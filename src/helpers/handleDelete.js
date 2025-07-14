// helpers/handleDelete.js
export const deleteData = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Server Response Error:', data);
            throw new Error(data.message || 'Failed to delete');
        }

        return true;
    } catch (error) {
        console.error('Delete Error:', error.message);
        return false;
    }
};
