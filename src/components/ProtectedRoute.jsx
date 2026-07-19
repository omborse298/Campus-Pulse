import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  user,
  allowedRole,
}) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;