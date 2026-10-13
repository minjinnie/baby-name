import { Suspense } from "react";
import { Outlet } from "react-router";
import IdleSessionManager from "@/components/session/IdleSessionManager";
import Header from "@/app/header";
import Footer from "@/app/footer";
import styles from "@/scss/layouts/RootLayout.module.scss";
import "@/app/layout.css";

/** App shell shared by every route. The current page renders inside <main>. */
export default function RootLayout() {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        {/* Suspense shows the fallback while a lazy view's chunk downloads. */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <IdleSessionManager />
    </div>
  );
}
