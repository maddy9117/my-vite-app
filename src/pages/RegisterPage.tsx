import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { registerUser } from "../features/auth/authSlice";

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
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
