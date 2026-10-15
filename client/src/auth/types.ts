import type { User } from "shared";

/** What the server returns on register/login, and what the client keeps while signed in. */
export interface Session {
  user: User;
  token: string;
}
