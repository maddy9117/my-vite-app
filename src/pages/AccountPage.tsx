import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchUserProfile } from "../features/auth/authSlice";
import Layout from "../components/Layout";
import {
  fetchUserAddresses,
  setDefaultAddress,
} from "../features/address/addressSlice";
import AddressForm from "../components/AddressForm";

const Account = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const {
    addresses,
    loading: addressLoading,
    error,
  } = useAppSelector((state) => state.address);

  const uniqueAddresses = useMemo(() => {
    const seen = new Set();
    return addresses.filter((addr) => {
      if (seen.has(addr.id)) return false;
      seen.add(addr.id);
      return true;
    });
  }, [addresses]);

  const [addressAdded, setAddressAdded] = useState(false);

  useEffect(() => {
    if (addressAdded) {
      const timer = setTimeout(() => setAddressAdded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [addressAdded]);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserAddresses());
  }, [dispatch]);

  if (loading) return <p className="text-center text-lg py-10">Loading...</p>;

  return (
    <Layout>
      <div className="max-w mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Account</h1>

        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-4xl p-6 mb-6 w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Profile Information
          </h2>
          {user && (
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Role:</span> {user.role}
              </p>
            </div>
          )}
        </div>
        {/* Alert message */}
        {addressAdded && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Address added successfully!
          </div>
        )}

        {/* Address Section */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Saved Addresses
          </h2>
          {addressLoading && (
            <p className="text-gray-500">Loading addresses...</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!addressLoading && addresses.length === 0 && (
            <p className="text-gray-500">No addresses found.</p>
          )}

          <div className="max-h-64 overflow-y-auto pr-2 mt-2">
            <ul className="divide-y divide-gray-200">
              {uniqueAddresses.map((addr) => (
                <li
                  key={addr.id}
                  className="border rounded p-4 w-full bg-gray-50 shadow"
                >
                  <div className="space-y-1 text-gray-600">
                    <p>
                      <span className="font-medium">Building:</span>{" "}
                      {addr.building}
                    </p>
                    <p>
                      <span className="font-medium">Street:</span> {addr.street}
                    </p>
                    <p>
                      <span className="font-medium">Landmark:</span>{" "}
                      {addr.landmark}
                    </p>
                    <p>
                      <span className="font-medium">Pincode:</span>{" "}
                      {addr.pincode}
                    </p>
                    <p>
                      <span className="font-medium">State:</span> {addr.state}
                    </p>
                    <p>
                      <span className="font-medium">Country:</span>{" "}
                      {addr.country}
                    </p>
                    <p>
                      <strong>Default:</strong> {addr.default ? "Yes" : "No"}
                    </p>
                    {!addr.default && (
                      <button
                        onClick={() => {
                          dispatch(setDefaultAddress(addr.id))
                            .unwrap()
                            .catch((err) => {
                              console.error("Error setting default:", err);
                              alert("Failed to set address as default.");
                            });
                        }}
                        className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AddressForm onSuccess={() => setAddressAdded(true)} />
          </div>
        </div>

        {/* Add Address Form */}
      </div>
    </Layout>
  );
};

export default Account;
