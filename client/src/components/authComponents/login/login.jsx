import { authUser } from "../../../services/user_services";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import loginValidations from "./login_validations";
import { validateErrors } from "../errors";


function LoginSection () {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState('');
    const [ credentials, setCredentials ] = useState({
        username: '',
        password: '',
    })
    ;

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
        
        const credentialsAreValidate = loginValidations(credentials);
        if(credentialsAreValidate.error)return setErrors(credentialsAreValidate.message);
        
        const response = await authUser('login', credentials);
        if(!response.success)return setErrors(validateErrors(response));

       dispatch(setUser(response.user));
       navigate('/home');
       return 
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2> Login Section </h2>
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
            <button type="submit" disabled={errors || !credentials.username || !credentials.password}>
                Login </button>
            { errors && <span> { errors } </span> }
        </form>
    )
}

export default LoginSection;