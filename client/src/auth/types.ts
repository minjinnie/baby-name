/** Public user shape returned by the auth endpoints. */
export interface User {
  id: string;
  name: string;
  email: string;
}

/** What the server returns on register/login, and what the client keeps while signed in. */
export interface Session {
  user: User;
  token: string;
}
