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
        if(error.response) {
            return error.response.data;
        }else if(error.request){
            return {
                success: false,
                message: 'Network error, please try again later.'
            }
        }else {
            console.log('Unexpected error:', error)
            return {
                sucess: false,
                message: 'An unnexpected error ocurred. Please try again later.'
            }
        }
    }
}