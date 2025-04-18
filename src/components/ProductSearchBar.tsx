import { useState } from "react";
import ProductGrid from "./ProductGrid";

export default function ProductSearchBar({ query, setQuery }: { query: string, setQuery: (query: string) => void }) {
  //const [query, setQuery] = useState("");

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      
    </div>
  );
}
