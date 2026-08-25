/**
 * Three hairlines that close out the page, sitting flush against the bottom of
 * the content wrapper — the last thing before the footer reveal begins.
 *
 * Each is 1px, full-bleed, and the opacity ramps faint to near-solid going
 * down, so the eye reads the stack as an ending rather than as a divider
 * between two sections.
 */
export function EdgeLines() {
  return (
    <div aria-hidden="true" className="flex w-full flex-col gap-[6px]">
      <span className="h-px w-full bg-ink-black/[0.08]" />
      <span className="h-px w-full bg-ink-black/30" />
      <span className="h-px w-full bg-ink-black/85" />
    </div>
  );
}
