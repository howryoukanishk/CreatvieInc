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
          <p className="label text-muted">Tagline</p>
          <p className="mt-3 font-display text-2xl font-medium leading-snug text-forest sm:text-3xl">“{bonus.tagline}”</p>
          <p className="mt-4 text-sm text-muted">{bonus.format}</p>
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

        <Storyboard frames={bonus.storyboard} format={bonus.format} />

        <div className="mt-12 rounded-md border border-sage bg-ivory px-6 py-10 text-center sm:px-10">
          <p className="label text-muted">Closing brand message · end card</p>
          <p className="display mx-auto mt-5 max-w-2xl text-2xl uppercase leading-tight text-forest sm:text-3xl">
            {bonus.closing.lines[0]}
          </p>
          {bonus.closing.lines.slice(1).map((line) => (
            <p key={line} className="label mx-auto mt-3 max-w-xl text-[12px] text-ink">
              {line}
            </p>
          ))}
          <p className="mt-6 inline-flex rounded-full bg-forest px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ivory">
            {bonus.closing.cta}
          </p>
        </div>

        <p className="mt-6 text-sm text-muted">
          The animated film is in development, so there is no finished execution to play yet.
        </p>
      </div>
    </li>
  );
}

function Storyboard({ frames, format }: { frames: NonNullable<Concept["bonus"]>["storyboard"]; format: string }) {
  const hasImages = frames.some((f) => f.image);
  return (
    <section className="mt-12 border-t border-sage pt-8" aria-labelledby="more-moments-storyboard">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label text-muted">{format}</p>
          <h4 id="more-moments-storyboard" className="display mt-2 text-2xl text-forest sm:text-3xl">
            Storyboard
          </h4>
        </div>
        <p className="max-w-sm text-sm text-muted">
          The current creative sequence, not a finished film.
          {!hasImages && " Frames are placeholders until the approved storyboard images arrive."}
        </p>
      </div>
      {!hasImages && <Pending what="Approved storyboard images for all 11 frames" className="mt-5" />}

      <ol
        className="-mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
        aria-label="Storyboard frames"
      >
        {frames.map((f, i) => (
          <li key={f.title} className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-sage bg-sage/40">
              {f.image ? (
                <Image src={f.image.src} alt={f.image.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 70vw" className="object-cover" />
              ) : (
                <div aria-hidden className="flex h-full flex-col justify-between p-4">
                  <span className="label text-[10px] text-forest/60">Frame placeholder</span>
                  <span className="display text-6xl text-forest/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
              )}
            </div>
            <p className="label mt-4 text-forest">Frame {String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1.5 font-display text-lg font-bold leading-tight text-forest">{f.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.description}</p>
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
