import { useEffect, useState } from "react"
import { GetAllOrdersOfUser } from "../services/order.service"
import { useCartStore } from "../store/store";
import toast from "react-hot-toast"
import { useNavigate } from "react-router";

const Orders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const { setOrderId } = useCartStore.getState()
    const [loading, setLoading] = useState(false)

    const handleGetOrders = async () => {
        try {
            setLoading(true)

            const apiResponse = await GetAllOrdersOfUser()

            if (apiResponse.status !== 200) {
                toast.error("Error occurred, please try again!")
                return
            }

            setOrders(apiResponse.data)
            setLoading(false)
        } catch (err) {
            console.error(err)
            toast.error("Error occurred, please try again!")
        }
    }

    const handleProceedToCheckout = async (orderId) => {
        try {
            setOrderId(orderId)
            navigate("/payment")
        }
        catch(err) {
            console.error(err)
            toast.error("Error occurred, please try again!")
        }
    }

    useEffect(() => {
        handleGetOrders()
    }, [])

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">My Orders</h2>

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
                            >
                                <div className="flex justify-between items-center border-b pb-4 mb-4">
                                    <p className="text-lg font-bold text-gray-800">Total: ${order.totalPrice}.00</p>
                                    <div className="space-x-2">
                                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${order.paymentStatus === "Complete" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                            }`}>
                                            Payment: {order.paymentStatus}
                                        </span>
                                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${order.orderStatus === "Delivered" ? "bg-green-100 text-green-600" :
                                            order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-600" :
                                                "bg-orange-100 text-orange-600"
                                            }`}>
                                            Order: {order.orderStatus}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {order.products.map((product) => (
                                        <div key={product._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <img
                                                src={product.image || "https://via.placeholder.com/60x60"}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-lg border"
                                            />
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                                                <p className="text-gray-600 font-medium">${product.price}.00</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {
                                    order.paymentStatus == "Pending" &&
                                    <div className="text-right mt-5">
                                        <button className="px-5 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-700" onClick={() => handleProceedToCheckout(order._id)}>
                                            Checkout
                                        </button>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                ) : (
                    loading ?
                    <p className="text-gray-600 text-center text-lg">Loading Orders.</p> :
                    <p className="text-gray-600 text-center text-lg">No orders found.</p>
                )}
            </div>
        </div>
    )
}

export default Orders
