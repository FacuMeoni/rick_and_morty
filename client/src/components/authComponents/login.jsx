import { authUser } from "../../services/user_services";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";


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
    };

    async function handleSubmit (event) {
        event.preventDefault();
        const response = await authUser('login', credentials);

        if(!response.success){
            setErrors(response.message);
            return
        }
        

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
            <button type="submit">
                Login </button>
            { errors && <span> { errors } </span> }
        </form>
    )
}

export default LoginSection;