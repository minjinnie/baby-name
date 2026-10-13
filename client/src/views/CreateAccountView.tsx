import { useNavigate } from "react-router";
import CreateAccount from "@/components/register/CreateAccount";
import { HOME_PATH } from "@/auth/config";
import type { Session } from "@/auth/types";
import { useAuth } from "@/auth/useAuth";

/** Route-level page for `/register`. Owns page concerns (title, session); the form lives in CreateAccount. */
export default function CreateAccountView() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleRegistered = (session: Session) => {
    signIn(session);
    // replace: going "back" from the app shouldn't return to the signup form.
    navigate(HOME_PATH, { replace: true });
  };

  return (
    <>
      {/* React 19 hoists <title> into <head>. */}
      <title>Sign Up | LittleRoots</title>
      <CreateAccount onRegistered={handleRegistered} />
    </>
  );
}
