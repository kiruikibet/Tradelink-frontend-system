import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader fullScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.is_staff && !user.is_superuser) return <Navigate to="/access-denied" replace />;
  return children;
}

export default AdminRoute;
