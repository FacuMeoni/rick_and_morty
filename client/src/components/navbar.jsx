import FilterCharacters from "./nav_filter";
import SearchBar from "./search_bar";

function Navbar () {
    return(
        <>
            <nav>
                <SearchBar/>
                <FilterCharacters/>
            </nav>
        </>
    )
}

export default Navbar;