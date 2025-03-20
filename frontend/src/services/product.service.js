import { API } from "../api";
import { useProductStore, useAuthStore } from "../store/store";

export const GetAllProducts = async () => {
    const { setProducts, setLoading, setError } = useProductStore.getState()

    try {
        setLoading(true)

        const response = await API.get("/products")
        setProducts(response.data)

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

export const CreateProduct = async (name, price, image) => {
    const { setError } = useProductStore.getState()
    const { user } = useAuthStore.getState()

    try {
        const response = await API.post(
            "/products",
            { name, price, image},
            { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        )

        return response
    }
    catch(err) {
        console.error(err)
        setError(err.response ? err.response : err)
    }
}

export const EditProduct = async (productId, name, price, image) => {
    const { setError } = useProductStore.getState()
    const { user } = useAuthStore.getState()

    try {
        const response = await API.patch(
            `/products/${productId}`,
            { name, price, image },
            { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        )

        return response
    }
    catch(err) {
        console.error(err)
        setError(err.response ? err.response : err)
    }
}

export const DeleteProduct = async (productId) => {
    const { setError } = useProductStore.getState()
    const { user } = useAuthStore.getState()

    try {
        const response = await API.delete(
            `/products/${productId}`,
            { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        )

        return response
    }
    catch(err) {
        console.error(err)
        setError(err.response ? err.response : err)
    }
}