import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import type { RouteObject } from "react-router";
import AuthProvider from "@/auth/AuthProvider";
import RootLayout from "@/layouts/RootLayout";
import AboutView from "@/views/about";

// Views are code-split: each one is downloaded the first time its route is visited.
const HomeView = lazy(() => import("@/views/home"));
const CreateAccountView = lazy(() => import("@/views/CreateAccountView"));
const LoginView = lazy(() => import("@/views/LoginView"));
const NotFoundView = lazy(() => import("@/views/NotFoundView"));
const ContactView = lazy(() => import("@/views/contact"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "register", element: <CreateAccountView /> },
      { path: "login", element: <LoginView /> },
      { path: "about", element: <AboutView /> },
      { path: "contact", element: <ContactView /> },
      // Any path not matched above, including links to pages that aren't built yet.
      { path: "*", element: <NotFoundView /> },
    ],
  },
];

// Created once, outside the component, so it isn't rebuilt on every render.
const router = createBrowserRouter(routes);

/** The whole app: shared providers around the router. */
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
