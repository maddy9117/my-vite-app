import { useEffect, useState } from "react";
import { Product } from "../types/Product";

export default function ProductGrid({ query = "" }: { query: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  

  useEffect(() => {
    async function fetchData() {
      const url = query
        ? `http://localhost:8080/products/search?query=${query}`
        : `http://localhost:8080/products`;
      const response = await fetch(url);
      const json = await response.json();
      setProducts(json);
    }

    fetchData();
  }, [query]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );


  const [cart, setCart] = useState<{ [id: string]: number }>({});

  const increment = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id: string) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredProducts.length === 0 && (
  <div className="col-span-full text-center text-gray-500">No products found.</div>
)}
      {filteredProducts.map((product) => {
        const qty = cart[product.id] || 0;

        return (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:8080${product.images[0]}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-green-600 font-medium mt-1">₹{product.price}</p>
            <p className="text-sm text-gray-700 mt-1 line-clamp-2">{product.description}</p>

            {qty === 0 ? (
              <button
                onClick={() => increment(product.id.toString())}
                className="mt-4 w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            ) : (
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => decrement(product.id.toString())}
                  className="bg-gray-200 px-3 py-1 rounded-l-lg text-lg"
                >
                  −
                </button>
                <span className="px-4 font-semibold">{qty}</span>
                <button
                  onClick={() => increment(product.id.toString())}
                  className="bg-gray-200 px-3 py-1 rounded-r-lg text-lg"
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}