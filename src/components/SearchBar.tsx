import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types/Product";


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      axios.get(`http://localhost:8080/products/search?query=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.error("Search failed", err));
    }, 300); // debounce for 300ms

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="w-3/6">
      <input
        type="text"
        placeholder="Search products..."
        className="p-2 border rounded w-full mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img 
             src={`http://localhost:8080${product.images[0]}`}alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            <p className="mt-2 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
