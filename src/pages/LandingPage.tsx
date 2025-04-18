import { useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";

export default function GetHihgest() {
  const [query, setQuery] = useState("");

  return (
    <div className="p-4">
      <Header query={query} setQuery={setQuery} />

      <ProductGrid query={query} />
    </div>
  );
}
