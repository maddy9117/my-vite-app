import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchUserProfile } from "../features/auth/authSlice";
import Layout from "../components/Layout";

const Account = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Layout>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Info</h2>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.role}
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Account;
