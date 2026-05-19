export default function TableSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Header skeleton */}
      <div
        className="flex items-center gap-4 px-5 py-3"
        style={{
          background: "var(--bg-elevated)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-3 w-40 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-3 w-16 rounded ml-auto" />
      </div>

      {/* Row skeletons */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-5 py-4"
          style={{
            background: i % 2 === 0 ? "var(--bg-surface)" : "transparent",
            borderTop: i === 0 ? "none" : "1px solid var(--border)",
          }}
        >
          {/* Name with avatar */}
          <div className="flex items-center gap-3 w-32">
            <div className="skeleton w-7 h-7 rounded-full flex-shrink-0" />
            <div className="skeleton h-3 flex-1 rounded" />
          </div>

          {/* Email */}
          <div className="skeleton h-3 w-44 rounded" />

          {/* Status badge */}
          <div className="skeleton h-6 w-20 rounded-lg" />

          {/* Source badge */}
          <div className="skeleton h-6 w-20 rounded-lg" />

          {/* Date */}
          <div className="skeleton h-3 w-20 rounded" />

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="skeleton h-7 w-14 rounded-lg" />
            <div className="skeleton h-7 w-16 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
