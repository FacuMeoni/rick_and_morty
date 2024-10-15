import RegisterSection from "../components/authComponents/register/register";
import LoginSection from "../components/authComponents/login/login";
import { useEffect, useState } from "react";


function AuthPage () {
    
    const[show, setShow] = useState(true);

    useEffect(() => {
    }, [show])

    function handleClick(){
        setShow(prevShow => !prevShow)
    }

    return(
        <section>
            <button onClick={handleClick}>
                { show ? 'Login' : 'Register' }
            </button>
            { show 
                ? <RegisterSection/>
                : <LoginSection/> 
            }
        </section>
    )
}

export default AuthPage;