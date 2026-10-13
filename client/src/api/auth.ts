import { apiRequest } from "@/api/client";
import type { Session } from "@/auth/types";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

/** `POST /api/auth` — creates the account and a server session. */
export function register(input: RegisterInput): Promise<Session> {
  return apiRequest<Session>("/auth", { method: "POST", body: input });
}

export interface LoginInput {
  email: string;
  password: string;
}

/** `PUT /api/auth` — verifies credentials and creates a server session. */
export function login(input: LoginInput): Promise<Session> {
  return apiRequest<Session>("/auth", { method: "PUT", body: input });
}

/** `DELETE /api/auth` — ends the server session for this token. */
export function logout(token: string): Promise<{ message: string }> {
  return apiRequest("/auth", { method: "DELETE", token });
}
