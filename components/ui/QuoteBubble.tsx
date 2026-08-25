import { Icon } from "./Icons";

type QuoteBubbleProps = {
  /** Newlines are preserved as line breaks, matching the reference layout. */
  quote: string;
  className?: string;
};

/**
 * The chat-icon aside from the Cofounder reference — a quiet line of white text
 * set low over the artwork, well away from the headline.
 */
export function QuoteBubble({ quote, className = "" }: QuoteBubbleProps) {
  return (
    <div className={["max-w-xs text-paper-white/90", className].join(" ")}>
      <Icon name="chat" size={20} className="mb-2.5 text-paper-white/70" />
      <p className="text-body-sm font-medium whitespace-pre-line drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
        {quote}
      </p>
    </div>
  );
}
