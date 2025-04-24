import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { fetchProducts } from "../features/products/productsSlice"; // Assuming you have an action for fetching products

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts("")); // Pass an empty object or required argument(s) to fetch products
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image"
          />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹{product.price}</p>

          {/* Check if the product is out of stock */}
          {product.stock <= 0 ? (
            <p className="out-of-stock-label">Out of Stock</p>
          ) : (
            <button className="add-to-cart-button">Add to Cart</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
