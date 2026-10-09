// Visible placeholder for material that has not been supplied yet.
// Deliberately looks unfinished so nothing is mistaken for real content.
export function Pending({
  what,
  tone = "light",
  className = "",
}: {
  what: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const colours =
    tone === "dark" ? "border-ivory/25 text-ivory/60" : "border-ink/20 text-muted";
  return (
    <div
      className={`flex items-center gap-3 rounded-md border border-dashed px-4 py-3 text-sm ${colours} ${className}`}
    >
      <span className="label shrink-0 rounded-sm bg-yellow/90 px-1.5 py-0.5 text-[10px] text-forest">
        Pending
      </span>
      <span>{what}</span>
    </div>
  );
}
