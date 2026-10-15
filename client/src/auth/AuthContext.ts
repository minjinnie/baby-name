import { createContext } from "react";
import type { RequestOptions } from "@/api/client";
import type { Session } from "@/auth/types";
import type { User } from "shared";

export interface SignInOptions {
  remember?: boolean;
}

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  /**
   * Stores a session returned by register or login. By default the session ends
   * when the browser closes; pass `remember: true` to keep it across restarts.
   */
  signIn: (session: Session, options?: SignInOptions) => void;
  /** Ends the server session (best effort) and clears the local one. */
  signOut: () => Promise<void>;
  /**
   * `apiRequest` with the current token attached. A 401 response means the
   * server no longer recognises the token, so the local session is cleared.
   */
  authRequest: <T>(path: string, options?: Omit<RequestOptions, "token">) => Promise<T>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
