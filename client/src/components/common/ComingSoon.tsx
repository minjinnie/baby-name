import type { ReactNode } from "react";
import { Link } from "react-router";
import { HOME_PATH } from "@/auth/config";
import styles from "@/scss/components/ComingSoon.module.scss";

interface ComingSoonProps {
  /** Page name, e.g. "Favorites". Used in the heading and the tab title. */
  feature: string;
  description: string;
  /** What users will be able to do, shown as a short preview list. */
  highlights: string[];
  /** Illustration shown above the heading. */
  icon: ReactNode;
  /** Optional link to something users can do today. */
  action?: { to: string; label: string };
}

/** Placeholder for a page that's planned but not built yet. */
export default function ComingSoon({ feature, description, highlights, icon, action }: ComingSoonProps) {
  return (
    <>
      <title>{`${feature} | LittleRoots`}</title>
      <div className={styles.page}>
        <section className={styles.card} aria-labelledby="coming-soon-title">
          <div className={styles.icon} aria-hidden="true">
            {icon}
          </div>

          <p className={styles.badge}>Coming soon</p>
          <h1 id="coming-soon-title" className={styles.title}>
            {feature} is still growing
          </h1>
          <p className={styles.description}>{description}</p>

          <ul className={styles.highlights} aria-label={`What ${feature} will offer`}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            {action && (
              <Link to={action.to} className={styles.primary}>
                {action.label}
              </Link>
            )}
            <Link to={HOME_PATH} className={action ? styles.secondary : styles.primary}>
              Back to home
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
