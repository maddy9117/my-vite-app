import { useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Layout from "../components/Layout";

export default function LandingPage() {
  //const [query, setQuery] = useState("");
  //  <Header query={query} setQuery={setQuery} />
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Browse Products</h1>
      <ProductGrid query="" />
    </Layout>
  );
}
