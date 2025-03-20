import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useAuthStore, useProductStore } from "../store/store";
import { useNavigate } from "react-router";
import { GetAllProducts } from "../services/product.service";

const Products = () => {
    const navigate = useNavigate()
    const { user } = useAuthStore.getState()
    const { products } = useProductStore.getState()

    useEffect(() => {
        if(!user || !user?.token) {
            navigate("/login")
            return
        }

        if(user?.role == "ADMIN") {
            navigate("/admin-dash")
            return
        }

        GetAllProducts()
    }, [])

    return (
        <div className="w-full min-h-screen p-20">
            <p className="font-semibold text-2xl">Products List</p>
            <div className="mt-10 grid justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {
                    products.length > 0 &&
                    products.map(product => (
                        <ProductCard
                            key={product?._id}
                            itemId={product?._id}
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
    );
};

export default Products;
