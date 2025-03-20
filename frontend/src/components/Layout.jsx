import NavBar from "./NavBar"

const Layout = ({ children }) => {
    return (
        <div className="w-full min-h-screen bg-slate-50">
            <NavBar />
            { children }
        </div>
    )
}

export default Layout