"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/site";

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Active section = the last section whose top has passed the upper third of the viewport.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav aria-label="Primary" className="sticky top-0 z-50 border-b border-ivory/10 bg-forest/95 text-ivory backdrop-blur">
      <div className="shell flex h-14 items-center justify-between gap-6">
        <a href="#top" className="font-display text-[15px] font-bold tracking-tight">
          Vāyas Life<span className="text-yellow">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative flex items-center gap-1.5 rounded px-3 py-2 text-[13px] transition-colors duration-200 ${
                    isActive ? "text-ivory" : "text-ivory/60 hover:text-ivory"
                  }`}
                >
                  <span className={`label text-[10px] ${isActive ? "text-yellow" : "text-ivory/40"}`}>{s.index}</span>
                  {s.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-[9px] h-[2px] origin-left bg-yellow transition-transform duration-300 ease-editorial ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="label flex h-10 items-center gap-2 rounded px-2 text-ivory lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="relative block h-3 w-4">
            <span className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform duration-200 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute left-0 bottom-0 h-[1.5px] w-4 bg-current transition-transform duration-200 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-ivory/10 lg:hidden">
        <ul className="shell py-3">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === s.id ? "location" : undefined}
                className={`flex items-center gap-4 py-3 font-display text-xl ${active === s.id ? "text-yellow" : "text-ivory"}`}
              >
                <span className="label w-6 text-ivory/40">{s.index}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
