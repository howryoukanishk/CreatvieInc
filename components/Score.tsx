import { SCORE_DISCLAIMER } from "@/content/research";

export function Score({ value, size = "md", tone = "light" }: { value: number; size?: "md" | "lg"; tone?: "light" | "dark" }) {
  const big = size === "lg";
  return (
    <span
      className={`inline-flex items-baseline gap-0.5 font-display font-bold tabular-nums ${
        tone === "dark" ? "text-ivory" : "text-forest"
      }`}
      title={SCORE_DISCLAIMER}
    >
      <span className={big ? "text-4xl" : "text-2xl"}>{value}</span>
      <span className={`${big ? "text-base" : "text-sm"} font-medium opacity-60`}>/25</span>
      <span className="sr-only"> — subjective creative assessment</span>
    </span>
  );
}
