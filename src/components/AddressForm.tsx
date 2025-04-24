import { useState } from "react";
import { addAddress } from "../features/address/addressSlice";
import { useAppDispatch } from "../hooks/hooks";
import { indianStates } from "../data/IndianStates";
//import axios from "axios";
//import { Address } from "../types/Address";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    building: "",
    street: "",
    landmark: "",
    state: "",
    pincode: "",
    country: "",
  });
  const dispatch = useAppDispatch();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addAddress(formData)) // Replace "currentUserId" with the actual user ID
      .unwrap()
      .then(() => {
        setFormData({
          building: "",
          street: "",
          landmark: "",
          pincode: "",
          state: "",
          country: "India",
        });
      })
      .catch((err) => {
        console.error("Failed to add address:", err);
        alert("Error adding address");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <h2 className="text-xl font-semibold text-gray-700">Add New Address</h2>
      {["building", "street", "landmark", "pincode"].map((field) => (
        <input
          key={field}
          name={field}
          value={(formData as any)[field]}
          onChange={handleChange}
          required
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 border rounded"
        />
      ))}
      {/* Special rendering for state field */}
      <select
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select State</option>
        {indianStates.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <input
        name="country"
        value="India"
        disabled
        className="w-full p-2 border rounded bg-gray-100 text-gray-600"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Address
      </button>
    </form>
  );
};

export default AddressForm;
