import { authUser } from "../../../services/user_services";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import registerValidate from "./register_validations";
import { validateErrors }  from "../errors";


function RegisterSection () {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState('');
    const [ credentials, setCredentials ] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    
    function handleChange(event) {
        const {name, value} = event.target;
        setCredentials({
            ...credentials,
            [name]: value
        });

        setErrors('');
    };

    async function handleSubmit (event) {
        event.preventDefault();
        
        const credentialsAreValidate = registerValidate(credentials);
        if(credentialsAreValidate.error)return setErrors(credentialsAreValidate.message);
        
        const response = await authUser('register', credentials);
        if(!response.success)return setErrors(validateErrors(response));

       dispatch(setUser(response.user));
       navigate('/home');
       return 
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2> Register Section </h2>
            <input 
                type="text"
                name="username"
                placeholder="Your username"
                onChange={handleChange}/>    
            <input 
                type="password"
                name="password"
                placeholder="Your password"
                onChange={handleChange}/>
            <input 
                type="password"
                name="confirmPassword" 
                placeholder="Confirm password"
                onChange={handleChange}/>
            <button type='submit' disabled={!credentials.username || !credentials.password || !credentials.confirmPassword || errors }>
                Register </button>
            { errors ? <span> { errors } </span> : null }
        </form>
    )
}

export default RegisterSection;