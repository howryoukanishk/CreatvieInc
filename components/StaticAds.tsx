"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { StaticAd } from "@/content/research";
import { ExternalLink } from "./ExternalLink";
import { Score } from "./Score";

export function StaticAds({ ads }: { ads: StaticAd[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = ads.find((a) => a.slug === openSlug) ?? null;

  const close = () => {
    const slug = openSlug;
    setOpenSlug(null);
    if (slug) triggers.current[slug]?.focus();
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
        {ads.map((ad, i) => (
          <li key={ad.slug}>
            <button
              ref={(el) => {
                triggers.current[ad.slug] = el;
              }}
              type="button"
              onClick={() => setOpenSlug(ad.slug)}
              aria-haspopup="dialog"
              className="on-light group flex h-full w-full flex-col overflow-hidden rounded-md border border-ink/10 bg-white/50 text-left transition-[border-color,transform] duration-300 ease-editorial hover:-translate-y-0.5 hover:border-forest/40"
            >
              <span className="relative block aspect-[4/5] w-full overflow-hidden bg-sage/50">
                <Image
                  src={ad.image.src}
                  alt={ad.image.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-contain p-3 transition-transform duration-500 ease-editorial group-hover:scale-[1.02]"
                />
                <span className="label absolute left-2 top-2 rounded-sm bg-ivory/90 px-1.5 py-0.5 text-[10px] text-muted">
                  0{i + 1}
                </span>
              </span>
              <span className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                <span className="flex items-start justify-between gap-2">
                  <span className="font-display text-base font-bold leading-tight text-forest sm:text-lg">{ad.brand}</span>
                  <Score value={ad.score} />
                </span>
                <span className="label text-[10px] text-muted">{ad.territory}</span>
                <span className="mt-auto pt-2 text-xs font-medium text-forest">
                  Read analysis <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AdLightbox ad={current} onClose={close} />
    </>
  );
}

function AdLightbox({ ad, onClose }: { ad: StaticAd | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (ad && !d.open) d.showModal();
    if (!ad && d.open) d.close();
  }, [ad]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="ad-lightbox-title"
      className="m-auto max-h-[92svh] w-[min(1100px,calc(100vw-2rem))] overflow-y-auto rounded-lg bg-ivory p-0 text-ink shadow-2xl"
    >
      {ad && (
        <div className="on-light grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="relative flex items-center justify-center bg-sage/60 p-6 md:p-10">
            <Image
              src={ad.image.src}
              alt={ad.image.alt}
              width={ad.image.width}
              height={ad.image.height}
              className="h-auto max-h-[60svh] w-auto rounded-sm shadow-sm"
            />
          </div>
          <div className="p-6 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label text-muted">{ad.angle}</p>
                <h3 id="ad-lightbox-title" className="display mt-2 text-3xl text-forest md:text-4xl">
                  {ad.brand}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="label -mr-2 -mt-1 flex h-10 items-center gap-2 rounded px-2 text-forest hover:bg-sage/60"
              >
                Close <span aria-hidden className="text-lg leading-none">×</span>
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
              <Score value={ad.score} size="lg" />
              <span className="text-xs text-muted">Subjective creative assessment — not performance data</span>
            </div>

            <p className="mt-6 font-display text-lg font-medium leading-snug text-ink">{ad.headline}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <AnalysisList title="Why it works" items={ad.works} marker="+" />
              <AnalysisList title="Why it doesn’t" items={ad.fallsShort} marker="–" />
            </div>

            <div className="mt-8 rounded-md bg-forest p-5 text-ivory">
              <p className="label text-yellow">Takeaway for Vāyas</p>
              <p className="mt-2 leading-relaxed">{ad.takeaway}</p>
            </div>

            <p className="mt-6 text-sm">
              <ExternalLink href={ad.source}>View original in Meta Ad Library</ExternalLink>
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function AnalysisList({ title, items, marker }: { title: string; items: string[]; marker: string }) {
  return (
    <div>
      <p className="label text-muted">{title}</p>
      <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="font-display font-bold text-forest/50">
              {marker}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
