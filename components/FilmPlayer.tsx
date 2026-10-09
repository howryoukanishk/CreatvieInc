import type { Film } from "@/content/site";
import { Pending } from "./Pending";

const aspectClass: Record<NonNullable<Film["video"]>["aspect"], string> = {
  "9/16": "aspect-[9/16] max-w-[440px]",
  "4/5": "aspect-[4/5] max-w-[560px]",
  "1/1": "aspect-square max-w-[640px]",
  "16/9": "aspect-video w-full",
};

// Real <video> element with native controls. Never autoplays; nothing loads until the viewer presses play.
export function FilmPlayer({ film, title }: { film: Film; title: string }) {
  if (!film.video) {
    return (
      <div className="flex aspect-[4/5] w-full max-w-[440px] flex-col justify-between rounded-md border border-ivory/15 bg-ivory/[0.04] p-6">
        <span className="label text-sage">Concept execution</span>
        <div>
          <p className="display text-2xl text-ivory/90">{title}</p>
          <Pending what="Video file, poster frame and captions" tone="dark" className="mt-5" />
        </div>
      </div>
    );
  }

  const { src, poster, captions, aspect, duration } = film.video;
  return (
    <figure className={`mx-auto lg:mx-0 ${aspectClass[aspect].split(" ").filter((c) => c.startsWith("max-w")).join(" ")}`}>
      <video
        className={`block w-full rounded-md bg-black ${aspectClass[aspect]}`}
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={`${title} — concept execution`}
      >
        <source src={src} type="video/mp4" />
        {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
        Your browser does not support embedded video. <a href={src}>Download the film</a>.
      </video>
      <figcaption className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ivory/55">
        <span className="label text-[10px] text-sage">Concept execution</span>
        <span>{duration} · {aspect.replace("/", ":")}</span>
        {!captions && <span>Key lines appear as on-screen text.</span>}
      </figcaption>
    </figure>
  );
}
