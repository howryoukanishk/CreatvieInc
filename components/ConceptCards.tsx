"use client";

import Image from "next/image";
import { useState } from "react";
import type { Concept } from "@/content/site";
import { Pending } from "./Pending";

type FieldKey = "audience" | "insight" | "hook" | "narrative" | "rationale" | "role" | "direction";

const fields: { key: FieldKey; label: string }[] = [
  { key: "audience", label: "Intended audience" },
  { key: "insight", label: "Core insight" },
  { key: "hook", label: "Opening hook" },
  { key: "narrative", label: "Narrative & product integration" },
  { key: "rationale", label: "Creative rationale" },
  { key: "role", label: "Creative role" },
  { key: "direction", label: "Creative direction" },
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
      {concepts.map((c, i) =>
        c.bonus ? (
          <BonusCard key={c.slug} concept={c} isOpen={open.includes(c.slug)} onToggle={() => toggle(c.slug)} />
        ) : (
          <CoreCard key={c.slug} concept={c} tone={i} isOpen={open.includes(c.slug)} onToggle={() => toggle(c.slug)} />
        ),
      )}
    </ul>
  );
}

function CoreCard({
  concept: c,
  tone,
  isOpen,
  onToggle,
}: {
  concept: Concept;
  tone: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const dark = tone === 0;
  const panelId = `concept-${c.slug}`;
  return (
    <li className={`flex flex-col rounded-md ${tones[tone % tones.length]}`}>
      <div className="flex min-h-[300px] flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className={`label ${dark ? "text-yellow" : "text-forest"}`}>Concept {c.index}</span>
          <span className={`label ${dark ? "text-sage" : "text-muted"}`}>{c.route}</span>
        </div>
        {c.recommended && (
          <p className="label mt-6 inline-flex self-start rounded-sm bg-forest px-2 py-1 text-[10px] text-yellow">Recommended lead</p>
        )}
        <h3 className={`display ${c.recommended ? "mt-4" : "mt-10"} text-[1.9rem] leading-[1.02] sm:text-[2.1rem] ${dark ? "text-ivory" : "text-forest"}`}>
          {c.title}
        </h3>
        <p className={`mt-4 leading-relaxed ${dark ? "text-ivory/75" : "text-muted"}`}>{c.summary}</p>
        <div className="mt-auto pt-10">
          <ToggleButton isOpen={isOpen} onToggle={onToggle} panelId={panelId} dark={dark} />
        </div>
      </div>

      <div id={panelId} hidden={!isOpen} className={`border-t px-6 pb-7 pt-6 sm:px-7 ${dark ? "border-ivory/15" : "border-ink/10"}`}>
        <DetailFields concept={c} dark={dark} />
        <a
          href={`#film-${c.slug}`}
          className={`link-arrow mt-7 text-sm ${dark ? "text-ivory" : "on-light text-forest"}`}
        >
          Watch the finished execution <span aria-hidden className={dark ? "text-yellow" : ""}>↓</span>
        </a>
      </div>
    </li>
  );
}

function BonusCard({ concept: c, isOpen, onToggle }: { concept: Concept; isOpen: boolean; onToggle: () => void }) {
  const bonus = c.bonus!;
  const panelId = `concept-${c.slug}`;
  return (
    <li className="on-light min-w-0 rounded-md border border-sage bg-cream text-ink md:col-span-3">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label rounded-sm bg-forest px-2 py-1 text-yellow">
              {bonus.label} · {c.index}
            </span>
            <span className="label text-muted">{c.route}</span>
          </div>
          <h3 className="display mt-8 text-[2.1rem] leading-[1.02] text-forest sm:text-[2.6rem]">{c.title}</h3>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">{c.summary}</p>
        </div>
        <div className="flex flex-col justify-end border-t border-sage pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="label text-muted">Final on-screen headline</p>
          <p className="mt-3 font-display text-2xl font-medium leading-snug text-forest sm:text-3xl">“{bonus.headline}”</p>
          <p className="mt-4 text-sm text-muted">
            {bonus.format} · Working title: <i>{bonus.workingTitle}</i>
          </p>
        </div>
        <div className="lg:col-span-12">
          <ToggleButton isOpen={isOpen} onToggle={onToggle} panelId={panelId} dark={false} />
        </div>
      </div>

      <div id={panelId} hidden={!isOpen} className="border-t border-sage px-6 pb-8 pt-8 sm:px-8 lg:px-10 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-muted">Concept overview</p>
            <p className="mt-3 font-display text-xl font-medium leading-snug text-forest">{bonus.intro}</p>
          </div>
          <div className="lg:col-span-8">
            <DetailFields concept={c} dark={false} columns />
          </div>
        </div>

        <Beats beats={bonus.beats} format={bonus.format} />

        <div className="mt-12 rounded-md border border-sage bg-ivory px-6 py-10 text-center sm:px-10">
          <p className="label text-muted">End card · 15–20 sec</p>
          <p className="display mx-auto mt-5 max-w-2xl text-2xl uppercase leading-tight text-forest sm:text-3xl">
            {bonus.closing.product}
          </p>
          {bonus.closing.lines.map((line) => (
            <p key={line} className="label mx-auto mt-4 max-w-xl text-[12px] text-ink">
              {line}
            </p>
          ))}
          <p className="mt-6 inline-flex rounded-full bg-forest px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ivory">
            {bonus.closing.cta}
          </p>
        </div>

        <a href={`#film-${c.slug}`} className="link-arrow mt-7 text-sm text-forest">
          Watch the final film <span aria-hidden>↓</span>
        </a>
      </div>
    </li>
  );
}

function Beats({ beats, format }: { beats: NonNullable<Concept["bonus"]>["beats"]; format: string }) {
  return (
    <section className="mt-12 border-t border-sage pt-8" aria-labelledby="more-moments-beats">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label text-muted">{format}</p>
          <h4 id="more-moments-beats" className="display mt-2 text-2xl text-forest sm:text-3xl">
            The final cut, beat by beat
          </h4>
        </div>
        <p className="max-w-sm text-sm text-muted">Stills taken from the final 20-second film, with its exact on-screen text.</p>
      </div>

      <ol
        className="-mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0"
        aria-label="Film beats"
      >
        {beats.map((b) => (
          <li key={b.time} className="w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[28%] lg:w-auto">
            <div className="relative aspect-[9/16] overflow-hidden rounded-md border border-sage bg-sage/40">
              <Image src={b.image.src} alt={b.image.alt} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 38vw, 62vw" className="object-cover" />
            </div>
            <p className="label mt-4 tabular-nums text-forest">{b.time}</p>
            <p className="mt-1.5 font-display text-lg font-bold leading-tight text-forest">{b.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.description}</p>
            {b.onScreen && (
              <p className="mt-2 text-xs leading-relaxed text-ink">
                <span className="label text-[10px] text-muted">On screen: </span>
                {b.onScreen}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function DetailFields({ concept: c, dark, columns = false }: { concept: Concept; dark: boolean; columns?: boolean }) {
  return (
    <dl className={columns ? "grid gap-x-8 gap-y-6 sm:grid-cols-2" : "space-y-5"}>
      {fields.map((f) => {
        const value = c[f.key];
        if (value === undefined) return null;
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
  );
}

function ToggleButton({
  isOpen,
  onToggle,
  panelId,
  dark,
}: {
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={onToggle}
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
  );
}
