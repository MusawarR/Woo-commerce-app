// AdminDash.js
import { useAuthStore, useOrdersStore } from "../store/store"
import { useProductStore } from "../store/store"
import { CreateProduct, GetAllProducts } from "../services/product.service"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"
import ProductCard from "../components/ProductCard"
import { GetAllOrders } from "../services/order.service"
import OrderCard from "../components/OrderCard"

const AdminDash = () => {
    const navigate = useNavigate()
    const { user } = useAuthStore.getState()
    const products = useProductStore((state) => state.products)
    const orders = useOrdersStore((state) => state.orders)
    const [selectedTab, setSelectedTab] = useState('products')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newProduct, setNewProduct] = useState({
        name: "",
        image: "",
        price: ""
    })

    const handleLogout = () => {
        useAuthStore.getState().clearAuth()
        navigate("/login")
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewProduct({
            ...newProduct,
            [name]: value
        })
    }

    const validateForm = () => {
        const { name, image, price } = newProduct
        if (!name || !image || !price) {
            toast.error("Please fill in all fields.")
            return false
        }

        const imageUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i
        if (!imageUrlPattern.test(image)) {
            toast.error("Please provide a valid image URL.")
            return false
        }

        if (isNaN(price) || parseFloat(price) <= 0) {
            toast.error("Please enter a valid price.")
            return false
        }

        return true
    }

    const handleAddProduct = async () => {
        if (!validateForm()) {
            return
        }

        try {
            await CreateProduct(newProduct.name, newProduct.price, newProduct.image)
            await GetAllProducts()

            toast.success("Product added successfully!")
            setIsModalOpen(false)
        } catch (err) {
            console.error(err)
            toast.error("Error occurred, please try again!")
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (!user || !user?.token) {
            navigate("/login")
            return
        }

        GetAllProducts()
        GetAllOrders()
    }, [user, navigate])

    return (
        <div className="w-full min-h-screen bg-slate-50">
            <div className="w-full h-20 border-b-[1px] border-gray-300 shadow bg-blue-800 flex justify-between items-center p-7">
                <p className="font-bold text-white text-2xl">AEONIS</p>
                <button className="bg-slate-50 rounded w-32 py-2 hover:cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-full xl:w-2/3 flex flex-col justify-center items-center space-y-5 p-10 h-[calc(100vh-80px)]">
                    <div className="flex w-1/2 space-x-5">
                        <button
                            onClick={() => setSelectedTab('products')}
                            className={`hover:cursor-pointer w-1/2 py-3 text-white text-lg font-semibold rounded-xl transition-all duration-300 ${selectedTab === 'products' ? 'bg-blue-800' : 'bg-gray-400'}`}
                        >
                            Products
                        </button>
                        <button
                            onClick={() => setSelectedTab('orders')}
                            className={`hover:cursor-pointer w-1/2 py-3 text-white text-lg font-semibold rounded-xl transition-all duration-300 ${selectedTab === 'orders' ? 'bg-blue-800' : 'bg-gray-400'}`}
                        >
                            Orders
                        </button>
                    </div>

                    <div className="w-full flex-1 h-full bg-white border-[1px] border-gray-300 rounded-lg mt-5 p-5">
                        {selectedTab === 'products' && (
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-semibold">Product List</h2>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-blue-800 text-white p-3 rounded-xl shadow-lg font-semibold hover:bg-blue-700 transition duration-300"
                                    >
                                        Add Product
                                    </button>
                                </div>
                                <div className="scroll-smooth overflow-y-auto mt-10 grid justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-h-[calc(100vh-380px)]">
                                    {products.length > 0 &&
                                        products.map(product => (
                                            <ProductCard
                                                key={product?._id}
                                                image={product?.image}
                                                name={product?.name}
                                                rating={4.5}
                                                ratingCount={120}
                                                price={product?.price}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                        {selectedTab === 'orders' && (
                            <div>
                                <h2 className="text-2xl font-semibold">Order List</h2>
                                {orders.length > 0 ? (
                                    <div className="space-y-6 my-7 px-4 overflow-y-auto max-h-[calc(100vh-380px)]">
                                        {orders.map((order) => (
                                            <OrderCard key={order._id} order={order} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-center text-lg">No orders found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(1, 1, 1, 0.8)" }}>
                    <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                placeholder="Product Name"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="image"
                                value={newProduct.image}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                placeholder="Price"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProduct}
                                className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDash
