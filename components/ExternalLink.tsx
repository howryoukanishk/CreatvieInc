import type { ReactNode } from "react";

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`link-arrow ${className}`}>
      {children}
      <span aria-hidden className="text-yellow">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
