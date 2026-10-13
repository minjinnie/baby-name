import { Link, useLocation, useNavigate } from "react-router";
import { HOME_PATH } from "@/auth/config";
import styles from "@/scss/views/NotFoundView.module.scss";

/** Catch-all page for any URL that doesn't match a route. */
export default function NotFoundView() {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();
  // React Router gives the first page of a visit the key "default"; there's nowhere to go back to.
  const canGoBack = key !== "default";

  return (
    <>
      <title>Page Not Found | LittleRoots</title>
      <div className={styles.page}>
        <section className={styles.content} aria-labelledby="not-found-title">
          <p className={styles.code} aria-label="Error 404">
            <span aria-hidden="true">4</span>
            <SproutIllustration />
            <span aria-hidden="true">4</span>
          </p>

          <h1 id="not-found-title" className={styles.title}>
            This page hasn't sprouted yet
          </h1>
          <p className={styles.message}>
            We couldn't find <code className={styles.path}>{pathname}</code>. It may still be growing, or it may have
            moved.
          </p>

          <div className={styles.actions}>
            <Link to={HOME_PATH} className={styles.primary}>
              Go to home
            </Link>
            {canGoBack && (
              <button type="button" className={styles.secondary} onClick={() => navigate(-1)}>
                Go back
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

/** Seedling that stands in for the "0" in 404. Colors come from the stylesheet. */
function SproutIllustration() {
  return (
    <svg className={styles.sprout} viewBox="0 0 120 120" aria-hidden="true">
      <circle className={styles.sproutBg} cx="60" cy="60" r="56" />
      <ellipse className={styles.sproutSoil} cx="60" cy="90" rx="30" ry="7" />
      <path className={styles.sproutStem} d="M60 90 C60 74 60 62 60 50" />
      <path className={styles.sproutLeafLight} d="M60 68 C45 68 35 59 33 46 C48 44 58 53 60 68 Z" />
      <path className={styles.sproutLeafDark} d="M60 56 C62 41 74 32 89 31 C89 46 77 57 60 56 Z" />
      <circle className={styles.sproutDew} cx="90" cy="70" r="6" />
      <circle className={styles.sproutSun} cx="30" cy="28" r="7" />
    </svg>
  );
}
