import { useState } from 'react'
import { useProductStore } from "../store/store"

const OrderCard = ({ order }) => {
    const [expanded, setExpanded] = useState(false)
    const products = useProductStore((state) => state.products)

    const orderProducts = order.products.map(productId =>
        products.find(product => product._id === productId) || { name: "Unknown Product", price: "N/A" }
    )

    return (
        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex-1">
                    <div className="flex items-center space-x-4">
                        <p className="text-lg font-semibold text-gray-800">Order ID: {order._id.slice(-6)}</p>
                        <div className="flex space-x-3">
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${order.paymentStatus === "Complete" ? "bg-green-100 text-green-600" :
                                order.paymentStatus === "Pending" ? "bg-yellow-100 text-yellow-600" :
                                    "bg-red-100 text-red-600"
                                }`}>
                                Payment: {order.paymentStatus}
                            </span>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${order.orderStatus === "Delivered" ? "bg-green-100 text-green-600" :
                                order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-600" :
                                    "bg-orange-100 text-orange-600"
                                }`}>
                                Status: {order.orderStatus}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-2">Total: ${order.totalPrice}</p>
                </div>
                <div className="flex space-x-3 mt-4 md:mt-0">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                        {expanded ? 'Hide Details' : 'View Products'}
                    </button>
                </div>
            </div>

            {expanded && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-lg mb-2">Products in this order:</h4>
                    <div className="space-y-2">
                        {orderProducts.map((product, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                <div className="flex items-center space-x-3">
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    )}
                                    <span className="font-medium">{product.name}</span>
                                </div>
                                <span>${product.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderCard