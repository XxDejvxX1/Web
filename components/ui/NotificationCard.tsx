"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icons";

type NotificationCardProps = {
  title: string;
  body: string;
  time: string;
  icon?: IconName;
  className?: string;
};

/**
 * The floating notification from the Cofounder reference — a white capsule over
 * the artwork.
 *
 * It animates in the way a real OS notification does: slides in from the upper
 * right with a slight spring overshoot, a beat after the card comes into view,
 * rather than being present from the start. Decorative, so it stays hidden from
 * assistive tech — the surrounding section already carries the message.
 */
export function NotificationCard({
  title,
  body,
  time,
  icon = "mail",
  className = "",
}: NotificationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Never leave it stuck invisible if the API is missing.
    if (typeof IntersectionObserver === "undefined") {
      setArrived(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArrived(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-arrived={arrived}
      className={[
        "notification-pop flex w-[300px] items-start gap-3 rounded-[18px] bg-paper-white/95 p-3.5",
        "shadow-[0_16px_40px_-18px_rgba(0,0,0,0.45)] backdrop-blur-md",
        className,
      ].join(" ")}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-signal-blue/10 text-signal-blue">
        <Icon name={icon} size={18} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-caption font-semibold text-ink-black">{title}</p>
          <span className="shrink-0 text-micro text-smoke">{time}</span>
        </div>
        <p className="mt-1 text-caption leading-snug text-smoke">{body}</p>
      </div>
    </div>
  );
}
