import { useEffect, useState } from "react";
import { Product } from "../types/Product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    
    async function fetchData() {
      const response = await fetch("http://localhost:8080/products");  
      const json = await response.json();
      setProducts(json);
    }
     fetchData();
    
  }, [])
  


  return(
   /* <div className="w-screen min-h-screen p-4 bg-white">
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} {p.description} {p.stock}</li>
        ))}
    </ul></div>*/
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg"
        >
            <img
            src={`http://localhost:8080${product.images[0]}`}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p> Category - {product.category}</p>

            <p className="text-gray-500 text-sm truncate">{product.description}</p>
            <div className="mt-2 font-bold text-blue-600">${product.price.toFixed(2)}</div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
}