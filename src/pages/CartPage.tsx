import { useAppSelector, useAppDispatch } from "../hooks/hooks";

import {
  removeFromCart,
  addToCart,
  decrementProduct,
  updateQuantity,
  clearCart,
} from "../features/cart/cartSlice";

import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  console.log(cartItems);
  const [products, setProducts] = useState<Product[]>([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const cartArray = Object.entries(cartItems).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));

  //const ids = cartItems.map((item: { productId: string }) => item.productId).join(",");
  useEffect(() => {
    async function fetchProducts() {
      const ids = Object.keys(cartItems); //cartItems.map((item) => item.productId).join(",");
      if (ids.length > 0) {
        const response = await axios.get(`${baseUrl}/products/bulk?ids=${ids}`);
        setProducts(response.data);
      }
    }
    fetchProducts();
  }, [cartItems]);

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const totalPrice = cartArray.reduce((total, item) => {
    const product = getProduct(item.productId);
    return product ? total + product.price * item.quantity : total;
  }, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
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

          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}{" "}
    </div>
  );
}
