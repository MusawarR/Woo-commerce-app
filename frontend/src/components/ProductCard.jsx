import { useCartStore } from "../store/store";

const ProductCard = ({ itemId, image, name, rating, ratingCount, price }) => {
    const isInCart = useCartStore((state) => state.isInCart(itemId))
    const addItem = useCartStore((state) => state.addItem)
    const removeItem = useCartStore((state) => state.removeItem)

    return (
        <div className="flex flex-col min-w-[260px] max-w-sm border border-gray-300 rounded shadow-md overflow-hidden w-full bg-white">
            <img src={image} alt={name} className="w-full h-48 object-contain border-b-[1px] border-gray-300" />
            <div className="p-5 flex flex-1 flex-col space-y-3">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-gray-600">⭐ {rating} ({ratingCount} reviews)</p>
                <p className="text-blue-500 font-bold">${price}.00</p>
            </div>
            {
                isInCart ?
                <button className="mx-5 mb-5 p-3 rounded shadow bg-blue-800 text-white" onClick={() => removeItem(itemId)}>Remove From Cart</button> :
                <button className="mx-5 mb-5 p-3 rounded shadow bg-blue-800 text-white" onClick={() => addItem({ _id: itemId, name, price, image })}>Add to cart</button>
            }
        </div>
    );
};

export default ProductCard;