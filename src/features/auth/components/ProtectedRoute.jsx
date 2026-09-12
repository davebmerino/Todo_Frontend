import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/features/auth/context/AuthContext";
import { paths } from "@/paths";
import PageLoadingFallback from "@/components/feedback/PageLoadingFallback";

function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <PageLoadingFallback />;
  }

  if (!isAuthenticated) {
    const redirectTo = `${paths.login}?redirectTo=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
