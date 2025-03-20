import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { CreatePaymentIntent } from "../services/payment.service"
import { useAuthStore, useCartStore } from "../store/store"
import Layout from "../components/Layout"
import { Elements } from "@stripe/react-stripe-js"
import Checkout from "../components/Checkout"
import { useNavigate } from "react-router"

const Payment = () => {
    const { user } = useAuthStore.getState()
    const navigate = useNavigate()
    const orderId = useCartStore((state) => state.orderId)
    const [stripePromise, setStripePromise] = useState(null)
    const [clientKey, setClientKey] = useState("")

    const getStripeConfig = () => {
        setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY))
    }

    const handleIntentCreation = async () => {
        const apiResponse = await CreatePaymentIntent(orderId)

        if(apiResponse == null || apiResponse?.status != 200) {
            toast.error("Error occurred, please try again!")
            navigate("/cart")
            return
        }

        setClientKey(apiResponse.data)
    }

    useEffect(() => {
        if(!user || !user?.token) {
            navigate("/login")
            return
        }

        getStripeConfig()
        handleIntentCreation()
    }, [])

    return (
        <>
            {
                stripePromise && clientKey && (
                    <Layout>
                        <div className="flex justify-center items-center h-[550px]">
                            <div className="w-96">
                                <Elements stripe={stripePromise} options={{ clientSecret: clientKey }}>
                                    <Checkout />
                                </Elements>
                            </div>
                        </div>
                    </Layout>
                )
            }
        </>
    )
}

export default Payment