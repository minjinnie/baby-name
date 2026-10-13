import { useLocation, useNavigate } from "react-router";
import Notice from "@/components/common/Notice";
import UserLogin from "@/components/login/UserLogin";
import type { LoginLocationState } from "@/components/session/IdleSessionManager";
import { HOME_PATH, IDLE_TIMEOUT_MS } from "@/auth/config";
import type { SignInOptions } from "@/auth/AuthContext";
import type { Session } from "@/auth/types";
import { useAuth } from "@/auth/useAuth";

const IDLE_MINUTES = IDLE_TIMEOUT_MS / 60_000;

/** Route-level page for `/login`. Explains why the user was sent here, if they were. */
export default function LoginView() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const reason = (state as LoginLocationState | null)?.reason;

  const handleLoggedIn = (session: Session, options: SignInOptions) => {
    signIn(session, options);
    // replace: going "back" from the app shouldn't return to the login form.
    navigate(HOME_PATH, { replace: true });
  };

  const notice =
    reason === "idle" ? (
      <Notice title="You've been logged out">
        For your security, we logged you out after {IDLE_MINUTES} minutes of inactivity. Please log in again to
        continue.
      </Notice>
    ) : reason === "signed-out" ? (
      <Notice>You have been logged out.</Notice>
    ) : null;

  return (
    <>
      <title>Log In | LittleRoots</title>
      <UserLogin notice={notice} onLoggedIn={handleLoggedIn} />
    </>
  );
}
