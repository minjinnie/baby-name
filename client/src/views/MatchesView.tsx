import ComingSoon from "@/components/common/ComingSoon";

const HEART =
  "M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z";

/** Route-level page for `/matches`. Placeholder until partner matching is built. */
export default function MatchesView() {
  return (
    <ComingSoon
      feature="Matches"
      description="Soon you'll be able to link accounts with your partner and see the names you both fell for."
      highlights={[
        "Connect your account with your partner's",
        "See the names you both saved, side by side",
        "Celebrate when you match on the same name",
      ]}
      action={{ to: "/discover", label: "Discover names" }}
      icon={
        // Two overlapping hearts: one filled, one outlined.
        <svg viewBox="0 0 24 24">
          <path d={HEART} transform="translate(-1 0.5) scale(0.75)" fill="currentColor" />
          <path
            d={HEART}
            transform="translate(7 4.5) scale(0.75)"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  );
}
