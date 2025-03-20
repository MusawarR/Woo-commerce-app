import { API } from "../api";
import { useAuthStore, useOrdersStore } from "../store/store";

export const GetAllOrders = async () => {
    const { user } = useAuthStore.getState()
    const { setOrders, setLoading, setError } = useOrdersStore.getState()

    try {
        setLoading(true)

        const response = await API.get(
            "/orders",
            { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        )
        setOrders(response.data)
        
        return response
    }
    catch(err) {
        console.error(err)
        setError(err.response ? err.response : err)
    }
    finally {
        setLoading(false)
    }
}

export const CreateOrder = async (products) => {
    const { user } = useAuthStore.getState()
    const { setError } = useOrdersStore.getState()

    try {
        const response = await API.post(
            "/orders",
            { products },
            { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        )

        return response
    }
    catch(err) {
        console.error(err)
        setError(err.response ? err.response : err)
    }
}

export const GetAllOrdersOfUser = async () => {
    const { user } = useAuthStore.getState()
    const { setUserOrders, setLoading, setError } = useOrdersStore.getState()

    try {
        setLoading(true)

        const response = await API.get(
            "/orders/users",
            { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        )
        setUserOrders(response.data)

        return response
    }
    catch(err) {
        console.error(err)
        setError(err.response ? err.response : err)
    }
    finally {
        setLoading(false)
    }
}