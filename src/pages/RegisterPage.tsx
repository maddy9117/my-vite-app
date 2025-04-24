import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { registerUser } from "../features/auth/authSlice";
import { indianStates } from "../data/IndianStates";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+91", // Default country code India
    address: {
      building: "",
      street: "",
      landmark: "",
      pincode: "",
      state: "",
      country: "India",
    },
  });

  const [error, setError] = useState("");

  /* const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };*/

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (
      [
        "building",
        "street",
        "landmark",
        "pincode",
        "state",
        "country",
      ].includes(name)
    ) {
      setForm({
        ...form,
        address: {
          ...form.address,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Phone validation - should be 10 digits
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(form.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    // Remove confirmPassword field for backend
    const { confirmPassword, ...registerData } = form;

    try {
      await dispatch(registerUser(registerData)).unwrap();
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          {/* Phone Number with Country Code */}
          <div className="flex gap-2 items-center">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="border rounded p-2 w-24"
            >
              <option value="+91">🇮🇳 +91</option>
              {/* Add more options as needed */}
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
            </select>

            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              value={form.phone}
              onChange={handleChange}
              required
              className="border rounded p-2 flex-1"
              placeholder="Enter 10-digit phone number"
              title="Enter a valid 10-digit phone number"
            />
          </div>
          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="building"
              placeholder="Building"
              value={form.address.building}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={form.address.street}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={form.address.landmark}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.address.pincode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />

            <select
              name="state"
              value={form.address.state}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
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
              type="text"
              name="country"
              value={form.address.country}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              disabled // since it's always India
            />
          </div>
          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
