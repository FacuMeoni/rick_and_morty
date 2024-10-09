import axios from 'axios';
const API_URL = 'http://localhost:3000/user';

export const authUser = async(authMethod, credentials) => {
    try {
        const { data } = await axios.post(`${API_URL}/${authMethod}`, credentials);

        return {
            success: data.success,
            user: data.user
        }
    } catch (error) {
        return error.response.data;
    }
}