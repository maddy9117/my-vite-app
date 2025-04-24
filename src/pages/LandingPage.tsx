import ProductGrid from "../components/ProductGrid";
import Layout from "../components/Layout";

export default function LandingPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Browse Products</h1>
      <ProductGrid />
    </Layout>
  );
}
