import { Routes, Route, BrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";
import AccountPage from "./pages/AccountPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckOutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useEffect } from "react";
import { fetchUserProfile } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [token, dispatch]);
  return (
    <BrowserRouter basename="/my-vite-app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        {/* Add more protected routes here */}
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Route>
        {/* If no route matches */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
