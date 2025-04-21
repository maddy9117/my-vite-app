import { Routes, Route, BrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter basename="/my-vite-app">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
