import ComingSoon from "@/components/common/ComingSoon";

/** Route-level page for `/favorites`. Placeholder until the favorites list is built. */
export default function FavoritesView() {
  return (
    <ComingSoon
      feature="Favorites"
      description="Soon you'll have one place to keep every name you love, ready to revisit whenever inspiration strikes."
      highlights={[
        "Save names straight from Discover with a single tap",
        "See each name's meaning and family story at a glance",
        "Narrow down your list until the perfect name stands out",
      ]}
      action={{ to: "/discover", label: "Discover names" }}
      icon={
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
        </svg>
      }
    />
  );
}
