import NavBar from "./NavBar"

// This component used by src/App.js
// This component shows Navbar component and FilterRoutes component in app's Header
const Header = ({ filter }) => {
    return (
        <div className="sticky-top">
            <NavBar />

            {/* FilterRoutes Component */}
            {filter}
        </div>
    )
}

export default Header