import { API } from "../api";
import { useAuthStore } from "../store/store";

export const LoginUser = async (email, password) => {
    try {
        const response = await API.post(
            "/users/login",
            { email, password }
        )

        useAuthStore.getState().setUser({ email: email, ...response.data })

        return response
    }
    catch(err) {
        console.error(err)
        return err
    }
}

export const RegisterUser = async (email, password) => {
    try {
        const response = await API.post(
            "/users/register",
            { email, password }
        )

        useAuthStore.getState().setUser({ email: email, ...response.data })

        return response
    }
    catch(err) {
        console.error(err)
        return err
    }
}