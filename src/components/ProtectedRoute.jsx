import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user, allowedRole }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user exists but role is wrong, redirect to home
  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;