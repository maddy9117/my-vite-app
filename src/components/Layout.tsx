// src/components/Layout.tsx
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearCart, selectCartTotalQty } from "../features/cart/cartSlice";
import {
  FaHouseUser,
  FaRegUserCircle,
  FaShoppingBag,
  FaShoppingCart,
} from "react-icons/fa";
import SearchBar from "./SearchBar";
import { logout } from "../features/auth/authSlice";
import axios from "axios";
import { FaListCheck } from "react-icons/fa6";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token, user } = useAppSelector((state) => state.auth);

  const totalQty = useAppSelector(selectCartTotalQty);

  const hideSearch = ["/account"].includes(location.pathname);

  const isActive = (path: string) =>
    location.pathname === path ? "text-blue-600 font-bold" : "text-gray-700";

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <FaShoppingBag />
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🛍️ mStore
          </Link>

          {/* Search Bar */}
          {!hideSearch && <SearchBar />}

          {/* Nav Links */}
          <nav className="flex items-center gap-6">
            <div className="relative flex items-center gap-1">
              <FaHouseUser />
              <Link to="/" className={isActive("/")}>
                Home
              </Link>
            </div>
            <div className="relative flex items-center gap-1">
              <FaRegUserCircle />
              {user && (
                <Link to="/account" className="text-blue-600 hover:underline">
                  {user.name || "Account"}
                </Link>
              )}
            </div>

            {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            )}
            {user && (
              <Link
                to="/cart"
                className={`relative flex items-center gap-1 ${isActive(
                  "/cart"
                )}`}
              >
                <FaShoppingCart />
                {totalQty > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {totalQty}
                  </span>
                )}
                <FaListCheck />
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto px-4 py-6">{children}</main>

      <footer className="bg-white text-center text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} mStore. All rights reserved.
      </footer>
    </div>
  );
}
