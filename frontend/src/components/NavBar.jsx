import { FaShoppingCart } from "react-icons/fa";
import { useAuthStore, useCartStore } from "../store/store";
import { useNavigate } from "react-router";

const NavBar = () => {
    const navigate = useNavigate()
    const itemCount = useCartStore((state) => state.items.length)
    const { user } = useAuthStore.getState()

    const handleLogout = () => {
        useAuthStore.getState().clearAuth()
        navigate("/login")
    }

    const handleLogoClick = () => {
        if(user?.role == "ADMIN") {
            navigate("/admin-dash")
        }

        if(user?.role == "USER") {
            navigate("/products")
        }
    }

    return (
        <div className="w-full h-20 border-b-[1px] border-gray-300 shadow bg-blue-800 flex justify-between items-center p-7">
            <p className="hover:cursor-pointer font-bold text-white text-2xl" onClick={() => handleLogoClick()}>AEONIS</p>
            <div className="flex items-center space-x-5 relative">
                <div className="relative">
                    <FaShoppingCart className="text-white hover:cursor-pointer" size={25} onClick={() => navigate("/cart")} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex justify-center items-center rounded-full">
                        {itemCount}
                    </span>
                </div>
                <button className="bg-slate-50 rounded w-32 py-2 hover:cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default NavBar;
