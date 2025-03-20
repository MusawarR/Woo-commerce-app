import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Orders from "./pages/Orders"
import Checkout from "./pages/Checkout"
import Error from "./pages/Error"
import Layout from "./components/Layout"
import AdminDash from "./pages/AdminDash"
import Cart from "./pages/Cart"
import Payment from "./pages/Payment"

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Registration /> },
    { path: "/products", element: <Layout><Products /></Layout> },
    { path: "/orders", element: <Layout><Orders /></Layout> },
    { path: "/cart", element: <Layout><Cart /></Layout>},
    { path: "/payment", element: <Payment />},
    { path: "/admin-dash", element: <AdminDash /> },
    { path: "/products/:product-id", element: <Layout><ProductDetails /></Layout> },
    { path: "/checkout/:order-id", element: <Layout><Checkout /></Layout> },
    { path: "*", element: <Error /> }
], {
    future: {
        v7_fetcherPersist: true,
        v7_relativeSplatPath: true,
    }
})

const App = () => {
    return <>
        <Toaster position="top-center" />
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
}

export default App