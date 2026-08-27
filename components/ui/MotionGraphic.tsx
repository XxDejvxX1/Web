"use client";

import { useEffect, useRef } from "react";

type MotionGraphicProps = {
  /** Looping WebM with an alpha channel, e.g. /videos/strategy.webm */
  src: string;
  /**
   * Still frame behind the clip, cut from the clip itself by `npm run video`.
   *
   * This is not a placeholder — it is the entire picture for reduced-motion
   * visitors, for anyone without JS, and for Safari, which plays neither VP9
   * alpha nor anything else that could carry these clips' transparency. That
   * last group is large enough that the poster has to stand on its own, which
   * is why it is a real frame rather than a separate illustration.
   */
  poster: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * A looping, silent motion graphic that behaves like an image.
 *
 * Deliberately not `autoplay` in the markup. Four autoplaying clips in one
 * bento would have every browser fetching and decoding all four the moment the
 * section renders, on a page whose whole point is that it ships almost no JS.
 * Instead `preload="none"` means zero video bytes until an IntersectionObserver
 * says the card is actually on screen, and reduced-motion visitors never
 * download the clip at all — they keep the poster.
 *
 * Exposed to assistive tech as an image: it carries no information a caption
 * track would, and announcing it as a media player invites a keyboard user to
 * operate transport controls that do not exist.
 */
export function MotionGraphic({
  src,
  poster,
  alt,
  width,
  height,
  className = "",
}: MotionGraphicProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let started = false;

    // A rejected promise just means the browser declined. The poster is already
    // on screen, so there is nothing to recover from.
    const play = () => void el.play().catch(() => {});

    const start = () => {
      started = true;
      // React has historically dropped the `muted` attribute during hydration,
      // and an unmuted clip is refused autoplay outright. Setting the property
      // costs nothing and removes the failure mode.
      el.muted = true;
      el.preload = "auto";
      play();
    };

    /*
     * Chrome suspends muted, video-only media while its tab is in the
     * background — it rejects the play() above with "video-only background
     * media was paused to save power" — and does not resume on return. Without
     * this, anyone who scrolls the grid into view, switches tab and comes back
     * finds four frozen cards. Asking again on the way back is cheap; the
     * browser is free to refuse a second time.
     */
    const resume = () => {
      if (started && !document.hidden) play();
    };
    document.addEventListener("visibilitychange", resume);

    let observer: IntersectionObserver | undefined;

    if (typeof IntersectionObserver === "undefined") {
      start();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
            observer?.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      role="img"
      aria-label={alt}
      className={className}
    />
  );
}
