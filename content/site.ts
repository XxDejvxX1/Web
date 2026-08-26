/**
 * Every string on the site lives here.
 *
 * Edit this file to change copy — you should never need to open a component to
 * fix a typo or reword a heading. Items marked TODO need real values before
 * launch.
 */

export const site = {
  name: "Uebi",
  tagline: "Web Development Studio",

  // TODO: swap in the real domain once it is registered. Drives metadata,
  // sitemap URLs and the social card.
  url: "https://uebi.dev",

  // TODO: replace with the real business inbox.
  email: "hello@uebi.dev",

  // TODO: paste a Cal.com or Calendly link. Until then "Book a Call" falls back
  // to the email address.
  bookingUrl: "",

  // TODO: add real profiles, or delete the ones you do not use.
  socials: [
    { label: "GitHub", href: "https://github.com/XxDejvxX1" },
    { label: "LinkedIn", href: "" },
    { label: "X", href: "" },
  ],
} as const;

export const meta = {
  title: "Uebi — Web Design & Development Studio",
  description:
    "Uebi designs and builds fast, beautiful, scalable websites and web applications. Strategy, design and development under one roof.",
} as const;

export const hero = {
  headline: "Great websites.\nMeaningful impact.",
  subhead:
    "We design and build custom websites and web applications crafted for performance and growth. Strategy, design and development under one roof — no templates, no page builders, no lock-in.",
  primaryCta: { label: "Start a Project", href: "/contact/" },
  mockupAlt:
    "Pixel-art illustration of a web studio interface showing a project overview, services and deliverables",
} as const;

export const stats = [
  { value: "98", suffix: "/100", label: "Typical performance score" },
  { value: "8", suffix: " weeks", label: "Average build timeline" },
  { value: "99.9", suffix: "%", label: "Uptime infrastructure" },
  { value: "100", suffix: "%", label: "Code and content you own" },
] as const;

export const howItWorks = {
  heading: "How Uebi Works",
  intro:
    "Four stages, one team. No handoffs to people you have never met, and no surprises at the end.",

  /**
   * The first card renders tall down the left column; the rest stack on the
   * right. Order here is the order on the page.
   */
  cards: [
    {
      id: "strategy",
      icon: "nodes",
      title: "Strategy & Design",
      body: "We start with your goals, not a template. Positioning, site structure and a design system built to fit — so every screen earns its place before a line of code is written.",
      image: "/images/grid-vertical.webp",
      alt: "Pixel-art robot holding a pointer, presenting a plan",
    },
    {
      id: "interfaces",
      icon: "layers",
      title: "Pixel-Perfect Interfaces",
      body: "Designs that hold up at every size. Considered typography, honest spacing and interaction states that feel deliberate rather than default.",
      image: "/images/grid-1.webp",
      alt: "Pixel-art robot playing with a kitten and a glowing orb",
    },
    {
      id: "code",
      icon: "code",
      title: "Modern, Performant Code",
      body: "Next.js and TypeScript, statically rendered where it counts. Accessible markup, clean architecture and performance scores you can put in a pitch deck.",
      image: "/images/grid-3.webp",
      alt: "Pixel-art robot reading a book of code",
    },
    {
      id: "care",
      icon: "shield",
      title: "Launch & Ongoing Care",
      body: "We do not disappear at handover. Documentation, a walkthrough and an optional maintenance plan keep the site fast, secure and current.",
      image: "/images/grid-2.webp",
      alt: "Pixel-art robot sitting beside a warm campfire",
    },
  ],
} as const;

export const featureBand = {
  headline: "Uebi lets you bring\nyour business to life",

  /** Static lead-in that sits before the rotating typewriter phrases. */
  typewriterPrefix: "Uebi helps you with things like",
  typewriterPhrases: [
    "design your website",
    "build your website",
    "maintain your website",
  ],

  cta: { label: "Get Uebi", href: "/contact/" },
  notification: {
    title: "New email from Uebi",
    body: "Thanks for getting in touch! Let's bring your business online.",
    time: "now",
  },
  quote: "Every business needs a website,\nnot everyone has one.",
  alt: "Pixel-art illustration of Skanderbeg Square in Tirana at dusk",
} as const;

