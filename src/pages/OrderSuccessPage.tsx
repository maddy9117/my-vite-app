import Layout from "../components/Layout";

const OrderSuccess = () => (
  <>
    <Layout>
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Order Placed!
        </h1>
        <p>Thank you for your purchase. Your order is being processed.</p>
      </div>
    </Layout>{" "}
  </>
);

export default OrderSuccess;
