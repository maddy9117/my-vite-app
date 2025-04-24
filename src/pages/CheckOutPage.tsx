import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { clearCart } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { fetchUserAddresses } from "../features/address/addressSlice";
import {
  fetchCartProducts,
  selectCartTotalPrice,
} from "../features/products/productsSlice";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartProducts = useAppSelector((state) => state.products.cartProducts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { addresses, loading, error } = useAppSelector(
    (state) => state.address
  );

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, [dispatch]);

  useEffect(() => {
    const ids = Object.keys(cartItems);
    if (ids.length > 0) {
      dispatch(fetchCartProducts(ids));
    }
  }, [cartItems]);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const formattedAddress = `${selectedAddress?.building}, ${selectedAddress?.street}, ${selectedAddress?.landmark}, ${selectedAddress?.pincode}, ${selectedAddress?.state}, ${selectedAddress?.country}`;

  console.log(formattedAddress);

  const getProduct = (id: string) => cartProducts.find((p) => p.id === id);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const handleCheckout = async () => {
    try {
      const formattedItems = Object.entries(cartItems)
        .map(([productId, quantity]) => {
          const product = getProduct(productId);
          if (!product) return null;
          return {
            productId,
            name: product.name,
            price: product.price,
            quantity,
          };
        })
        .filter(
          (
            item
          ): item is {
            productId: string;
            name: string;
            price: number;
            quantity: number;
          } => item !== null
        );

      const totalAmount = formattedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const orderData = {
        items: formattedItems,
        shippingAddress: formattedAddress,
        totalAmount: totalAmount,
        status: "PENDING", // Set initial order status
      };

      console.log("Order data:", orderData); // Log the formatted data for verification

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Order success:", responseData);

      dispatch(clearCart()); // Clear the cart after successful order
      navigate("/order-success"); // Redirect to the order success page
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred during checkout.";
      alert(`Checkout failed: ${errorMessage}`);
    }
  };

  return (
    <>
      <Layout>
        <div className="max-w-lg mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>

          {/* Address Section */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>

            {loading ? (
              <p className="text-gray-500">Loading address...</p>
            ) : addresses.length === 0 ? (
              <p className="text-gray-500">
                No address found. Add one from My Account page.
              </p>
            ) : (
              <>
                <select
                  className="w-full p-2 border rounded mb-4"
                  value={selectedAddressId ?? ""}
                  onChange={(e) => setSelectedAddressId(e.target.value)}
                >
                  <option value="">Select an address</option>
                  {addresses.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.building}, {addr.street}, {addr.pincode}
                    </option>
                  ))}
                </select>

                {selectedAddress && (
                  <div className="text-gray-700 space-y-1">
                    <p>
                      <strong>Building:</strong> {selectedAddress.building}
                    </p>
                    <p>
                      <strong>Street:</strong> {selectedAddress.street}
                    </p>
                    <p>
                      <strong>Landmark:</strong> {selectedAddress.landmark}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {selectedAddress.pincode}
                    </p>
                    <p>
                      <strong>State:</strong> {selectedAddress.state}
                    </p>
                    <p>
                      <strong>Country:</strong> {selectedAddress.country}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-6 flex flex-wrap md:flex-nowrap justify-between items-stretch gap-4">
            <p className="text-lg font-bold bg-white px-4 py-2 rounded h-full flex items-center">
              Total: ₹{totalPrice.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              disabled={!selectedAddress}
              className={`px-4 py-2 rounded text-white ${
                selectedAddress
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Order
            </button>
            <Link
              to="/cart"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 whitespace-nowrap h-full flex items-center justify-center"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