export const services = {
  heading: "Strategy, design and development — all under one roof",
  intro:
    "Most projects need all four. Take the whole thing, or just the part you are missing.",

  disciplines: [
    {
      title: "Product Strategy",
      body: "Positioning, scope and a realistic plan. We work out what the site needs to do before deciding what it looks like.",
    },
    {
      title: "UI / UX Design",
      body: "Wireframes through to a complete, responsive design system — built in the browser, not just in Figma.",
    },
    {
      title: "Frontend Development",
      body: "Fast, accessible, standards-based interfaces. Semantic markup, real keyboard support and no layout surprises.",
    },
    {
      title: "Backend Development",
      body: "APIs, databases, auth and integrations. Sensible architecture that will not need rewriting in a year.",
    },
  ],

  deliverables: [
    "Custom Website",
    "Web Application",
    "Admin Dashboard",
    "API Integration",
    "Documentation & Handover",
  ],

  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Cloudflare",
    "AWS",
  ],
} as const;

export const process = {
  heading: "From first call to launch day",

  /**
   * Rendered as a pinned horizontal scroller — one panel per step. Images are
   * square and deliberately small, sitting beside their copy rather than
   * dominating it.
   */
  steps: [
    {
      title: "Discovery",
      body: "A call and a short brief. We map out goals, audience, scope and budget, then send a fixed quote — no hourly guesswork.",
      image: "/images/process/discovery.webp",
      alt: "Pixel-art robot holding a magnifying glass and a treasure map",
    },
    {
      title: "Design",
      body: "Structure first, then visuals. You see real designs early and often, and nothing moves forward without your sign-off.",
      image: "/images/process/design.webp",
      alt: "Pixel-art robot arranging a layout with a pen and colour swatches",
    },
    {
      title: "Build",
      body: "Development on a staging URL you can visit any time. Weekly updates, so you always know exactly where the project stands.",
      image: "/images/process/build.webp",
      alt: "Pixel-art robot assembling a web page from building blocks",
    },
    {
      title: "Launch",
      body: "Testing, performance tuning, analytics and deployment. You get the keys, the code and a walkthrough of how it all works.",
      image: "/images/process/launch.webp",
      alt: "Pixel-art robot cheering as a rocket lifts off",
    },
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  heading: "Questions worth asking",
  items: [
    {
      q: "How long does a project take?",
      a: "A marketing site typically runs four to six weeks. A larger web application is usually eight to twelve. You get a firm timeline with your quote, and weekly updates against it.",
    },
    {
      q: "What does it cost?",
      a: "Every project is quoted as a fixed price after the discovery call, so there are no hourly surprises. Scope drives cost — tell us what you need and we will tell you what it takes.",
    },
    {
      q: "What do you build with?",
      a: "Next.js, React and TypeScript for the frontend; Node.js and PostgreSQL where a backend is needed. Everything is deployed on fast, modern infrastructure and built to standards rather than to a page builder.",
    },
    {
      q: "Do I own the finished site?",
      a: "Completely. The code, the content, the domain and every account are yours from day one. There is no proprietary platform and no lock-in — you can take the repository to any developer.",
    },
    {
      q: "Do you handle maintenance after launch?",
      a: "If you want us to. Optional monthly plans cover updates, monitoring, backups and small changes. If you would rather run it yourself, the handover documentation shows you how.",
    },
    {
      q: "Can you work with our existing brand or designer?",
      a: "Yes. If you already have brand guidelines or a design partner, we will build to them. If you do not, we can handle that side too.",
    },
  ],
} as const;

export const finalCta = {
  heading: "Have an idea in mind?",
  body: "Let's build something amazing together.",
  primaryCta: { label: "Start a Project", href: "/contact/" },
  secondaryCta: { label: "Book a Call", href: "/contact/" },
} as const;

export const contact = {
  eyebrow: "Contact",
  heading: "Let's talk about your project",
  intro:
    "Tell us what you are building and we will come back within one business day with honest thoughts, a rough timeline and a price range.",

  includeHeading: "What to include",
  include: [
    "What your business does, and who it is for",
    "What you need — a new site, a rebuild, or an application",
    "Any deadline you are working towards",
    "A rough budget range, if you have one in mind",
    "Links to sites whose style you like",
  ],

  responseNote: "We reply to every enquiry within one business day.",
} as const;

/**
 * Images and descriptions are real — screenshots of the live Teuta Apartment
 * site, and copy describing what it actually does.
 *
 * ⚠️ The `results` figures and the `testimonial` are still invented. ⚠️
 * The page carries a visible notice and stays noindex until they are replaced
 * with real numbers, or removed.
 */
export const caseStudies = {
  eyebrow: "Case studies",
  heading: "Selected work",
  intro:
    "A closer look at what we build, who it is for, and what changed once it shipped.",

  placeholderNotice:
    "The results figures and the quote below are placeholders, not real numbers. Everything else is the live site.",

  projects: [
    {
      slug: "teuta-apartment",
      title: "Teuta Apartment",
      category: "Hospitality",
      year: "2026",
      location: "Durrës, Albania",
      cover: "/images/case-studies/teuta-hero.webp",
      coverAlt:
        "The Teuta Apartment homepage: a sea view through open curtains, headed 'Wake up on the first line of the sea'",

      summary:
        "A direct-booking site for a seaside apartment in Durrës that had been letting entirely through third-party platforms.",

      challenge:
        "Guests could only book through marketplaces, so the owner paid commission on every stay, never owned the guest relationship, and had no way to show the apartment properly — a listing template allows a handful of photos and a paragraph.",

      solution:
        "A small, fast site built around the things that actually convert a booking: a full-bleed gallery of the apartment and the beach it sits on, a live availability calendar that prices a stay as you pick dates, real guest reviews, and a WhatsApp button so enquiries land where the owner already answers them.",

      services: ["Product Strategy", "UI / UX Design", "Frontend Development"],

      results: [
        { value: "+38%", label: "Direct bookings" },
        { value: "0%", label: "Platform commission" },
        { value: "1.1s", label: "Largest paint" },
      ],

      testimonial: {
        quote:
          "Guests find us directly now, and the booking process is finally something I am happy to send people to.",
        attribution: "Placeholder attribution",
      },

      gallery: [
        {
          src: "/images/case-studies/teuta-gallery.webp",
          alt: "The gallery section, a wide carousel of apartment and beach photography",
        },
        {
          src: "/images/case-studies/teuta-availability.webp",
          alt: "The availability calendar, with a four-night stay selected and priced",
        },
        {
          src: "/images/case-studies/teuta-reviews.webp",
          alt: "The guest reviews carousel, headed 'What guests have said'",
        },
      ],
    },
  ],

  ctaHeading: "Want something like this?",
  ctaBody: "Tell us about the project and we will come back with a plan and a price.",
  ctaLabel: "Start a Project",
} as const;

export const footer = {
  blurb:
    "A small web design and development studio building fast, accessible sites for brands that care about the details.",
  columns: [
    {
      title: "Studio",
      links: [
        { label: "Product", href: "/" },
        { label: "Case Studies", href: "/case-studies/" },
        { label: "Contact", href: "/contact/" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Services", href: "/#services" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Process", href: "/#process" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
  ],
  signoff: "Built in Tirana.",
  alt: "Pixel-art illustration of a robot waving goodbye above a mountain lake at dusk",
} as const;
