import toast from "react-hot-toast"
import { API } from "../api"
import { useAuthStore } from "../store/store"

export const CreatePaymentIntent = async (orderId) => {
    const { user } = useAuthStore.getState()
    try {
        if(orderId == null) {
            toast.error("Error occurred, please try again")
            return null
        }

        const response = await API.post(
            "/payments/intent",
            { orderId },
            { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        )

        return response
    }
    catch(err) {
        console.error(err)
        return null
    }
}