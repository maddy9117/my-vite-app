import { useEffect } from "react";
//import { useSelector } from "react-redux";
//import { RootState } from "../store";
import { fetchProducts } from "../features/products/productsSlice";

import { addToCart, decrementProduct } from "../features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useSearch } from "../context/SearchContext";

export default function ProductGrid() {
  const { query } = useSearch();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useAppDispatch();
  const { status, items } = useAppSelector((state) => state.products);
  const cart = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts(query));
    }
  }, [dispatch, query, status]);

  const filteredProducts = query
    ? items.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const increment = (id: string) => dispatch(addToCart(id));
  const decrement = (id: string) => dispatch(decrementProduct(id));

  if (status === "loading")
    return <p className="text-center">Loading products...</p>;
  if (status === "failed")
    return <p className="text-center text-red-600">Error</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No products found.
        </div>
      )}
      {filteredProducts.map((product) => {
        const qty = cart[product.id] || 0;

        return (
          <div
            key={product.id}
            //className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
            className={`bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition ${
              product.stock === 0 ? "opacity-60" : ""
            }`}
          >
            <img
              src={`${baseUrl}${product.images[0]}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-green-600 font-medium mt-1">₹{product.price}</p>
            <p className="text-green-600 font-medium mt-1">{product.stock}</p>
            <p className="text-sm text-gray-700 mt-1 line-clamp-2">
              {product.description}
            </p>

            {product.stock === 0 ? (
              <button
                disabled
                className="mt-4 w-full bg-gray-300 text-gray-600 py-1 rounded-lg cursor-not-allowed"
              >
                Out of Stock
              </button>
            ) : qty === 0 ? (
              <button
                onClick={() => increment(product.id.toString())}
                className="mt-4 w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            ) : (
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => decrement(product.id.toString())}
                  className="bg-gray-200 px-3 py-1 rounded-l-lg text-lg"
                >
                  −
                </button>
                <span className="px-4 font-semibold">{qty}</span>
                <button
                  onClick={() => increment(product.id.toString())}
                  className="bg-gray-200 px-3 py-1 rounded-r-lg text-lg"
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
