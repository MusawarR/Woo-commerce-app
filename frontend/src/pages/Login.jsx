import { useEffect, useState } from "react"
import { useAuthStore } from "../store/store.js"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { LoginUser } from "../services/user.service.js"
import toast from "react-hot-toast"

const Login = () => {
    const navigate = useNavigate()
    const { token, user } = useAuthStore.getState()
    
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        handleNavigate(user)
    }, [user, navigate])

    const handleNavigate = (data) => {
        if(data?.role == "USER") {
            navigate("/products")
        }
        
        if(data?.role == "ADMIN") {
            navigate("/admin-dash")
        }
    }

    const validate = () => {
        const newErrors = { email: '', password: '' }
        let isValid = true

        if (!userData.email) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Email is not valid'
            isValid = false
        }

        if (!userData.password) {
            newErrors.password = 'Password is required'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (validate()) {
            try {
                const apiResponse = await LoginUser(userData.email, userData.password)
            
                if(apiResponse.status == 404 || apiResponse.status == 401) {
                    toast.error("Email or Password is incorrect!")
                    return
                }

                handleNavigate(apiResponse.data)
            }
            catch(err) {
                toast.error("An error occurred, please try again")
            }
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-1 flex-col justify-center items-center space-y-7 bg-slate-50 p-7">
            <div className="space-y-4 p-10 flex flex-col border-[1px] border-gray-300 shadow-md min-w-[450px] rounded-md overflow-clip bg-white">
                <img src="/assets/logo.png" alt="LOGO" className="w-16" />
                <div className="flex flex-col space-y-1">
                    <p className="font-bold text-gray-600 text-2xl">Login</p>
                    <p className="text-sm text-gray-600">Continue to AEONIS</p>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-5 space-y-1">
                            <p className="text-gray-800 text-lg font-semibold">Email</p>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                className={`w-full border-[1px] ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded h-12 shadow px-3 outline-none`}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div className="flex flex-col mt-4 space-y-1">
                            <p className="text-gray-800 text-lg font-semibold">Password</p>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                className={`w-full border-[1px] ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded h-12 shadow px-3 outline-none`}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <button type="submit" className="w-full mt-5 bg-blue-800 text-white rounded shadow h-12 hover:cursor-pointer hover:-translate-y-[3px] transition-transform duration-300">
                            Login
                        </button>
                    </form>

                    <p className="mt-7 text-sm text-gray-700 text-center">New to AEONIS? <Link to="/register" className="text-blue-700 underline">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login