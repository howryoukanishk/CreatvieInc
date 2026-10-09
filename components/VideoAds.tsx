"use client";

import Image from "next/image";
import { useState } from "react";
import type { VideoAd } from "@/content/research";
import { ExternalLink } from "./ExternalLink";
import { Pending } from "./Pending";
import { Score } from "./Score";
import { AnalysisList } from "./StaticAds";

export function VideoAds({ ads }: { ads: VideoAd[] }) {
  const [open, setOpen] = useState<string | null>(ads[0]?.slug ?? null);

  return (
    <ol className="border-t border-ink/15">
      {ads.map((ad, i) => {
        const isOpen = open === ad.slug;
        const panelId = `video-ad-${ad.slug}`;
        return (
          <li key={ad.slug} className="border-b border-ink/15">
            <h4>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : ad.slug)}
                className="on-light group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-x-3 py-5 text-left sm:grid-cols-[3rem_minmax(0,1.2fr)_minmax(0,1fr)_auto_2rem] sm:gap-x-6 sm:py-6"
              >
                <span className="label text-muted">0{i + 1}</span>
                <span>
                  <span className="block font-display text-xl font-bold leading-tight text-forest sm:text-2xl">{ad.brand}</span>
                  <span className="mt-1 block text-sm text-muted sm:hidden">{ad.mechanism}</span>
                </span>
                <span className="hidden text-sm text-muted sm:block">
                  {ad.mechanism}
                  {ad.adjacent && <span className="label ml-2 rounded-sm bg-sage px-1.5 py-0.5 text-[10px] text-forest">Adjacent category</span>}
                </span>
                <Score value={ad.score} />
                <span
                  aria-hidden
                  className={`hidden h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-forest transition-transform duration-300 ease-editorial group-hover:border-forest/50 sm:flex ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h4>

            <div id={panelId} hidden={!isOpen} className="pb-10">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  {ad.media ? (
                    <div className="relative aspect-[9/16] max-h-[70svh] overflow-hidden rounded-md bg-forest">
                      <Image src={ad.media.poster} alt={ad.media.alt} fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/5] max-h-[420px] w-full flex-col justify-between rounded-md bg-forest p-5 text-ivory sm:aspect-[9/12]">
                      <p className="label text-sage">{ad.product}</p>
                      <Pending what="Poster frame / clip from the original ad" tone="dark" />
                    </div>
                  )}
                  <p className="mt-4 text-sm">
                    <ExternalLink href={ad.source}>Watch original ad</ExternalLink>
                  </p>
                  {ad.adjacent && (
                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      Scope note: treated as an adjacent-category reference, not a direct women’s calcium competitor.
                    </p>
                  )}
                </div>

                <div className="lg:col-span-8">
                  <p className="label text-muted">{ad.angle}</p>
                  <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-3">
                    <Beat term="Opening hook" detail={ad.hook} />
                    <Beat term="Narrative" detail={ad.narrative} />
                    <Beat term="Product integration" detail={ad.productIntegration} />
                  </dl>
                  <div className="mt-8 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-2">
                    <AnalysisList title="What works" items={ad.works} marker="+" />
                    <AnalysisList title="Main weakness" items={ad.weakness} marker="–" />
                  </div>
                  <div className="mt-8 rounded-md bg-sage/70 p-5">
                    <p className="label text-forest">Learning for Vāyas</p>
                    <p className="mt-2 leading-relaxed text-ink">{ad.learning}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Beat({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="font-display text-sm font-bold text-forest">{term}</dt>
      <dd className="mt-2 text-[15px] leading-relaxed">{detail}</dd>
    </div>
  );
}
