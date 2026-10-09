import type { ReactNode } from "react";

export function SectionHeader({
  index,
  label,
  title,
  intro,
  tone = "light",
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <header className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <p className={`label lg:col-span-3 ${dark ? "text-sage" : "text-muted"}`}>
        <span className={dark ? "text-yellow" : "text-forest"}>{index}</span>
        <span className="mx-2 opacity-50">—</span>
        {label}
      </p>
      <div className="lg:col-span-9">
        <h2 className={`display text-[2.25rem] sm:text-5xl lg:text-[4rem] ${dark ? "text-ivory" : "text-forest"}`}>
          {title}
        </h2>
        {intro && (
          <div className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${dark ? "text-ivory/75" : "text-muted"}`}>
            {intro}
          </div>
        )}
      </div>
    </header>
  );
}
