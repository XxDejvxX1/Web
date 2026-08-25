import type { SVGProps } from "react";

/**
 * Hand-rolled thin-stroke icons. Deliberately not an icon library — the site
 * needs nine glyphs, and a dependency would cost more than it saves.
 *
 * All are 24x24 on a 1.5px stroke so they sit consistently next to Inter text.
 */
const paths: Record<string, React.ReactNode> = {
  // Branching nodes — strategy and structure
  nodes: (
    <>
      <circle cx="12" cy="4.5" r="2.25" />
      <circle cx="5.5" cy="19.5" r="2.25" />
      <circle cx="18.5" cy="19.5" r="2.25" />
      <path d="M12 6.75v3.75M5.5 17.25v-2.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v2.5" />
    </>
  ),

  // Stacked planes — interface layers
  layers: (
    <>
      <path d="M12 3.5 3.5 8l8.5 4.5L20.5 8 12 3.5Z" />
      <path d="m3.5 13 8.5 4.5 8.5-4.5" />
      <path d="m3.5 17.5 8.5 4.5 8.5-4.5" />
    </>
  ),

  code: (
    <>
      <path d="m9 8-5 4 5 4" />
      <path d="m15 8 5 4-5 4" />
    </>
  ),

  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.4 2.9 8.2 7 9.5 4.1-1.3 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9.25 12 2 2 3.5-3.75" />
    </>
  ),

  arrowRight: <path d="M4.5 12h15m-6-6 6 6-6 6" />,

  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.75 7.5 7.13 5a2 2 0 0 0 2.24 0l7.13-5" />
    </>
  ),

  chat: (
    <path d="M20.5 12.5c0 3.9-3.8 7-8.5 7a9.8 9.8 0 0 1-2.62-.35L4 21l1.2-3.6A6.6 6.6 0 0 1 3.5 12.5c0-3.9 3.8-7 8.5-7s8.5 3.1 8.5 7Z" />
  ),

  rocket: (
    <>
      <path d="M13.5 4.5c3 1 5 3 6 6l-6 6-6-6 6-6Z" />
      <path d="M7.5 10.5 4 12l2.5 2.5M13.5 16.5 12 20l2.5-2.5" />
      <circle cx="13.5" cy="10.5" r="1.5" />
    </>
  ),

  check: <path d="m4.5 12.5 5 5 10-11" />,

  menu: <path d="M4 7h16M4 12h16M4 17h16" />,

  close: <path d="m6 6 12 12M18 6 6 18" />,

  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.25l3.25 2" />
    </>
  ),
};

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
