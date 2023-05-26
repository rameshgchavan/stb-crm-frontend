import NavBar from "./NavBar"

const Header = ({ filter }) => {
    return (
        <div className="sticky-top">
            <NavBar />

            {/* Routed Filter Component */}
            {filter}
        </div>
    )
}

export default Header