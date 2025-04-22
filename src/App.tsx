import { Routes, Route, BrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";
import AccountPage from "./pages/AccountPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter basename="/my-vite-app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}

        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Add more protected routes here */}
        </Route>
        {/* If no route matches */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
