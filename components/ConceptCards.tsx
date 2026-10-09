"use client";

import { useState } from "react";
import type { Concept } from "@/content/site";
import { Pending } from "./Pending";

const fields: { key: keyof Concept; label: string }[] = [
  { key: "audience", label: "Intended audience" },
  { key: "insight", label: "Core insight" },
  { key: "hook", label: "Opening hook" },
  { key: "narrative", label: "Narrative & product integration" },
  { key: "rationale", label: "Creative rationale" },
];

const tones = [
  "bg-forest text-ivory",
  "bg-sage text-ink",
  "bg-white/60 text-ink border border-ink/10",
];

export function ConceptCards({ concepts }: { concepts: Concept[] }) {
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (slug: string) =>
    setOpen((o) => (o.includes(slug) ? o.filter((s) => s !== slug) : [...o, slug]));

  return (
    <ul className="grid items-start gap-4 md:grid-cols-3 md:gap-5">
      {concepts.map((c, i) => {
        const isOpen = open.includes(c.slug);
        const dark = i === 0;
        const panelId = `concept-${c.slug}`;
        return (
          <li key={c.slug} className={`flex flex-col rounded-md ${tones[i % tones.length]}`}>
            <div className="flex min-h-[300px] flex-col p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className={`label ${dark ? "text-yellow" : "text-forest"}`}>Concept {c.index}</span>
                <span className={`label ${dark ? "text-sage" : "text-muted"}`}>{c.route}</span>
              </div>
              <h3 className={`display mt-10 text-[1.9rem] leading-[1.02] sm:text-[2.1rem] ${dark ? "text-ivory" : "text-forest"}`}>
                {c.title}
              </h3>
              <p className={`mt-4 leading-relaxed ${dark ? "text-ivory/75" : "text-muted"}`}>{c.summary}</p>
              <div className="mt-auto pt-10">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(c.slug)}
                className={`group flex w-full items-center justify-between gap-4 border-t pt-5 text-left text-sm font-medium ${
                  dark ? "border-ivory/20" : "on-light border-ink/15 text-forest"
                }`}
              >
                {isOpen ? "Hide concept details" : "Open concept details"}
                <span
                  aria-hidden
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ease-editorial ${
                    dark ? "bg-yellow text-forest" : "bg-forest text-ivory"
                  } ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              </div>
            </div>

            <div id={panelId} hidden={!isOpen} className={`border-t px-6 pb-7 pt-6 sm:px-7 ${dark ? "border-ivory/15" : "border-ink/10"}`}>
              <dl className="space-y-5">
                {fields.map((f) => {
                  const value = c[f.key];
                  return (
                    <div key={f.key}>
                      <dt className={`label ${dark ? "text-sage" : "text-muted"}`}>{f.label}</dt>
                      <dd className="mt-2 text-[15px] leading-relaxed">
                        {value ? value : <Pending what={`${f.label} — to be supplied`} tone={dark ? "dark" : "light"} />}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <a
                href={`#film-${c.slug}`}
                className={`link-arrow mt-7 text-sm ${dark ? "text-ivory" : "on-light text-forest"}`}
              >
                Watch the finished execution <span aria-hidden className={dark ? "text-yellow" : ""}>↓</span>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
