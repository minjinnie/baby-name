import CreateAccount from "@/components/register/CreateAccount";
import { useAuth } from "@/auth/useAuth";

/** Route-level page for `/register`. Owns page concerns (title, session); the form lives in CreateAccount. */
export default function CreateAccountView() {
  const { signIn } = useAuth();

  return (
    <>
      {/* React 19 hoists <title> into <head>. */}
      <title>Sign Up | LittleRoots</title>
      <CreateAccount onRegistered={signIn} />
    </>
  );
}
