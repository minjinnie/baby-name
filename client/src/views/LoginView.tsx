import { useLocation } from "react-router";
import Notice from "@/components/common/Notice";
import UserLogin from "@/components/login/UserLogin";
import type { LoginLocationState } from "@/components/session/IdleSessionManager";
import { IDLE_TIMEOUT_MS } from "@/auth/config";
import { useAuth } from "@/auth/useAuth";

const IDLE_MINUTES = IDLE_TIMEOUT_MS / 60_000;

/** Route-level page for `/login`. Explains why the user was sent here, if they were. */
export default function LoginView() {
  const { signIn } = useAuth();
  const { state } = useLocation();
  const reason = (state as LoginLocationState | null)?.reason;

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
      <UserLogin notice={notice} onLoggedIn={signIn} />
    </>
  );
}
