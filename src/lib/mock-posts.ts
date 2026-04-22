import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "Urban Coffee Studio",
    "Growth Labs Agency",
    "Northside Fitness",
    "PixelCraft Design",
    "Prime Auto Care",
  ],
  classified: [
    "Used MacBook Pro 16",
    "Studio Space for Rent",
    "Hiring Frontend Developer",
    "Weekend Photography Gig",
    "City Center Apartment",
  ],
  article: [
    "Scaling Local SEO in 2026",
    "The Future of Directory Sites",
    "Design Systems for Multi-Site",
    "From MVP to Marketplace",
    "Content Ops That Ship Fast",
  ],
  image: [
    "Golden Hour Interiors",
    "Mountain Trail Series",
    "Studio Portrait Set",
    "Neon Night Market",
    "Minimal Workspace",
  ],
  profile: [
    "Aisha Khan",
    "Rohan Patel",
    "Studio R&R",
    "Team Northwind",
    "Maya Desai",
  ],
  social: [
    "Community Launch Update",
    "Collab Request: Designers",
    "Weekly Trend Digest",
    "New Partnerships Announced",
    "Creator Spotlight Series",
  ],
  pdf: [
    "Local SEO Playbook",
    "Marketplace UX Guide",
    "Outbound Sales Template",
    "Agency Pricing Deck",
    "SaaS Metrics Cheatsheet",
  ],
  org: [
    "Northwind Collective",
    "Brightline Media",
    "Atlas Labs",
    "Cobalt Studio",
    "Zenith Partners",
  ],
  sbm: [
    "SEO Checklist 2026",
    "Directory Growth Tactics",
    "Backlink Outreach Vault",
    "AI Writing Tools List",
    "Local Listing Audit",
  ],
  comment: [
    "Reply: Agency Growth Stack",
    "Commentary: Link Building",
    "Response: Listing Quality",
    "Thread: SEO Experiments",
    "Hot Take: Directory UX",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: ["Marketing", "Tech", "Design", "Fitness", "Automotive"],
  classified: ["Jobs", "Real Estate", "Services", "Gigs", "Market"],
  article: ["Strategy", "SEO", "Product", "Growth", "Ops"],
  image: ["Lifestyle", "Travel", "Studio", "Urban", "Minimal"],
  profile: ["Founder", "Creator", "Agency", "Team", "Consultant"],
  social: ["Community", "News", "Updates", "Events", "Insights"],
  pdf: ["Guides", "Playbooks", "Templates", "Reports", "Docs"],
  org: ["Agency", "Studio", "Collective", "Partner", "Network"],
  sbm: ["Bookmarks", "Tools", "Resources", "SEO", "Research"],
  comment: ["Opinion", "Reply", "Discussion", "Feedback", "Debate"],
};

const summaryByTask: Record<TaskKey, string> = {
  listing: "Verified business listing with trusted details.",
  classified: "Fresh deal posted by a verified seller.",
  article: "Long-form insight from industry experts.",
  image: "Curated visual story and gallery.",
  profile: "Featured creator profile and highlights.",
  social: "Community update and engagement thread.",
  pdf: "Downloadable resource for your team.",
  org: "Organization spotlight and services.",
  sbm: "Curated bookmark collection entry.",
  comment: "Response post with perspective and context.",
};

