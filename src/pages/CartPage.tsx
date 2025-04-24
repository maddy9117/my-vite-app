import { useAppSelector, useAppDispatch } from "../hooks/hooks";

import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/cart/cartSlice";

import { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

import {
  fetchCartProducts,
  setCartProducts,
} from "../features/products/productsSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartProducts = useAppSelector((state) => state.products.cartProducts);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const cartArray: { productId: string; quantity: number }[] = Object.entries(
    cartItems
  ).map(([productId, quantity]) => ({
    productId,
    quantity: Number(quantity), // Ensure it's a number
  }));

  useEffect(() => {
    async function fetchProducts() {
      const ids = Object.keys(cartItems);
      if (ids.length > 0) {
        dispatch(fetchCartProducts(ids));
        //const response = await axios.get(`${baseUrl}/products/bulk?ids=${ids}`);
        //dispatch(setCartProducts(response.data));
      }
    }
    fetchProducts();
  }, [cartItems]);

  const getProduct = (id: string) => cartProducts.find((p) => p.id === id);
  const totalPrice = cartArray.reduce((total, item) => {
    const product = getProduct(item.productId);
    return product ? total + product.price * item.quantity : total;
  }, 0);

  return (
    <>
      <Layout>
        <div className="p-6 max-w-4xl mx-auto">
          {Object.keys(cartItems).length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              {cartArray.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-4 mb-4 border rounded-lg"
                  >
                    <img
                      src={`${baseUrl}${product.images[0]}`}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.productId,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.productId,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{product.price * item.quantity}
                      </p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.productId))}
                        className="text-sm text-red-500 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="mt-6 flex flex-wrap md:flex-nowrap justify-between items-stretch gap-4">
                <p className="text-lg font-bold bg-white px-4 py-2 rounded h-full flex items-center">
                  Total: ₹{totalPrice.toFixed(2)}
                </p>
                <Link
                  to="/checkout"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 whitespace-nowrap h-full flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 whitespace-nowrap h-full flex items-center justify-center"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}{" "}
        </div>
      </Layout>
    </>
  );
}
