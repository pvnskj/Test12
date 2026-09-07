export type ProjectMetric = {
  value: string;
  label: string;
  detail: string;
};

export type ProjectSourceStatus = 'ready' | 'review';

export type Project = {
  index: string;
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  headline: string;
  summary: string;
  tags: string[];
  flow: string[];
  metrics: ProjectMetric[];
  featured: boolean;
  visual:
    | 'catalog'
    | 'network'
    | 'inspection'
    | 'ledger'
    | 'inventory'
    | 'portfolio'
    | 'forecast'
    | 'payments'
    | 'fulfillment';
  impactFile: string;
  whitepaperFile?: string;
  sourceStatus: ProjectSourceStatus;
  sourceNote?: string;
};

export const projects: Project[] = [
  {
    index: '01',
    slug: 'asset-catalog',
    title: 'Asset Catalog',
    category: 'Product information · Data governance',
    eyebrow: 'Governed product information',
    headline: 'A governance-first backbone for trusted product information.',
    summary:
      'A clean, governance-first asset backbone accelerates services, lowers outages, and keeps experiences predictable.',
    tags: ['Governance', 'Metadata', 'Data contracts', 'Channels'],
    flow: ['Source systems', 'Metadata', 'Governance', 'Product model', 'APIs', 'Channels'],
    metrics: [
      {
        value: '312%',
        label: '3-year ROI projection',
        detail: 'Existing impact model in Test12.',
      },
      {
        value: '$307.4K',
        label: 'Projected net benefit',
        detail: 'Existing impact model in Test12.',
      },
      {
        value: '$452.4K',
        label: 'Projected value generated',
        detail: 'Existing impact model in Test12.',
      },
    ],
    featured: true,
    visual: 'catalog',
    impactFile: 'asset-catalog-impact.html',
    whitepaperFile: 'asset-catalog-whitepaper.html',
    sourceStatus: 'ready',
  },
  {
    index: '02',
    slug: 'rfds',
    title: 'RFDS',
    category: 'Telecommunications · Automation',
    eyebrow: 'Radio Frequency Design Sheets',
    headline: 'Moving RFDS from manual spreadsheets to a validated, automated ecosystem.',
    summary:
      'An integrated framework for automated RFDS generation with data integration, rule-driven workflows, lineage, and downstream routing.',
    tags: ['Data integration', 'Rule automation', 'Lineage', 'Telecommunications'],
    flow: ['Data intake', 'Normalize', 'Policy checks', 'Approval', 'Route', 'Evidence'],
    metrics: [
      {
        value: '72%',
        label: 'Faster approval cycles',
        detail: 'Claim carried from the existing RFDS impact deck.',
      },
      {
        value: 'Live',
        label: 'Lineage visibility',
        detail: 'Source, reviewer, and consumer context captured in the existing impact deck.',
      },
      {
        value: 'Exception-first',
        label: 'Routing model',
        detail: 'High-risk items route to specialist queues in the existing impact deck.',
      },
    ],
    featured: true,
    visual: 'network',
    impactFile: 'RFDS-impact.html',
    whitepaperFile: 'RFDS.html',
    sourceStatus: 'ready',
  },
  {
    index: '03',
    slug: 'inspection',
    title: 'Inspection',
    category: 'Field operations · Evidence systems',
    eyebrow: 'Digital inspections',
    headline: 'Evidence you can trust, routed to the people who need it.',
    summary:
      'Digital inspections, exception-first routing, and audit-ready trails designed to protect safety and compliance.',
    tags: ['Field operations', 'Exception routing', 'Evidence', 'Compliance'],
    flow: ['Inspection', 'Signal', 'Risk rule', 'Exception queue', 'Action', 'Evidence trail'],
    metrics: [
      {
        value: '345%',
        label: 'Projected 3-year ROI',
        detail: 'Existing business case in Test12.',
      },
      {
        value: '$620K',
        label: 'Projected net value',
        detail: 'Existing business case in Test12.',
      },
      {
        value: '$800K',
        label: 'Risk avoidance',
        detail: 'Existing business case in Test12.',
      },
    ],
    featured: true,
    visual: 'inspection',
    impactFile: 'inspection-impact.html',
    whitepaperFile: 'inspection-whitepaper.html',
    sourceStatus: 'ready',
  },
  {
    index: '04',
    slug: 'gl-coding',
    title: 'GL Coding',
    category: 'Financial operations · Controls',
    eyebrow: 'Policy-aware financial controls',
    headline: 'Dynamic GL coding with policy intelligence and traceable evidence.',
    summary:
      'Controls, simulations, and reconciliation states designed to reduce rework during close and audits.',
    tags: ['Policy graph', 'Simulation', 'Controls', 'Auditability'],
    flow: ['Source hygiene', 'Policy graph', 'Simulation', 'Reviewer route', 'Posting', 'Ledger proof'],
    metrics: [
      {
        value: '40%',
        label: 'Faster month-end close',
        detail: 'Claim carried from the existing GL Coding impact deck.',
      },
      {
        value: 'Traceable',
        label: 'Mapping evidence',
        detail: 'Approvers, reason codes, and lineage are emphasized in the existing impact deck.',
      },
    ],
    featured: true,
    visual: 'ledger',
    impactFile: 'gl-coding-impact.html',
    whitepaperFile: 'Gl Coding Whitepaper.html',
    sourceStatus: 'ready',
  },
  {
    index: '05',
    slug: 'inventory',
    title: 'Inventory',
    category: 'Inventory systems · Promise integrity',
    eyebrow: 'Availability and reservations',
    headline: 'Promise keeping at scale through sensing, reservations, and rebalancing.',
    summary:
      'Dynamic sensing, substitutions, and network-aware reservations keep commitments credible across retail and field scenarios.',
    tags: ['Availability', 'Promise engine', 'Reservations', 'Rebalancing'],
    flow: ['Availability truth', 'Demand signal', 'Promise engine', 'Reservation', 'Substitution', 'Rebalance'],
    metrics: [
      {
        value: '285%',
        label: 'Projected 3-year ROI',
        detail: 'Existing business case in Test12.',
      },
      {
        value: '$630K',
        label: 'Projected net value',
        detail: 'Existing business case in Test12.',
      },
      {
        value: '$850K',
        label: 'Capital released',
        detail: 'Existing business case in Test12.',
      },
    ],
    featured: false,
    visual: 'inventory',
    impactFile: 'inventory-impact.html',
    whitepaperFile: 'inventory-whitepaper.html',
    sourceStatus: 'ready',
  },
  {
    index: '06',
    slug: 'asset-portfolio-management',
    title: 'Asset & Portfolio Management',
    category: 'Portfolio systems · Risk telemetry',
    eyebrow: 'Portfolio controls',
    headline: 'Real-time telemetry for exposure, valuation, and exception-driven action.',
    summary:
      'Unified data contracts, liquidity alerts, and exposure visualizations designed to improve portfolio control and reconciliation.',
    tags: ['Exposure', 'Valuation', 'Risk', 'Automation'],
    flow: ['Positions', 'Signals', 'Risk checks', 'Exposure view', 'Route', 'Reconcile'],
    metrics: [
      {
        value: '-18%',
        label: 'Exposure swings',
        detail: 'Claim carried from the existing impact deck.',
      },
      {
        value: '+3 pts',
        label: 'Data trust',
        detail: 'Claim carried from the existing impact deck.',
      },
    ],
    featured: false,
    visual: 'portfolio',
    impactFile: 'asset-portfolio-management-impact.html',
    sourceStatus: 'review',
    sourceNote:
      'The current Asset & Portfolio Management whitepaper file contains Financial Projections content. The impact page is retained; the mismatched deep dive is intentionally not promoted.',
  },
  {
    index: '07',
    slug: 'financial-projections',
    title: 'Financial Projections',
    category: 'Forecasting · Decision support',
    eyebrow: 'Projection webservice',
    headline: 'A reliability anchor for scenario planning and variance awareness.',
    summary:
      'SLO-backed forecasts, reusable scenarios, and delta alerts designed to reduce surprise variances and keep decision makers aligned.',
    tags: ['Forecasting', 'Scenario planning', 'SLOs', 'Variance alerts'],
    flow: ['Data contracts', 'Quality gates', 'Scenario runner', 'Forecast', 'Variance alert', 'Decision support'],
    metrics: [
      {
        value: '-15%',
        label: 'Forecast variance',
        detail: 'Claim carried from the existing impact deck.',
      },
      {
        value: '+25%',
        label: 'Scenario coverage',
        detail: 'Claim carried from the existing impact deck.',
      },
      {
        value: 'Real time',
        label: 'Delta notifications',
        detail: 'Operating pattern described in the existing impact deck.',
      },
    ],
    featured: false,
    visual: 'forecast',
    impactFile: 'financial-projections-impact.html',
    whitepaperFile: 'financial-projections-whitepaper.html',
    sourceStatus: 'ready',
  },
  {
    index: '08',
    slug: 'peer-to-peer-transactions',
    title: 'Peer-to-Peer Transactions',
    category: 'Payments · Trust and risk',
    eyebrow: 'P2P resilience',
    headline: 'Ledgered payment flows with shared identity and risk guardrails.',
    summary:
      'A P2P model focused on safety, speed, transparency, risk-aware routing, disputes, and interoperable transaction rails.',
    tags: ['Identity', 'Risk', 'Routing', 'Settlement'],
    flow: ['Identity', 'Device signal', 'Risk decision', 'Route', 'Settle', 'Evidence'],
    metrics: [
      {
        value: '-30%',
        label: 'Disputes',
        detail: 'Claim carried from the existing impact deck.',
      },
      {
        value: '+18%',
        label: 'Successful transfers',
        detail: 'Claim carried from the existing impact deck.',
      },
      {
        value: 'Seconds',
        label: 'Receipt times',
        detail: 'Claim carried from the existing impact deck.',
      },
    ],
    featured: false,
    visual: 'payments',
    impactFile: 'peer-to-peer-transactions-impact.html',
    whitepaperFile: 'peer-to-peer-transactions-whitepaper.html',
    sourceStatus: 'ready',
  },
  {
    index: '09',
    slug: 'order-fulfillment',
    title: 'Order Fulfillment',
    category: 'Fulfillment · Customer promise',
    eyebrow: 'Promise-to-proof orchestration',
    headline: 'Connecting inventory truth, promise decisions, alerts, and delivery evidence.',
    summary:
      'The existing project material explores promise integrity, proactive customer alerts, and evidence-backed handoffs across fulfillment.',
    tags: ['Promise integrity', 'Notifications', 'Fulfillment', 'Evidence'],
    flow: ['Inventory', 'Catalog', 'Promise desk', 'Alert', 'Fulfillment', 'Delivery evidence'],
    metrics: [],
    featured: false,
    visual: 'fulfillment',
    impactFile: 'order-fulfillment-impact.html',
    whitepaperFile: 'order-fulfillment-whitepaper.html',
    sourceStatus: 'review',
    sourceNote:
      'The current impact page explicitly labels itself a placeholder deck. The project is retained, but its quantitative impact claims are withheld from the redesigned portfolio pending validation.',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
