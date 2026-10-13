/** Signed-in users are logged out after this long without any activity. */
export const IDLE_TIMEOUT_MS = 30 * 60 * 1000;

/** How long before the idle logout the warning dialog appears. */
export const IDLE_WARNING_MS = 2 * 60 * 1000;

/** Where users land after an idle logout. */
export const LOGIN_PATH = "/login";
