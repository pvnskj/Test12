export type ProjectMetric = {
  value: string;
  label: string;
  detail: string;
};

export type DecisionPoint = {
  title: string;
  body: string;
};

export type Increment = {
  title: string;
  focus: string;
  learning: string;
};

export type Project = {
  index: string;
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  question: string;
  headline: string;
  summary: string;
  productGoal: string;
  problem: string;
  complexity: string[];
  ownership: string[];
  decisions: DecisionPoint[];
  flow: string[];
  flowCaption: string;
  increments: Increment[];
  valueNarrative: string;
  metrics: ProjectMetric[];
  featured: boolean;
  visual:
    | 'catalog'
    | 'network'
    | 'inspection'
    | 'ledger'
    | 'inventory'
    | 'forecast'
    | 'fulfillment';
};

export const projects: Project[] = [
  {
    index: '01',
    slug: 'asset-catalog',
    title: 'Asset Catalog',
    category: 'Master data · Workflow orchestration',
    eyebrow: 'Enterprise asset data',
    question: 'How do you stop bad master data before it propagates across the enterprise?',
    headline: 'Building the governed path from asset request to enterprise-ready master data.',
    summary:
      'The challenge was not collecting more fields. It was defining when an asset becomes trusted, who can approve it, how that state moves across MDM and ERP, and what happens when the systems disagree.',
    productGoal:
      'Create one governed path from asset request to enterprise-ready master data while preventing incomplete, stale, or conflicting records from propagating downstream.',
    problem:
      'Asset creation crossed business teams, governance roles, Master Data Management, ERP, and downstream consumers. A request could look complete to one team and still be unsafe to publish elsewhere. Treating the request form as the product would have automated the visible step while leaving the real lifecycle fragmented.',
    complexity: [
      'Dynamic taxonomy and required attributes by asset type',
      'Context-aware approval routing and separation of duties',
      'MDM API orchestration followed by ERP ingestion',
      'Mismatch, re-match, stale-data, and hold states',
      'Business-admin configuration without a development cycle for every policy change',
    ],
    ownership: [
      'Frame the product boundary around the full asset lifecycle, not the submission screen',
      'Clarify which system owns identity, governance state, and downstream financial state',
      'Separate configurable business policy from application behavior where change frequency justified it',
      'Order the Product Backlog around data integrity, dependencies, and risk before downstream automation',
      'Make exception handling an explicit product capability rather than an operational afterthought',
    ],
    decisions: [
      {
        title: 'Treat the lifecycle as the product',
        body:
          'The meaningful outcome was not a submitted request; it was a trusted asset that could safely exist across enterprise systems. That changed the conversation from screens and fields to states, ownership, orchestration, and evidence.',
      },
      {
        title: 'Make governance configurable',
        body:
          'Asset types and approval policies evolve. Moving taxonomy and routing rules into business-controlled configuration reduced the need to turn every governance change into a code change.',
      },
      {
        title: 'Fail safe when systems disagree',
        body:
          'A mismatch or stale ERP file was treated as a product state. The workflow could hold propagation, notify the right owner, and re-run reconciliation rather than allowing older data to overwrite a trusted value.',
      },
    ],
    flow: ['Request', 'Dynamic taxonomy', 'Context routing', 'Final approval', 'MDM / PCM', 'ERP', 'Reconcile or hold', 'Enterprise-ready asset'],
    flowCaption:
      'The system makes trust explicit: approval alone does not make an asset live; downstream synchronization and reconciliation complete the lifecycle.',
    increments: [
      {
        title: 'Identity & validation',
        focus: 'Asset model, taxonomy, required attributes, duplicate prevention',
        learning: 'Can we create a complete and consistently understood asset definition?',
      },
      {
        title: 'Governance',
        focus: 'Dynamic routing, approvals, separation of duties, exceptions',
        learning: 'Can the right experts govern the right requests without creating a bottleneck?',
      },
      {
        title: 'Enterprise orchestration',
        focus: 'MDM handoff, ERP ingestion, lifecycle state transitions',
        learning: 'Can trusted data cross system boundaries without losing identity or state?',
      },
      {
        title: 'Reconciliation & telemetry',
        focus: 'Mismatch handling, holds, re-match, operational visibility',
        learning: 'Can the product recover safely when real enterprise data is imperfect?',
      },
    ],
    valueNarrative:
      'The value case is a governed asset backbone that reduces rework and downstream data defects while shortening the path from request to usable enterprise data. Existing repository business-case material projects a 312% three-year ROI, $307.4K net benefit, and $452.4K in value generated.',
    metrics: [
      { value: '312%', label: 'Projected 3-year ROI', detail: 'Existing portfolio business case.' },
      { value: '$307.4K', label: 'Projected net benefit', detail: 'Existing portfolio business case.' },
      { value: '$452.4K', label: 'Projected value generated', detail: 'Existing portfolio business case.' },
    ],
    featured: true,
    visual: 'catalog',
  },
  {
    index: '02',
    slug: 'inventory',
    title: 'Inventory & Asset Lifecycle',
    category: 'Supply chain · Chain of custody',
    eyebrow: 'System of systems',
    question: 'Who owns the truth when five enterprise systems each know only part of an asset?',
    headline: 'Creating a digital chain of custody across inventory, finance, and physical operations.',
    summary:
      'ERP knew procurement and capitalization. WMS knew physical movement. Fixed Assets knew capitalized equipment. Planning knew demand. Receiving knew what physically arrived. The product had to turn those partial truths into one auditable lifecycle.',
    productGoal:
      'Establish end-to-end asset identity and custody across operational and financial systems so the business can locate an asset, understand its state, and prove how it got there.',
    problem:
      'No single platform owned the complete asset lifecycle. Manual reconciliation between physical movement and financial records created opacity, audit exposure, and weak control over high-value inventory. Replacing every system was neither necessary nor realistic; the product needed to orchestrate them.',
    complexity: [
      'ERP, WMS, Fixed Assets, planning, and receiving systems with different responsibilities',
      'Serialization and identity from receipt through deployment and return',
      'Physical scans correcting vendor or ASN discrepancies',
      'Parent-child / BOM validation for kitted assets',
      'Reverse logistics for previously capitalized equipment',
    ],
    ownership: [
      'Define authoritative ownership by lifecycle state rather than declaring one universal source of truth',
      'Use serialization as the persistent identity anchor for custody and auditability',
      'Design exception paths around the reality that physical and digital records can disagree',
      'Preserve financial controls while enabling recovered assets to re-enter physical inventory tracking',
      'Sequence capabilities so identity and custody are trustworthy before adding broader lifecycle automation',
    ],
    decisions: [
      {
        title: 'Orchestrate instead of replace',
        body:
          'The product acts as a custody and integration layer. ERP remains authoritative for procurement and financial state; WMS remains authoritative for warehouse operations; the product creates the lifecycle narrative across them.',
      },
      {
        title: 'Make the physical scan authoritative at receipt',
        body:
          'Vendor shipping data can be wrong. Treating the physical scan as the entry-point truth allows the product to correct serial and shipment discrepancies before they become downstream inventory problems.',
      },
      {
        title: 'Preserve audit history through recovery',
        body:
          'Returned capitalized assets receive a recovered identity that can re-enter zero-cost inventory tracking while remaining linked to the original capitalized record. Operational movement continues without breaking financial history.',
      },
    ],
    flow: ['ERP / PO', 'Physical receipt', 'Scan & serialize', 'WMS custody', 'Deploy / move', 'Fixed Assets', 'Return / recover', 'Audit trail'],
    flowCaption:
      'Each platform keeps its responsibility. The product preserves identity and reconciles state across the handoffs.',
    increments: [
      {
        title: 'Receive & identify',
        focus: 'PO context, physical scan, serialization, format validation',
        learning: 'Can every controlled asset enter the lifecycle with a trustworthy identity?',
      },
      {
        title: 'Custody',
        focus: 'Warehouse movement, kitting, parent-child validation, deployment state',
        learning: 'Can physical movement be traced without relying on manual reconciliation?',
      },
      {
        title: 'Financial synchronization',
        focus: 'ERP and Fixed Assets state, capitalization evidence, reconciliation',
        learning: 'Can operational and financial states remain consistent across system boundaries?',
      },
      {
        title: 'Reverse lifecycle',
        focus: 'Returns, recovered identity, retirement, complete audit linkage',
        learning: 'Can the product handle the hard end-of-life cases without breaking financial controls?',
      },
    ],
    valueNarrative:
      'The business value comes from traceable inventory, lower reconciliation effort, stronger auditability, and more productive use of capital. Existing repository material projects a 285% three-year ROI, $630K net value, and $850K in capital released.',
    metrics: [
      { value: '285%', label: 'Projected 3-year ROI', detail: 'Existing portfolio business case.' },
      { value: '$630K', label: 'Projected net value', detail: 'Existing portfolio business case.' },
      { value: '$850K', label: 'Projected capital released', detail: 'Existing portfolio business case.' },
    ],
    featured: true,
    visual: 'inventory',
  },
  {
    index: '03',
    slug: 'rfds',
    title: 'RFDS Automation',
    category: 'Telecommunications · Engineering automation',
    eyebrow: 'Network engineering product',
    question: 'How do you turn engineering knowledge trapped in spreadsheets into a dependable product?',
    headline: 'Replacing spreadsheet-based network engineering with a rules-driven product.',
    summary:
      'RFDS generation depended on spreadsheets, macros, manual data entry, and domain knowledge distributed across people and files. The product had to combine source data, site context, engineering rules, validation, and document generation without hiding the exceptions that still required human judgment.',
    productGoal:
      'Reduce the cycle time and operational risk between approved RF planning data and a field-ready engineering document while preserving configuration accuracy and traceability.',
    problem:
      'As network densification, spectrum overlays, and large build programs increased configuration complexity, spreadsheet-based RFDS creation became a bottleneck. Version drift, manual mapping, and stale information could create rework or send field teams outdated specifications.',
    complexity: [
      'RF planning data and procurement catalog attributes arriving from separate sources',
      'Site configuration differences such as monopole and rooftop structures',
      'Alpha / Beta / Gamma sector-specific equipment assignments',
      'Frequency, radio-model, placement, and cable-length decision rules',
      'Scheduled synchronization plus an immediate validated manual path',
    ],
    ownership: [
      'Reframe the goal from automating a spreadsheet to improving the full planning-to-field outcome',
      'Translate domain rules into explicit product behavior that engineering could implement and test',
      'Identify which decisions could be automated and where human review still protected quality',
      'Order the backlog around source-data integrity and rule correctness before optimizing document generation',
      'Keep lineage and exception handling visible so speed did not come at the expense of engineering trust',
    ],
    decisions: [
      {
        title: 'Centralize the data before automating the document',
        body:
          'Generating a PDF faster would not solve stale or inconsistent inputs. The product first harmonizes RF planning data and procurement attributes into a site-level model that downstream rules can trust.',
      },
      {
        title: 'Turn expert judgment into testable rules',
        body:
          'Sector mapping, structure-driven placement, frequency logic, and cable selection were made explicit so the same engineering decision could be applied consistently and validated repeatedly.',
      },
      {
        title: 'Keep a controlled manual path',
        body:
          'Scheduled synchronization optimized normal operations, but urgent work still needed an immediate path. Validated dropdowns and approved parts allowed speed without abandoning governance.',
      },
    ],
    flow: ['RF planning', 'Procurement catalog', 'Data sync', 'Site model', 'Sector mapping', 'Rule engine', 'Validation', 'RFDS + diagrams'],
    flowCaption:
      'The document is the output. The real product is the data and decision pipeline that makes the output trustworthy.',
    increments: [
      {
        title: 'Trusted source data',
        focus: 'Integrations, synchronization, approved equipment attributes',
        learning: 'Can the product establish a dependable site-level input model?',
      },
      {
        title: 'Site & sector model',
        focus: 'Configuration, Alpha/Beta/Gamma views, equipment assignment',
        learning: 'Can domain structure be represented clearly enough to support repeatable automation?',
      },
      {
        title: 'Rules & validation',
        focus: 'Frequency, placement, line-detail calculations, exception handling',
        learning: 'Can expert decisions be automated without creating silent configuration risk?',
      },
      {
        title: 'Field-ready output',
        focus: 'RFDS generation, dynamic diagrams, lineage and approval flow',
        learning: 'Does automation actually shorten the planning-to-field cycle while preserving trust?',
      },
    ],
    valueNarrative:
      'The outcome is less manual engineering effort, fewer version-control errors, faster approvals, and a repeatable path from live source data to installation-ready output. The existing RFDS impact material reports 72% faster approval cycles.',
    metrics: [
      { value: '72%', label: 'Faster approval cycles', detail: 'Claim in the existing RFDS impact material.' },
      { value: 'Live', label: 'Lineage visibility', detail: 'Source, reviewer, and consumer context are retained.' },
      { value: 'Exception-first', label: 'Routing model', detail: 'High-risk items can be routed for specialist review.' },
    ],
    featured: true,
    visual: 'network',
  },
  {
    index: '04',
    slug: 'inspection',
    title: 'Inspection & Predictive Maintenance',
    category: 'Field operations · Reliability',
    eyebrow: 'Maintenance intelligence',
    question: 'How do you move maintenance from calendar-driven work to evidence-driven intervention?',
    headline: 'Turning inspection data into risk-informed operational action.',
    summary:
      'The product connects authoritative asset requirements, usage and fault history, lifecycle context, predictive signals, work-order optimization, and field feedback so maintenance can evolve from scheduled activity toward targeted intervention.',
    productGoal:
      'Improve asset reliability and field efficiency by using the best available evidence to decide what should be inspected, when intervention is justified, and how field outcomes feed the next decision.',
    problem:
      'Traditional maintenance programs can be consistent without being intelligent. Fixed schedules ignore how assets are actually used, repeat failures are not always translated into future action, and independent work orders can create unnecessary truck rolls.',
    complexity: [
      'Asset catalog requirements, usage/fault history, and lifecycle data serving different decision needs',
      'Planned, proactive, and predictive maintenance with different levels of uncertainty',
      'External predictive intelligence feeding an operational workflow product',
      'Human-in-the-loop approval for recommendations with operational consequences',
      'Work-order consolidation, field dispatch, fault capture, and feedback loops',
    ],
    ownership: [
      'Define the outcome around reliability and intervention quality rather than inspection volume',
      'Separate predictive intelligence from workflow orchestration so each capability could evolve independently',
      'Keep human judgment where model recommendations carried operational risk',
      'Use configurable work-order windows to balance field efficiency with maintenance urgency',
      'Treat field results as product feedback that should improve the next planning decision',
    ],
    decisions: [
      {
        title: 'Build a maturity path instead of jumping to prediction',
        body:
          'Planned maintenance establishes the operational foundation, proactive maintenance uses historical patterns, and predictive maintenance adds external forecasting. Each stage is useful on its own and creates evidence for the next.',
      },
      {
        title: 'Keep prediction and orchestration separate',
        body:
          'A specialized usage-intelligence system can estimate likely failure windows while the product validates asset state and decides how to turn that signal into operational work. That boundary reduces coupling and clarifies accountability.',
      },
      {
        title: 'Optimize field work, not just prediction accuracy',
        body:
          'When multiple maintenance events fall inside a configurable window, the workflow can combine them into one work order. The product outcome is fewer unnecessary visits and better intervention, not simply more alerts.',
      },
    ],
    flow: ['Asset catalog', 'Usage & faults', 'Lifecycle context', 'Maintenance intelligence', 'Work-order rules', 'Field execution', 'Fault report', 'Feedback'],
    flowCaption:
      'Signals only create value when they become the right operational action and the result is captured for the next decision.',
    increments: [
      {
        title: 'Planned maintenance',
        focus: 'Eligibility, intervals, task definitions, lifecycle triggers',
        learning: 'Can the product create a dependable baseline from authoritative asset data?',
      },
      {
        title: 'Proactive prioritization',
        focus: 'Defect patterns, repeat faults, human-reviewed recommendations',
        learning: 'Does historical evidence improve which assets receive attention?',
      },
      {
        title: 'Predictive signals',
        focus: 'Failure-window forecasting, in-service validation, workflow integration',
        learning: 'Can prediction change intervention timing without generating waste?',
      },
      {
        title: 'Field feedback loop',
        focus: 'Combined work orders, structured fault reports, outcome data',
        learning: 'Are operational results improving the next maintenance decision?',
      },
    ],
    valueNarrative:
      'The value comes from reducing avoidable field work, improving reliability, and directing maintenance toward higher-risk assets while preserving audit-ready evidence. Existing portfolio material projects a 345% three-year ROI, $620K net value, and $800K in risk avoidance.',
    metrics: [
      { value: '345%', label: 'Projected 3-year ROI', detail: 'Existing portfolio business case.' },
      { value: '$620K', label: 'Projected net value', detail: 'Existing portfolio business case.' },
      { value: '$800K', label: 'Projected risk avoidance', detail: 'Existing portfolio business case.' },
    ],
    featured: true,
    visual: 'inspection',
  },
  {
    index: '05',
    slug: 'gl-coding',
    title: 'Dynamic GL Coding',
    category: 'Financial operations · Configurable policy',
    eyebrow: 'Financial product controls',
    question: 'What happens when business policy changes faster than the software encoding it?',
    headline: 'Turning accounting policy into configurable product logic.',
    summary:
      'A coding model designed for a narrow set of capital projects became a constraint as the portfolio expanded into new project types and mixed CapEx / OpEx activity. The product needed to preserve financial control without making every policy change a software release.',
    productGoal:
      'Generate accurate, auditable financial coding across changing project types by separating configurable accounting policy from application logic.',
    problem:
      'Hard-coded financial logic created risk when the business expanded beyond the project types the original model anticipated. Inaccurate classification, weak project-level allocation, and improper capitalization could all follow from treating a changing accounting policy as a fixed software rule.',
    complexity: [
      'Different project types with different CapEx / OpEx treatment',
      'Multi-component GL codes assembled from business context',
      'Configurable lookup tables and policy rules',
      'Review, simulation, posting, and traceable evidence',
      'Need to scale to new ventures without destabilizing existing financial behavior',
    ],
    ownership: [
      'Reframe the problem from generating a code string to maintaining financial policy safely at scale',
      'Decompose the code into independently governed components rather than one monolithic rule',
      'Make policy changes configurable where the business needed agility and retain controls around posting',
      'Expose review and evidence states so automation remained auditable',
      'Balance speed of onboarding new project types against the risk of financial misclassification',
    ],
    decisions: [
      {
        title: 'Decouple policy from code',
        body:
          'The GL code became an assembly of metadata-driven components governed by configurable lookup tables. That allows policy to evolve without embedding every change directly into application logic.',
      },
      {
        title: 'Preserve review before irreversible action',
        body:
          'Simulation and reviewer routing create a controlled space to validate mappings before posting. Automation accelerates the repeatable decision while keeping financial exceptions inspectable.',
      },
      {
        title: 'Design for new project types',
        body:
          'The product was shaped as a reusable financial-coding capability rather than a one-off solution for the current portfolio. The test of the model is whether new ventures can be onboarded through configuration rather than structural rework.',
      },
    ],
    flow: ['Project context', 'Code components', 'Lookup rules', 'Policy evaluation', 'Simulation / review', 'Validated code', 'Posting', 'Audit evidence'],
    flowCaption:
      'The key abstraction is simple: business policy can change while the product architecture remains stable.',
    increments: [
      {
        title: 'Component model',
        focus: 'Decompose the GL code and define contextual inputs',
        learning: 'Can the accounting model represent existing and emerging project types cleanly?',
      },
      {
        title: 'Configurable policy',
        focus: 'Lookup tables, mapping rules, validation',
        learning: 'Can finance change policy safely without a code release for every adjustment?',
      },
      {
        title: 'Decision controls',
        focus: 'Simulation, reviewer route, exception handling',
        learning: 'Can automation increase speed while preserving financial governance?',
      },
      {
        title: 'Posting & evidence',
        focus: 'Ledger integration, reason codes, lineage, audit trail',
        learning: 'Can every posted result be traced back to the policy and context that produced it?',
      },
    ],
    valueNarrative:
      'The product reduces manual coding and rework while improving consistency across project types and making policy decisions traceable. Existing impact material reports a 40% faster month-end close.',
    metrics: [
      { value: '40%', label: 'Faster month-end close', detail: 'Claim in the existing GL Coding impact material.' },
      { value: 'Traceable', label: 'Mapping evidence', detail: 'Approvers, reason codes, and lineage are represented in the source material.' },
    ],
    featured: true,
    visual: 'ledger',
  },
  {
    index: '06',
    slug: 'order-fulfillment',
    title: 'Order & Fulfillment Management',
    category: 'Fulfillment · Cross-system orchestration',
    eyebrow: 'Customer promise',
    question: 'How do you keep a customer promise when every system owns a different part of the order?',
    headline: 'Orchestrating order state across planning, warehouse, transport, and finance.',
    summary:
      'The product acts as the system of engagement for an order while WMS, TMS, ERP, and planning platforms continue to own their specialized states. The difficult part is making those states coherent enough to manage backlog, fulfillment, exceptions, and customer visibility.',
    productGoal:
      'Create one reliable order lifecycle that coordinates inventory, warehouse execution, transportation, financial processing, and backlog decisions without replacing the systems that already perform those functions.',
    problem:
      'Fragmented order operations created weak real-time visibility, manual backlog tracking, inconsistent fulfillment logic, and error-prone handoffs. No peripheral system had enough context to represent the complete customer promise.',
    complexity: [
      'Central order management plus WMS, TMS, ERP, and planning / forecasting',
      'Order initiation, inventory availability, allocation, backlog, pick, ship, transit, and delivery states',
      'Financial transfer or write-off states that do not belong in the warehouse platform',
      'Exceptions and notifications that depend on the combined state of several systems',
    ],
    ownership: [
      'Define the order lifecycle as the shared product model across specialized systems',
      'Preserve clear ownership boundaries rather than duplicate WMS, TMS, or ERP capability',
      'Make backlog and exception states visible product behavior rather than spreadsheet operations',
      'Sequence integration work around the customer promise and operational dependencies',
    ],
    decisions: [
      {
        title: 'Use a hub-and-spoke model',
        body:
          'The order platform becomes the orchestration hub while WMS, TMS, ERP, and planning remain responsible for their specialized execution. This creates end-to-end visibility without building another monolith.',
      },
      {
        title: 'Model the promise as state, not a status label',
        body:
          'An order is only understandable when inventory, warehouse, transportation, and financial events can be interpreted together. Explicit state transitions make backlog and exception decisions repeatable.',
      },
      {
        title: 'Treat exceptions as first-class work',
        body:
          'Backlog, unavailable inventory, fulfillment delays, and downstream handoff failures need clear owners and next actions. The product is designed for the failure path as deliberately as the happy path.',
      },
    ],
    flow: ['Demand / order', 'Order platform', 'Inventory decision', 'WMS', 'TMS', 'ERP', 'Unified order state', 'Customer / operations'],
    flowCaption:
      'The customer sees one promise even though execution is distributed across several enterprise systems.',
    increments: [
      {
        title: 'Order model',
        focus: 'Initiation, validation, ownership, lifecycle states',
        learning: 'Can every team interpret the order state the same way?',
      },
      {
        title: 'Inventory & backlog',
        focus: 'Availability, allocation, backlog decisions, planning signals',
        learning: 'Can the product make constrained inventory visible before it becomes a fulfillment surprise?',
      },
      {
        title: 'Execution orchestration',
        focus: 'WMS, TMS, ERP handoffs and operational state synchronization',
        learning: 'Can distributed execution behave like one coherent customer journey?',
      },
      {
        title: 'Exception visibility',
        focus: 'Alerts, delays, handoff failures, evidence',
        learning: 'Can operations intervene early enough to protect the promise?',
      },
    ],
    valueNarrative:
      'The source material supports the architecture and workflow story, but its current quantitative impact page is explicitly marked as placeholder material. The public portfolio therefore focuses on the product problem, decisions, and operating value without presenting those draft numbers as evidence.',
    metrics: [],
    featured: false,
    visual: 'fulfillment',
  },
  {
    index: '07',
    slug: 'financial-projections',
    title: 'Financial Projection Platform',
    category: 'Financial services · Scalable computation',
    eyebrow: 'Decision-support platform',
    question: 'How do you make a computationally expensive financial model usable as a dependable product?',
    headline: 'Designing projection services where model quality, scale, security, and cloud cost are product constraints.',
    summary:
      'The platform separates data aggregation, projection modeling, recommendation logic, API access, security, and cloud-cost governance so complex scenarios can evolve and scale without turning the product into one tightly coupled service.',
    productGoal:
      'Provide reliable, secure, reusable financial projections and scenario analysis while keeping model evolution, scale, and cloud cost manageable as product usage grows.',
    problem:
      'High-fidelity projections combine sensitive data, computationally expensive models, scenario management, recommendations, and changing assumptions. A monolithic implementation would make model changes risky, scaling inefficient, and cost harder to control.',
    complexity: [
      'Independent projection and recommendation responsibilities',
      'API gateway concerns including authentication, routing, rate limiting, and load balancing',
      'Sensitive data and end-to-end security requirements',
      'Scenario reuse, variance monitoring, and model evolution',
      'FinOps as a design constraint for computationally expensive workloads',
    ],
    ownership: [
      'Frame reliability, model evolution, security, and cost as product requirements rather than backend implementation details',
      'Separate independently changing capabilities so model experimentation does not destabilize the whole product',
      'Treat API access and governance as part of the product surface for B2B consumers',
      'Use scenario coverage and variance signals to inspect whether the product improves decision quality',
    ],
    decisions: [
      {
        title: 'Separate services by reason to change',
        body:
          'Projection modeling, recommendations, identity, and API concerns evolve at different rates. Independent services reduce the blast radius of model changes and allow selective scaling where compute demand is highest.',
      },
      {
        title: 'Make the API boundary a product concern',
        body:
          'Authentication, rate limits, routing, and consumer contracts determine whether the platform is dependable for other products. They are part of the value proposition, not plumbing to hide from product decisions.',
      },
      {
        title: 'Treat cloud cost as a constraint from the start',
        body:
          'Thousands of stochastic calculations can make an accurate product economically impractical. FinOps therefore belongs in scenario design, scaling decisions, and product trade-offs rather than being optimized after launch.',
      },
    ],
    flow: ['Client / consumer', 'API gateway', 'Data aggregation', 'Projection engine', 'Scenario outputs', 'Recommendation engine', 'Delta alerts', 'Decision support'],
    flowCaption:
      'The platform isolates high-change and high-compute capabilities while presenting consumers with one governed service boundary.',
    increments: [
      {
        title: 'Projection foundation',
        focus: 'Data contracts, quality gates, baseline model service',
        learning: 'Can the service generate stable, repeatable projections from trusted inputs?',
      },
      {
        title: 'Scenario product',
        focus: 'Reusable scenarios, comparison, coverage, model variation',
        learning: 'Do scenarios improve the decisions users can explore rather than just producing more output?',
      },
      {
        title: 'Platform boundary',
        focus: 'API gateway, security, authentication, consumer contracts',
        learning: 'Can other products consume the service reliably and safely?',
      },
      {
        title: 'Scale & operating signals',
        focus: 'Selective scaling, FinOps, SLOs, variance and delta alerts',
        learning: 'Can the product remain economically and operationally reliable as workload and model complexity grow?',
      },
    ],
    valueNarrative:
      'The product value is better scenario coverage and faster awareness of material forecast changes without coupling every consumer to the underlying model. Existing impact material reports 15% lower forecast variance, 25% higher scenario coverage, and real-time delta notifications.',
    metrics: [
      { value: '-15%', label: 'Forecast variance', detail: 'Claim in the existing Financial Projections impact material.' },
      { value: '+25%', label: 'Scenario coverage', detail: 'Claim in the existing Financial Projections impact material.' },
      { value: 'Real time', label: 'Delta notifications', detail: 'Operating pattern described in the existing impact material.' },
    ],
    featured: false,
    visual: 'forecast',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
