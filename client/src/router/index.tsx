import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";
import RootLayout from "@/layouts/RootLayout";

// Views are code-split: each one is downloaded the first time its route is visited.
const HomeView = lazy(() => import("@/views/HomeView"));
const CreateAccountView = lazy(() => import("@/views/CreateAccountView"));
const LoginView = lazy(() => import("@/views/LoginView"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "register", element: <CreateAccountView /> },
      { path: "login", element: <LoginView /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
