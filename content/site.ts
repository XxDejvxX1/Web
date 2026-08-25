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
  eyebrow: "Web design & development studio",
  headline: "Great websites.\nMeaningful impact.",
  subhead:
    "We design and build custom websites and web applications crafted for performance and growth.",
  primaryCta: { label: "Start a Project", href: "/contact/" },
  secondaryCta: { label: "Book a Call", href: "/contact/" },
  notification: {
    title: "New enquiry received",
    body: "Thanks for reaching out — we reply within one business day.",
    time: "now",
  },
  quote: "Every brand deserves a site\nthat works as hard as they do.",
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
  eyebrow: "Process",
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
  headline: "Small studio.\nSerious craft.",
  body: "No account managers, no handoffs to a junior team. You work directly with the people designing and building your site — from the first sketch to launch day and beyond.",
  cta: { label: "Start a Project", href: "/contact/" },
  notification: {
    title: "Project update",
    body: "Homepage design is ready for your review.",
    time: "now",
  },
  quote: "The best work comes from small teams\nwho actually care about the details.",
  alt: "Pixel-art illustration of a sunlit city square at golden hour",
} as const;

export const services = {
  eyebrow: "Services",
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
  eyebrow: "How we work",
  heading: "From first call to launch day",
  steps: [
    {
      title: "Discovery",
      body: "A call and a short brief. We map out goals, audience, scope and budget, then send a fixed quote — no hourly guesswork.",
    },
    {
      title: "Design",
      body: "Structure first, then visuals. You see real designs early and often, and nothing moves forward without your sign-off.",
    },
    {
      title: "Build",
      body: "Development on a staging URL you can visit any time. Weekly updates, so you always know exactly where the project stands.",
    },
    {
      title: "Launch",
      body: "Testing, performance tuning, analytics and deployment. You get the keys, the code and a walkthrough of how it all works.",
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

export const footer = {
  blurb:
    "A small web design and development studio building fast, accessible sites for brands that care about the details.",
  columns: [
    {
      title: "Studio",
      links: [
        { label: "Services", href: "/#services" },
        { label: "Process", href: "/#process" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { label: "Contact", href: "/contact/" },
        { label: "Start a Project", href: "/contact/" },
      ],
    },
  ],
} as const;
