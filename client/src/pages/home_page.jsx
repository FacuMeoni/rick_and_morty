import CardContainer from "../components/card_container"
import Navbar from "../components/navbar"
import AuthPage from "./auth_page"

function HomePage () {
    return(
        <>
            <h1>Home page</h1>
            <Navbar/>
            <CardContainer/>
            <AuthPage/>
        </>
    )
}

export default HomePage