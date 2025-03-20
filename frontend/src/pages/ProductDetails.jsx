const ProductDetails = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-5">
            <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden max-w-5xl w-full p-8">
                <div className="flex justify-center lg:w-1/2">
                    <img 
                        src="https://placehold.co/500x500" 
                        alt="PRODUCT_IMAGE" 
                        className="w-[500px] h-auto object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col lg:w-1/2 p-5 space-y-5">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Bose QuietComfort 45 Headphones
                    </h2>
                    <div className="flex items-center space-x-2">
                        <p className="text-yellow-500 text-xl">⭐ 4.7</p>
                        <p className="text-gray-600">(1,234 ratings)</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">$299.99</p>
                    <p className="text-gray-700">
                        Industry-leading noise cancellation, crystal-clear audio, and a battery life of up to 24 hours. 
                        Designed for all-day comfort with plush ear cushions and premium build quality.
                    </p>
                    <p className="text-green-600 font-semibold">In Stock</p>
                    <p className="text-gray-600 text-sm">Ships from and sold by <span className="font-semibold">Amazon.com</span></p>
                    <div className="flex flex-col space-y-3">
                        <button className="hover:cursor-pointer px-5 py-3 bg-blue-800 text-white rounded-lg shadow hover:bg-blue-700 font-semibold">
                            Add to Cart
                        </button>
                        <button className="hover:cursor-pointer px-5 py-3 bg-blue-800 text-white rounded-lg shadow hover:bg-blue-700 font-semibold">
                            Buy Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;
