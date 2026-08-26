import type { ReactNode } from "react";

type BrowserFrameProps = {
  children: ReactNode;
  /** Shown in the address bar. Omit for a chrome bar with no URL. */
  url?: string;
  className?: string;
};

/**
 * Wraps a screenshot in a browser chrome bar.
 *
 * Case study pages stack several screenshots of the same site in a row, and
 * without a frame they blur into one another — a pale screenshot on a pale page
 * has no edge. The chrome gives each one a hard boundary and, incidentally,
 * makes it obvious these are screens of a real site rather than illustrations.
 */
export function BrowserFrame({ children, url, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-card bg-paper-white shadow-lifted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="flex items-center gap-2 border-b border-black/[0.07] bg-ash-mist px-4 py-3"
        aria-hidden="true"
      >
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="size-2.5 rounded-full bg-black/15" />
        </span>

        {url && (
          <span className="mx-auto max-w-[60%] truncate rounded-pill bg-paper-white px-3 py-1 text-micro text-smoke">
            {url}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
