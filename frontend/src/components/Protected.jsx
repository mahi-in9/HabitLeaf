import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const { isAuthChecked, loading, user } = useSelector((state) => state.user);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  // 🔴 Wait until auth check is done
  if (!isAuthChecked) {
    return <h1>Checking auth...</h1>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
