import { useState } from "react"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import { PaymentElement } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../store/store"
import toast from "react-hot-toast"

const Checkout = () => {
    const navigate = useNavigate()
    const { clearItems } = useCartStore.getState()

    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/products`
            },
            redirect: "if_required"
        })

        if (error) {
            setMessage(error.message)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            clearItems()
            toast.success("Payment was successful!")
            navigate("/products")
        }

        setIsProcessing(false)
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="w-full my-4 text-center font-semibold text-red-500">
                {
                    message
                    &&
                    <div id="payment-message">{message}</div>
                }
            </div>
            <button disabled={isProcessing} id="submit" className="w-full bg-blue-800 hover:bg-blue-500 py-3 text-white rounded-lg">
                <span id="button-text">
                    {
                        isProcessing ? "Processing ..." : "Pay now"
                    }
                </span>
            </button>
        </form>
    )
}

export default Checkout