import { useNavigate } from "react-router";
import { useCartStore } from "../store/store";
import { CreateOrder } from "../services/order.service";
import toast from "react-hot-toast";

const Cart = () => {
    const navigate = useNavigate()
    const cartItems = useCartStore((state) => state.items)
    const { setOrderId } = useCartStore.getState()

    const handleProceedToCheckout = async () => {
        try {
            const products = cartItems.map(cartItem => cartItem._id)
            const apiResponse = await CreateOrder(products)

            if(apiResponse.status != 201) {
                toast.error("Error occurred, please try again")
                return
            }

            setOrderId(apiResponse.data._id)
            navigate("/payment")
        }
        catch(err) {
            console.error(err)
            toast.error("Error occurred, please try again!")
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="my-4 flex justify-between items-center">
                    <h2 className="text-4xl font-bold text-gray-900 text-center">Cart Items</h2>
                    <button className="hover:cursor-pointer px-5 py-3 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-700" onClick={() => navigate("/orders")}>
                        View All Orders
                    </button>
                </div>

                {cartItems.length > 0 ? (
                    <div className="space-y-6">
                        {cartItems.map((cartItem) => (
                            <div
                                key={cartItem._id}
                                className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-5 border border-gray-200"
                            >
                                <div className="w-24 h-24 flex-shrink-0">
                                    <img
                                        src={cartItem.image}
                                        alt={cartItem.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1 md:ml-6 text-center md:text-left space-y-2">
                                    <p className="text-xl font-semibold text-gray-800">{cartItem.name}</p>
                                    <p className="text-blue-500 font-bold">${cartItem.price}.00</p>
                                    <p className="text-gray-600">⭐ 4.5 (120 reviews)</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex w-full justify-center items-center">
                            <button className="hover:cursor-pointer w-1/3 p-4 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-700" onClick={handleProceedToCheckout}>
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center text-lg">No Items found.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
