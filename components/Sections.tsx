import { criteria, SCORE_DISCLAIMER, staticAds, videoAds } from "@/content/research";
import { brief, concepts, films, insight, recommendedExecution, site, strategy } from "@/content/site";
import { ConceptCards } from "./ConceptCards";
import { ExternalLink } from "./ExternalLink";
import { FilmPlayer } from "./FilmPlayer";
import { Pending } from "./Pending";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { StaticAds } from "./StaticAds";
import { VideoAds } from "./VideoAds";

/* 00 — Hero */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-forest text-ivory">
      <div className="shell flex min-h-[calc(100svh-3.5rem)] flex-col justify-between pb-10 pt-12 sm:pt-16">
        <p className="label rise flex flex-wrap gap-x-3 text-sage" style={{ animationDelay: "50ms" }}>
          <span>Vāyas Life</span>
          <span aria-hidden className="text-yellow">/</span>
          <span>Interactive case study</span>
        </p>

        <h1 className="display my-12 text-[clamp(3rem,17vw,10.5rem)] uppercase leading-[0.86] tracking-[-0.045em]">
          <span className="rise block" style={{ animationDelay: "120ms" }}>From</span>
          <span className="rise block" style={{ animationDelay: "220ms" }}>insight</span>
          <span className="rise block" style={{ animationDelay: "320ms" }}>
            to impact<span className="text-yellow">.</span>
          </span>
        </h1>

        <div className="rise grid gap-8 border-t border-ivory/15 pt-6 sm:grid-cols-12" style={{ animationDelay: "480ms" }}>
          <p className="max-w-md text-base leading-relaxed text-ivory/75 sm:col-span-6 lg:col-span-5">
            Competitive creative research on calcium-supplement Meta ads, and three original video-ad concepts for
            Vāyas Life’s Calcium Tablets for Women 30+.
          </p>
          <dl className="grid grid-cols-2 gap-6 text-sm sm:col-span-6 lg:col-span-4 lg:col-start-7">
            <div>
              <dt className="label text-sage">Prepared by</dt>
              <dd className="mt-1.5">{site.author}</dd>
            </div>
            <div>
              <dt className="label text-sage">Scope</dt>
              <dd className="mt-1.5">10 competitor ads · 4 films</dd>
            </div>
          </dl>
          <a
            href="#brief"
            className="label flex items-center gap-3 self-end text-ivory/70 hover:text-ivory sm:col-span-12 lg:col-span-2 lg:col-start-11 lg:justify-self-end"
          >
            Scroll
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-yellow">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* 01 — The Brief */
export function Brief() {
  return (
    <section id="brief" className="section">
      <Reveal className="shell">
        <SectionHeader
          index="01"
          label="The Brief"
          title={<>Two assignments, two days.</>}
          intro="What the hiring team asked for, kept separate from how I chose to read it."
        />

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12">
          <article className="card p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="label text-muted">The assignment · from the {brief.from}</p>
              <p className="label rounded-sm bg-sage px-2 py-1 text-forest">Timeline: {brief.timeline}</p>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {brief.assignments.map((a) => (
                <section key={a.index} className="border-t border-ink/15 pt-5">
                  <span className="label text-forest">Assignment {a.index}</span>
                  <h3 className="mt-2 font-display text-xl font-bold text-forest">{a.title}</h3>
                  <ul className="mt-4 space-y-3 text-[15px] leading-relaxed">
                    {a.tasks.map((t) => (
                      <li key={t} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-forest/50" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>

          <article className="rounded-md bg-sage p-6 sm:p-8 lg:col-span-5">
            <p className="label text-forest">The product</p>
            <h3 className="display mt-4 text-3xl text-forest">{brief.product.name}</h3>
            <p className="mt-3 leading-relaxed">{brief.product.detail}</p>
            <p className="mt-5 text-sm">
              <ExternalLink href={site.productUrl} className="on-light text-forest">Open Vāyas product page</ExternalLink>
            </p>
          </article>

          <article className="rounded-md bg-forest p-6 text-ivory sm:p-8 lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-8">
            <p className="label text-yellow lg:col-span-3">My interpretation</p>
            <div className="lg:col-span-9">
              <p className="mt-4 font-display text-2xl font-medium leading-snug sm:text-3xl lg:mt-0">“{brief.question}”</p>
              <ul className="mt-8 grid gap-6 border-t border-ivory/15 pt-6 sm:grid-cols-3">
                {brief.interpretation.map((i) => (
                  <li key={i.title}>
                    <p className="font-display text-lg font-bold">{i.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/70">{i.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}

/* 02 — Research */
export function Research() {
  return (
    <section id="research" className="section border-t border-ink/10">
      <div className="shell">
        <Reveal>
          <SectionHeader
            index="02"
            label="Research"
            title={<>Ten competitor ads, read for creative choices.</>}
            intro={
              <>
                Five static and five video ads from the Meta Ad Library, each assessed against the same five criteria.{" "}
                <strong className="font-medium text-ink">{SCORE_DISCLAIMER}</strong>
              </>
            }
          />

          <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {criteria.map((c) => (
              <li key={c.id} className="bg-ivory p-5">
                <span className="label text-forest">{c.id} · 5 pts</span>
                <p className="mt-2 font-display text-lg font-bold leading-tight text-forest">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.question}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-20 lg:mt-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label text-muted">02.1</p>
              <h3 className="display mt-2 text-3xl text-forest sm:text-4xl">Static ads</h3>
            </div>
            <p className="max-w-sm text-sm text-muted">Select an ad to see the original creative, the analysis and its source.</p>
          </div>
          <StaticAds ads={staticAds} />
        </Reveal>

        <Reveal className="mt-20 lg:mt-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label text-muted">02.2</p>
              <h3 className="display mt-2 text-3xl text-forest sm:text-4xl">Video ads</h3>
            </div>
            <p className="max-w-sm text-sm text-muted">Different creative mechanisms — not all are direct calcium-category competitors.</p>
          </div>
          <VideoAds ads={videoAds} />
        </Reveal>
      </div>
    </section>
  );
}

/* 03 — The Insight */
export function Insight() {
  return (
    <section id="insight" className="section bg-forest text-ivory">
      <Reveal className="shell">
        <SectionHeader index="03" label="The Insight" tone="dark" title={insight.headline} intro={insight.bridge} />

        <ol className="mt-14 lg:mt-20">
          {insight.patterns.map((p, i) => (
            <li
              key={p.title}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t border-ivory/15 py-6 sm:grid-cols-[4rem_1fr] lg:grid-cols-12 lg:gap-8"
            >
              <span className="label text-yellow lg:col-span-1">0{i + 1}</span>
              <p
                className="font-display text-2xl font-bold leading-tight sm:text-3xl lg:col-span-6"
                style={{ paddingLeft: `min(${i * 2}vw, ${i * 1.5}rem)` }}
              >
                {p.title}
              </p>
              <p className="col-start-2 mt-2 text-[15px] leading-relaxed text-ivory/65 lg:col-span-5 lg:col-start-8 lg:mt-0">
                {p.note}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-6 rounded-md bg-yellow p-6 text-forest sm:p-8 lg:grid-cols-12 lg:gap-8">
          <p className="label lg:col-span-3">Creative hypothesis to test</p>
          <div className="lg:col-span-9">
            <p className="font-display text-2xl font-bold leading-snug sm:text-3xl">{insight.hypothesis}</p>
            <p className="mt-4 text-sm text-forest/75">A hypothesis for testing — not a proven winning strategy.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* 04 — Creative Lab */
export function CreativeLab() {
  return (
    <section id="creative-lab" className="section">
      <Reveal className="shell">
        <SectionHeader
          index="04"
          label="Creative Lab"
          title="Three concepts. Three different creative routes."
          intro="Each route tests a different way into the same hypothesis, followed by an animated bonus film. Open a concept to see the thinking behind it."
        />
        <div className="mt-14 grid gap-8 border-t border-ink/15 pt-10 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-muted">The creative challenge</p>
            <p className="mt-4 font-display text-2xl font-medium leading-snug text-forest sm:text-[1.75rem]">
              {strategy.challenge}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">{strategy.problem}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label text-muted">Creative principles</p>
            <ol className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {strategy.principles.map((pr, i) => (
                <li key={pr.title} className="border-t border-ink/15 pt-4">
                  <span className="label text-forest">0{i + 1}</span>
                  <p className="mt-1.5 font-display text-lg font-bold leading-tight text-forest">{pr.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{pr.body}</p>
                </li>
              ))}
            </ol>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="label text-muted">Primary audience</dt>
                <dd className="mt-2 text-sm leading-relaxed">{strategy.audience}</dd>
              </div>
              <div>
                <dt className="label text-muted">Core strategic insight</dt>
                <dd className="mt-2 text-sm leading-relaxed">{strategy.insight}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-muted">{strategy.note}</p>
          </div>
        </div>

        <div className="mt-14 lg:mt-16">
          <ConceptCards concepts={concepts} />
        </div>

        <RecommendedExecution />
      </Reveal>
    </section>
  );
}

function RecommendedExecution() {
  const r = recommendedExecution;
  return (
    <article className="mt-14 rounded-md bg-sage p-6 sm:p-8 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-10 lg:p-10">
      <div className="lg:col-span-4">
        <p className="label text-forest">Recommended execution</p>
        <h3 className="display mt-4 text-3xl text-forest sm:text-4xl">{r.title}</h3>
        <p className="mt-4 leading-relaxed">{r.intro}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink/75">{r.rationale}</p>
        <p className="mt-6 text-sm">
          <a href={`#film-${r.conceptSlug}`} className="link-arrow on-light text-forest">
            Watch The 30+ Checklist <span aria-hidden>↓</span>
          </a>
        </p>
      </div>
      <div className="mt-10 lg:col-span-8 lg:mt-0">
        <p className="label text-forest">Planned beat sheet · 30 seconds</p>
        <ol className="mt-4 border-t border-forest/20">
          {r.beats.map((b) => (
            <li
              key={b.time}
              className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-1 border-b border-forest/20 py-3.5 sm:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-x-6"
            >
              <span className="text-sm font-medium tabular-nums text-forest">{b.time}</span>
              <span className="font-display font-bold leading-snug text-forest">{b.beat}</span>
              <span className="col-start-2 text-sm leading-relaxed text-ink/75 sm:col-start-3">{b.purpose}</span>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

/* 05 — The Films */
export function Films() {
  return (
    <section id="films" className="section bg-forest text-ivory">
      <div className="shell">
        <Reveal>
          <SectionHeader
            index="05"
            label="The Films"
            tone="dark"
            title="The executions."
            intro="Four finished executions: three core routes and an animated bonus film. These are creative concepts for testing — not tested performance winners."
          />
        </Reveal>

        <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
          {films.map((film, i) => {
            const concept = concepts.find((c) => c.slug === film.conceptSlug)!;
            return (
              <Reveal key={film.slug}>
                <article id={`film-${film.slug}`} className="grid scroll-mt-20 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                  <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                    <FilmPlayer film={film} title={concept.title} />
                  </div>
                  <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                    <p className="label text-sage">
                      <span className="text-yellow">{concept.bonus ? concept.bonus.label : "Concept"} {concept.index}</span> · {concept.route}
                    </p>
                    <h3 className="display mt-4 text-3xl sm:text-4xl">{concept.title}</h3>
                    <p className="mt-4 leading-relaxed text-ivory/75">{concept.summary}</p>
                    <div className="mt-8 border-t border-ivory/15 pt-6">
                      <p className="label text-sage">Creative breakdown</p>
                      {film.breakdown ? (
                        <p className="mt-3 leading-relaxed text-ivory/85">{film.breakdown}</p>
                      ) : (
                        <Pending what="Concise explanation of the creative choices" tone="dark" className="mt-3" />
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-forest text-ivory">
      <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
        <p className="display text-5xl sm:text-6xl lg:col-span-7">
          From insight
          <br />
          to impact<span className="text-yellow">.</span>
        </p>
        <div className="space-y-6 text-sm lg:col-span-5 lg:self-end">
          <p className="text-ivory/70">
            Case study prepared by <span className="text-ivory">{site.author}</span> for Vāyas Life.
          </p>
          <p className="text-xs leading-relaxed text-ivory/50">
            All scores are subjective creative assessments, not performance data. Competitor creatives are shown for
            analysis and link to their original Meta Ad Library sources. No product claims beyond the Vāyas product page
            are made.
          </p>
          <a href="#top" className="label inline-flex items-center gap-2 text-ivory/70 hover:text-ivory">
            Back to top <span aria-hidden className="text-yellow">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
