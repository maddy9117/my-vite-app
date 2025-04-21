//import { useSelector } from "react-redux";

import { useAppSelector } from "../hooks/hooks";
import { selectCartTotalQty } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function Header({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) {
  const totalQty = useAppSelector(selectCartTotalQty);
  //console.log(selectCartTotalQty);
  return (
    <>
      <div className="bg-lime-500 text-black w-full flex flex-row gap items-center justify-between p-4 ">
        <img
          src="./src/assets/react.svg"
          alt="Logo"
          className="object-contain"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-3/6"
        />
        <div className="relative">
          <Link to="/cart" className="text-2xl">
            🛍️ My Cart
          </Link>
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalQty}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
