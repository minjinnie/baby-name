import { Navigate, Outlet, useLocation } from "react-router";
import { LOGIN_PATH } from "@/auth/config";
import { useAuth } from "@/auth/useAuth";
import type { LoginLocationState } from "@/components/session/IdleSessionManager";

/**
 * Route guard. Child routes render only for signed-in users; everyone else is
 * sent to the login page, which brings them back here after they log in.
 *
 * Usage in the route table:
 *   { element: <RequireAuth />, children: [{ path: "discover", element: <DiscoverView /> }] }
 */
export default function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const state: LoginLocationState = {
      reason: "auth-required",
      from: location.pathname + location.search + location.hash,
    };
    return <Navigate to={LOGIN_PATH} replace state={state} />;
  }

  return <Outlet />;
}