const customMockPosts: Partial<Record<TaskKey, SitePost[]>> = {
  pdf: [
    {
      id: "pdf-user-1",
      title: "Q2 Hiring Playbook 2026",
      slug: "q2-hiring-playbook-2026",
      summary: "A practical recruiting playbook shared by a startup founder for scaling from 12 to 30 employees.",
      content: {
        type: "pdf",
        category: "Business",
        location: "Bengaluru",
        description: "Shared by Ankit Verma, this playbook includes interview stages, scorecards, and onboarding workflows used in real hiring cycles.",
        body: "This document covers the full hiring lifecycle for early-stage teams, from role definition to day-30 onboarding. It includes practical templates used by operators running real recruitment pipelines.\n\nInside, you will find role scorecards, interview panel structure, offer approval process, and onboarding handoff checklists that reduce hiring delays.",
        highlights: [
          "Role intake checklist before opening a position",
          "Structured interview scorecards for consistency",
          "Offer and onboarding workflow for faster close rates"
        ],
        website: "https://macphersonweb.com/profile/ankit-verma",
      },
      media: [{ url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["pdf", "hiring", "startup"],
      authorName: "Ankit Verma",
      publishedAt: "2026-04-18T08:30:00.000Z",
    },
    {
      id: "pdf-user-2",
      title: "Client Onboarding SOP (Agency Edition)",
      slug: "client-onboarding-sop-agency-edition",
      summary: "Step-by-step SOP document posted by an agency operations lead after 140+ client onboardings.",
      content: {
        type: "pdf",
        category: "Service",
        location: "Mumbai",
        description: "Includes kickoff checklist, timeline format, and communication templates used in live agency projects.",
        body: "Designed for agency teams managing multiple clients, this SOP standardizes onboarding steps and internal ownership. It reduces confusion during handoff and helps teams move from sale to delivery in a consistent format.\n\nThe document includes kickoff agenda templates, client expectation framing notes, weekly update structure, and escalation paths for blocker scenarios.",
        highlights: [
          "Kickoff agenda template and owner matrix",
          "Week-by-week onboarding roadmap format",
          "Client communication templates and escalation path"
        ],
        website: "https://macphersonweb.com/profile/riya-singh",
      },
      media: [{ url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["pdf", "operations", "agency"],
      authorName: "Riya Singh",
      publishedAt: "2026-04-16T11:05:00.000Z",
    },
    {
      id: "pdf-user-3",
      title: "Product Discovery Research Notes",
      slug: "product-discovery-research-notes",
      summary: "Interview synthesis and insights uploaded by a product manager after a 6-week user study.",
      content: {
        type: "pdf",
        category: "Technology",
        location: "Hyderabad",
        description: "Contains problem statements, user quotes, and opportunity ranking from direct customer interviews.",
        body: "This research note compiles findings from multiple user interviews and converts raw feedback into product opportunities. It is useful for PMs and founders planning roadmap priorities based on evidence.\n\nThe file includes user segments, recurring pain points, quote highlights, and opportunity prioritization with effort-versus-impact framing.",
        highlights: [
          "Interview synthesis from multi-segment user calls",
          "Pain-point clustering and opportunity mapping",
          "Effort vs impact prioritization model"
        ],
        website: "https://macphersonweb.com/profile/sameer-kulkarni",
      },
      media: [{ url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["pdf", "product", "research"],
      authorName: "Sameer Kulkarni",
      publishedAt: "2026-04-14T14:20:00.000Z",
    },
    {
      id: "pdf-user-4",
      title: "Founder Finance Dashboard Pack",
      slug: "founder-finance-dashboard-pack",
      summary: "Finance templates posted by a founder to track runway, burn, and team spend in one place.",
      content: {
        type: "pdf",
        category: "Finance",
        location: "Pune",
        description: "A ready-to-use set of monthly finance dashboards with formulas and benchmarking tips.",
        body: "Built for startup operators, this finance pack helps teams track burn, runway, and team spend in one place. It includes monthly review tabs and formula-ready sections for quick updates.\n\nFounders can use this to monitor cash health and make planned spend decisions without rebuilding reports every month.",
        highlights: [
          "Runway tracker with monthly burn updates",
          "Department-level spend visibility",
          "Benchmark prompts for monthly finance reviews"
        ],
        website: "https://macphersonweb.com/profile/neha-jain",
      },
      media: [{ url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["pdf", "finance", "founder"],
      authorName: "Neha Jain",
      publishedAt: "2026-04-12T09:45:00.000Z",
    },
    {
      id: "pdf-user-5",
      title: "B2B Outreach Scripts v3",
      slug: "b2b-outreach-scripts-v3",
      summary: "Cold outreach script set published by a growth lead with performance notes from live campaigns.",
      content: {
        type: "pdf",
        category: "Education",
        location: "Delhi",
        description: "Includes email, LinkedIn, and follow-up scripts with tested subject lines and response benchmarks.",
        body: "This outreach bundle is built from real campaign iterations and includes messaging variations for cold outreach across channels. It helps teams improve first-touch clarity and follow-up consistency.\n\nYou get a practical script bank, sequence timing suggestions, and response benchmark notes to optimize campaign quality over time.",
        highlights: [
          "Email and LinkedIn outreach script variants",
          "Follow-up sequence timing recommendations",
          "Response benchmark examples from live campaigns"
        ],
        website: "https://macphersonweb.com/profile/arjun-mehta",
      },
      media: [{ url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["pdf", "sales", "growth"],
      authorName: "Arjun Mehta",
      publishedAt: "2026-04-10T10:10:00.000Z",
    },
  ],
  profile: [
    {
      id: "profile-user-ankit-verma",
      title: "Ankit Verma",
      slug: "ankit-verma",
      summary: "Hiring operations advisor helping startups build structured talent systems.",
      content: {
        type: "profile",
        category: "Business",
        location: "Bengaluru",
        description: "Ankit works with founders and HR teams on interview architecture, hiring scorecards, and onboarding process design.",
        body: "Ankit has supported multiple growth-stage teams in setting up hiring workflows that improve quality and reduce time-to-fill. His focus is practical systems teams can actually run week to week.\n\nProjects include interview process standardization, role definition frameworks, and onboarding readiness playbooks.",
        highlights: [
          "Hiring workflow design and standardization",
          "Role scorecard and interview framework setup",
          "Onboarding system planning"
        ],
        website: "https://macphersonweb.com/profile/ankit-verma",
        email: "ankit@macphersonweb.com",
      },
      media: [{ url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "hiring", "operations"],
      authorName: "Ankit Verma",
      publishedAt: "2026-04-20T08:10:00.000Z",
    },
    {
      id: "profile-user-riya-singh",
      title: "Riya Singh",
      slug: "riya-singh",
      summary: "Agency operations lead focused on onboarding and delivery quality.",
      content: {
        type: "profile",
        category: "Service",
        location: "Mumbai",
        description: "Riya helps service teams build onboarding systems, execution playbooks, and client communication workflows.",
        body: "Riya supports agencies and service businesses in improving delivery consistency. Her frameworks are built around practical ownership, process clarity, and faster client activation.\n\nTypical engagements include kickoff systems, handoff protocols, and escalation process design.",
        highlights: [
          "Agency onboarding playbooks",
          "Client communication workflow design",
          "Delivery process quality improvements"
        ],
        website: "https://macphersonweb.com/profile/riya-singh",
        email: "riya@macphersonweb.com",
      },
      media: [{ url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "agency", "operations"],
      authorName: "Riya Singh",
      publishedAt: "2026-04-20T08:20:00.000Z",
    },
    {
      id: "profile-user-sameer-kulkarni",
      title: "Sameer Kulkarni",
      slug: "sameer-kulkarni",
      summary: "Product research lead specializing in interview synthesis and decision frameworks.",
      content: {
        type: "profile",
        category: "Technology",
        location: "Hyderabad",
        description: "Sameer helps product teams translate customer conversations into roadmap-ready insights.",
        body: "Sameer works with product organizations on interview systems, evidence mapping, and prioritization models. His work helps teams move from raw notes to action-oriented product strategy.\n\nHe publishes structured research templates used by PMs and founders.",
        highlights: [
          "Interview synthesis frameworks",
          "Research-to-roadmap decision models",
          "Evidence library design"
        ],
        website: "https://macphersonweb.com/profile/sameer-kulkarni",
        email: "sameer@macphersonweb.com",
      },
      media: [{ url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "research", "product"],
      authorName: "Sameer Kulkarni",
      publishedAt: "2026-04-20T08:30:00.000Z",
    },
    {
      id: "profile-user-neha-jain",
      title: "Neha Jain",
      slug: "neha-jain",
      summary: "Finance and operations strategist for startup founders and small teams.",
      content: {
        type: "profile",
        category: "Finance",
        location: "Pune",
        description: "Neha supports founders with runway planning, spend visibility, and reporting workflows.",
        body: "Neha helps early teams establish practical finance systems they can run without heavy overhead. Her frameworks focus on clarity, planning cadence, and responsible growth decisions.\n\nShe collaborates with founders on dashboard setup, monthly review structure, and spend governance.",
        highlights: [
          "Founder finance operations setup",
          "Runway and burn monitoring systems",
          "Monthly planning and reporting workflows"
        ],
        website: "https://macphersonweb.com/profile/neha-jain",
        email: "neha@macphersonweb.com",
      },
      media: [{ url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "finance", "founder"],
      authorName: "Neha Jain",
      publishedAt: "2026-04-20T08:40:00.000Z",
    },
    {
      id: "profile-user-arjun-mehta",
      title: "Arjun Mehta",
      slug: "arjun-mehta",
      summary: "Growth advisor focused on outbound systems and B2B pipeline quality.",
      content: {
        type: "profile",
        category: "Education",
        location: "Delhi",
        description: "Arjun helps sales and growth teams improve outreach quality and conversion consistency.",
        body: "Arjun works with B2B teams on outbound strategy, messaging systems, and sequence optimization. His playbooks are designed for practical execution and measurable improvement.\n\nRecent work includes script iteration systems, response benchmarking, and follow-up process design.",
        highlights: [
          "Outbound script and sequence architecture",
          "Response quality benchmarking",
          "Pipeline conversion workflow improvements"
        ],
        website: "https://macphersonweb.com/profile/arjun-mehta",
        email: "arjun@macphersonweb.com",
      },
      media: [{ url: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "sales", "growth"],
      authorName: "Arjun Mehta",
      publishedAt: "2026-04-20T08:50:00.000Z",
    },
    {
      id: "profile-user-1",
      title: "Ritika Sharma",
      slug: "ritika-sharma",
      summary: "Product marketer helping B2B SaaS teams position and launch with clarity.",
      content: {
        type: "profile",
        category: "Business",
        location: "Bengaluru",
        description: "Works with growth-stage startups on messaging systems, launch narratives, and GTM planning.",
        body: "Ritika supports SaaS founders and GTM teams with positioning strategy, product story architecture, and launch readiness programs. Her work focuses on clarity in messaging and measurable campaign outcomes.\n\nRecent projects include category narrative development, sales story overhaul, and messaging playbooks used by early growth-stage companies.",
        highlights: [
          "Positioning and narrative design for B2B SaaS",
          "Launch messaging frameworks and assets",
          "Cross-functional GTM alignment workshops"
        ],
        website: "https://ritikasharma.in",
        email: "ritika@ritikasharma.in",
      },
      media: [{ url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "marketing", "saas"],
      authorName: "Ritika Sharma",
      publishedAt: "2026-04-19T07:15:00.000Z",
    },
    {
      id: "profile-user-2",
      title: "Devansh Batra",
      slug: "devansh-batra",
      summary: "Full-stack engineer building internal tools and automation pipelines for remote teams.",
      content: {
        type: "profile",
        category: "Technology",
        location: "Gurugram",
        description: "Specializes in TypeScript stacks, API integrations, and lightweight developer tooling.",
        body: "Devansh builds internal products and automation systems for distributed teams. He works on API orchestration, workflow tooling, and data-to-dashboard pipelines that reduce repetitive operations work.\n\nHis portfolio includes CRM sync automation, report generation flows, and custom team utilities focused on reliability.",
        highlights: [
          "API integration architecture and automation",
          "TypeScript-first workflow tooling",
          "Internal platform reliability improvements"
        ],
        website: "https://devanshbatra.dev",
        email: "hello@devanshbatra.dev",
      },
      media: [{ url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "engineering", "automation"],
      authorName: "Devansh Batra",
      publishedAt: "2026-04-17T16:00:00.000Z",
    },
    {
      id: "profile-user-3",
      title: "Sana Khan",
      slug: "sana-khan",
      summary: "Brand designer creating visual systems for founders and digital-first businesses.",
      content: {
        type: "profile",
        category: "Lifestyle",
        location: "Mumbai",
        description: "Focuses on identity systems, launch assets, and web-first brand expression.",
        body: "Sana helps founders and product teams build visual identity systems that scale across launch, web, and marketing. Her approach emphasizes clarity, usability, and high-recognition brand patterns.\n\nShe has delivered brand refresh programs, website visual systems, and campaign kits for fast-moving startups.",
        highlights: [
          "Brand identity systems for digital products",
          "Launch-ready visual asset kits",
          "Web-first art direction and design language"
        ],
        website: "https://sanakhan.design",
        email: "studio@sanakhan.design",
      },
      media: [{ url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "design", "branding"],
      authorName: "Sana Khan",
      publishedAt: "2026-04-15T12:40:00.000Z",
    },
    {
      id: "profile-user-4",
      title: "Karthik Iyer",
      slug: "karthik-iyer",
      summary: "Operations specialist supporting agencies with delivery systems and process architecture.",
      content: {
        type: "profile",
        category: "Service",
        location: "Chennai",
        description: "Builds implementation frameworks and documentation systems for service teams.",
        body: "Karthik works with agency and consulting teams to improve delivery systems through process architecture and operational documentation. He helps teams reduce delays and increase handoff quality.\n\nTypical engagements include SOP design, quality-control checkpoints, and execution visibility dashboards.",
        highlights: [
          "Service delivery process architecture",
          "SOP and quality-control framework design",
          "Execution dashboards for team visibility"
        ],
        website: "https://karthikops.com",
        email: "karthik@karthikops.com",
      },
      media: [{ url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "operations", "agency"],
      authorName: "Karthik Iyer",
      publishedAt: "2026-04-13T09:00:00.000Z",
    },
    {
      id: "profile-user-5",
      title: "Nidhi Arora",
      slug: "nidhi-arora",
      summary: "Research analyst publishing structured insights for founders and product leaders.",
      content: {
        type: "profile",
        category: "Education",
        location: "Noida",
        description: "Shares customer research playbooks, interview frameworks, and insight repositories.",
        body: "Nidhi supports product and strategy teams with research operations, interview systems, and insight synthesis frameworks. Her work helps teams convert user input into clearer product decisions.\n\nShe publishes reusable templates for interview prep, note structuring, and evidence-based prioritization.",
        highlights: [
          "Customer interview and synthesis frameworks",
          "Insight repository and tagging systems",
          "Research operations setup for product teams"
        ],
        website: "https://nidhiarora.org",
        email: "nidhi@nidhiarora.org",
      },
      media: [{ url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=800&fit=crop", type: "IMAGE" }],
      tags: ["profile", "research", "product"],
      authorName: "Nidhi Arora",
      publishedAt: "2026-04-11T10:25:00.000Z",
    },
  ],
};

const randomFrom = (items: string[], index: number) =>
  items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const buildProfileFromPdfPost = (pdfPost: SitePost, index: number): SitePost | null => {
  const authorName = typeof pdfPost.authorName === "string" ? pdfPost.authorName.trim() : "";
  if (!authorName) return null;
  const slug = slugify(authorName);
  const content = pdfPost.content && typeof pdfPost.content === "object" ? (pdfPost.content as Record<string, unknown>) : {};
  const location = typeof content.location === "string" ? content.location : "India";
  const category = typeof content.category === "string" ? content.category : "Business";
  return {
    id: `profile-from-pdf-${slug}-${index + 1}`,
    title: authorName,
    slug,
    summary: `Contributor profile linked to published PDF resources by ${authorName}.`,
    content: {
      type: "profile",
      category,
      location,
      description: `${authorName} publishes document resources and practical playbooks on ${category.toLowerCase()} workflows.`,
      website: `https://macphersonweb.com/profile/${slug}`,
    },
    media: Array.isArray(pdfPost.media) && pdfPost.media.length ? pdfPost.media : [{ url: `https://picsum.photos/seed/profile-${slug}/1200/800`, type: "IMAGE" }],
    tags: ["profile", "contributor", category.toLowerCase()],
    authorName,
    publishedAt: pdfPost.publishedAt || new Date().toISOString(),
  };
};

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  const custom = customMockPosts[task];
  if (custom?.length) {
    if (task === "profile") {
      const pdfPosts = customMockPosts.pdf || [];
      const derivedProfiles = pdfPosts
        .map((post, index) => buildProfileFromPdfPost(post, index))
        .filter((item): item is SitePost => Boolean(item));
      const seen = new Set<string>();
      return [...custom, ...derivedProfiles].filter((post) => {
        if (seen.has(post.slug)) return false;
        seen.add(post.slug);
        return true;
      });
    }
    return custom;
  }

  return Array.from({ length: 5 }).map((_, index) => {
    const title = taskTitles[task][index];
    const category = randomFrom(taskCategories[task], index);
    const slug = `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: summaryByTask[task],
      content: {
        type: task,
        category,
        location: "Delhi",
        description: summaryByTask[task],
        website: "https://example.com",
        phone: "+91-9999999999",
      },
      media: [{ url: buildImage(task, index), type: "IMAGE" }],
      tags: [task, category],
      authorName: "Site Master Pro",
      publishedAt: new Date().toISOString(),
    };
  });
};
