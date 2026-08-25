import { Icon, type IconName } from "./Icons";

type NotificationCardProps = {
  title: string;
  body: string;
  time: string;
  icon?: IconName;
  className?: string;
};

/**
 * The small floating "new email" card from the Cofounder reference — a white
 * capsule that sits over the artwork and hints at the product without a
 * screenshot. Decorative, so it is hidden from assistive tech; the surrounding
 * section already carries the real message.
 */
export function NotificationCard({
  title,
  body,
  time,
  icon = "mail",
  className = "",
}: NotificationCardProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "flex w-[290px] items-start gap-3 rounded-[18px] bg-paper-white/95 p-3.5",
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
