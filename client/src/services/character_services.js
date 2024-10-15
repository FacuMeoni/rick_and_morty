import axios from 'axios';
const url_api = 'http://localhost:3000/characters/'

export const getAllCharacters = async() => {
    try {
        const { data } = await axios.get(url_api);

        return {
            sucess: true,
            characters: data.characters
        }
    } catch (error) {
        if(error.response) { 
            return error.response.data; 
        } else if(error.request){
            return {
                success: false,
                message: 'Network error, please try again later.'
            }
        } else {
            console.log('Unexpected error:', error)
            return {
                sucess: false,
                message: 'An unnexpected error ocurred. Please try again later.'
            }
        }
    }
}