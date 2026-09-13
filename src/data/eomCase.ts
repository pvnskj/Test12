export type EomMetric = {
  value: string;
  label: string;
  type: 'Measured' | 'Actual' | 'Projected';
  detail: string;
};

export type EomFocusArea = {
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  purpose: string;
  whyItMatters: string;
  capabilities: string[];
  challenges: string[];
  ownership: string[];
  decisions: { title: string; body: string }[];
  flow: string[];
  evidence: EomMetric[];
  learning: string;
};

export const eomMetrics: EomMetric[] = [
  {
    value: '20%',
    label: 'Faster logic mapping',
    type: 'Measured',
    detail: 'Measured in a proof-of-concept comparison between dependency-driven self-assembly and manually modeled fulfillment logic.',
  },
  {
    value: '19+',
    label: 'Teams coordinated',
    type: 'Actual',
    detail: 'Actual cross-team delivery complexity required to preserve service behavior while the orchestration model changed underneath it.',
  },
  {
    value: '18',
    label: 'Service intents in scope',
    type: 'Actual',
    detail: 'Existing service behaviors that had to remain functionally intact during migration to the new orchestration model.',
  },
  {
    value: '75K/day',
    label: 'Target order capacity',
    type: 'Projected',
    detail: 'A modeled scale target for the event-driven architecture, not a claim of achieved production throughput.',
  },
];

export const eomDecisions = [
  {
    title: 'Dependencies over diagrams',
    body: 'Capabilities declare what they require and what they can execute, allowing the platform to resolve sequence and parallelism instead of manually redrawing every product path.',
  },
  {
    title: 'Assess before execution',
    body: 'Product decomposition, identifiers, configuration, and enrichment are resolved before fulfillment begins so downstream work does not consume incomplete technical state.',
  },
  {
    title: 'One shared order context',
    body: 'A governed lifecycle context lets capabilities contribute controlled enrichment without creating divergent versions of the same order.',
  },
  {
    title: 'Configuration over repeated customization',
    body: 'Product and orchestration policy move toward governed configuration while the core execution model stays stable as service combinations change.',
  },
];

export const eomFocusAreas: EomFocusArea[] = [
  {
    slug: 'orchestration-foundation',
    code: 'FOCUS-01',
    title: 'Orchestration Foundation',
    shortTitle: 'Orchestration',
    purpose: 'Replace manually modeled fulfillment paths with a dependency-driven execution model that can assemble work from declared capability needs.',
    whyItMatters: 'Product variation had become workflow variation. Every new combination added modeling, deployment, and regression effort. The product needed a reusable execution model rather than a growing library of paths.',
    capabilities: [
      'Capability registration and dependency declarations',
      'Dynamic execution-graph assembly',
      'Parallel work derived from dependency topology',
      'Deterministic execution boundaries',
    ],
    challenges: [
      'Preserving existing service behavior while changing the orchestration model',
      'Making dependencies explicit enough to resolve safely',
      'Balancing platform flexibility with deterministic execution',
      'Avoiding a new configuration layer that became another hidden workflow language',
    ],
    ownership: [
      'Defined the product direction away from manually modeled paths',
      'Framed dependency declaration as the reusable product capability',
      'Sequenced proof-of-concept work around the highest-risk orchestration assumptions',
      'Kept measured improvement separate from future scale projections',
    ],
    decisions: [
      {
        title: 'Declare intent, not traversal',
        body: 'The engine should understand what must happen and what each capability depends on rather than being told every step of every path in advance.',
      },
      {
        title: 'Use the dependency graph as the execution contract',
        body: 'Parallelism and sequence should emerge from topology so new product combinations do not require equivalent structural redesign.',
      },
    ],
    flow: ['Product intent', 'Capability proposals', 'Dependency resolution', 'Execution graph', 'Coordinated fulfillment'],
    evidence: [eomMetrics[0]!],
    learning: 'The key learning was that orchestration became easier to change only after dependencies were treated as a product contract rather than implementation detail.',
  },
  {
    slug: 'product-decomposition',
    code: 'FOCUS-02',
    title: 'Product Decomposition',
    shortTitle: 'Decomposition',
    purpose: 'Translate customer and product intent into the technical work required for fulfillment without embedding every possible combination into a static workflow.',
    whyItMatters: 'A configurable orchestration engine is only useful if high-level product intent can become the right set of technical actions. The decomposition layer had to absorb product variation while preserving expected service behavior.',
    capabilities: [
      'Intent-to-capability decomposition',
      'Product and service relationship interpretation',
      'Technical work proposal generation',
      'Compatibility with existing service behaviors',
    ],
    challenges: [
      'Maintaining behavior across many existing service intents',
      'Avoiding product-specific branching inside the orchestration engine',
      'Separating commercial variation from execution mechanics',
      'Coordinating changes across teams that owned different parts of the fulfillment chain',
    ],
    ownership: [
      'Defined how product intent should decompose into reusable technical work',
      'Prioritized preservation of existing outcomes over a clean-sheet rewrite',
      'Coordinated migration decisions across teams with different service responsibilities',
      'Used service-intent coverage as an explicit scope measure',
    ],
    decisions: [
      {
        title: 'Keep product variation outside core execution',
        body: 'Differences in plans and services should change decomposition and configuration before they require structural changes to the orchestration engine.',
      },
      {
        title: 'Preserve outcomes during migration',
        body: 'The new model had to prove that existing service behaviors remained intact before platform elegance or future scale could count as success.',
      },
    ],
    flow: ['Customer intent', 'Product interpretation', 'Technical decomposition', 'Capability set', 'Orchestration input'],
    evidence: [eomMetrics[2]!],
    learning: 'The product boundary became clearer when commercial variation was separated from execution mechanics and measured against preserved service outcomes.',
  },
  {
    slug: 'shared-order-context',
    code: 'FOCUS-03',
    title: 'Shared Order Context',
    shortTitle: 'Order Context',
    purpose: 'Create one governed lifecycle context for assessment, enrichment, validation, and execution so capabilities can work independently without fragmenting state.',
    whyItMatters: 'Parallel capabilities cannot operate safely when each reconstructs its own version of the order. Shared state had to become an explicit product contract rather than an informal integration convention.',
    capabilities: [
      'Canonical lifecycle context',
      'Controlled enrichment across capabilities',
      'Assessment before fulfillment',
      'Readiness gating before downstream execution',
    ],
    challenges: [
      'Defining ownership of shared fields across many teams',
      'Preventing partially enriched state from reaching execution',
      'Keeping the common model useful without making it excessively broad',
      'Coordinating contract changes across independently delivered capabilities',
    ],
    ownership: [
      'Standardized the shared context as a product contract',
      'Introduced a readiness boundary between assessment and execution',
      'Balanced local team autonomy against common lifecycle governance',
      'Coordinated adoption across the teams contributing to the order lifecycle',
    ],
    decisions: [
      {
        title: 'One context, controlled enrichment',
        body: 'Capabilities contribute to the same governed representation instead of creating local copies and repeated translation logic.',
      },
      {
        title: 'Readiness before execution',
        body: 'Required identifiers, configuration, and enrichment should be resolved before fulfillment can consume the order state.',
      },
    ],
    flow: ['Initial order', 'Assessment', 'Controlled enrichment', 'Readiness gate', 'Execution-ready context'],
    evidence: [eomMetrics[1]!],
    learning: 'Shared context reduced ambiguity only when field ownership, readiness, and contract governance were treated as product decisions rather than documentation tasks.',
  },
  {
    slug: 'scale-observability',
    code: 'FOCUS-04',
    title: 'Scale & Observability',
    shortTitle: 'Scale & Control',
    purpose: 'Make the orchestration platform operable as volume and service combinations grow through event-driven coordination, visibility, and governed policy.',
    whyItMatters: 'Dynamic execution creates value only if teams can understand what the platform assembled, where work is waiting, and how policy changes affect behavior. Scale without visibility would simply move complexity into production.',
    capabilities: [
      'Event-driven work coordination',
      'Execution-path visibility',
      'Configuration-driven policy controls',
      'Capacity modeling and operational instrumentation',
    ],
    challenges: [
      'Keeping dynamic execution understandable to operators and delivery teams',
      'Separating modeled capacity from observed production performance',
      'Designing configuration guardrails for policy changes',
      'Maintaining traceability as concurrency and service combinations increase',
    ],
    ownership: [
      'Prioritized observability as part of the product rather than post-launch tooling',
      'Defined the distinction between measured delivery evidence and projected capacity',
      'Pushed policy toward governed configuration where repeat customization added little value',
      'Kept scale claims qualified to what the evidence actually supported',
    ],
    decisions: [
      {
        title: 'Make dynamic execution visible',
        body: 'A system that assembles work dynamically must also expose enough of that assembly for teams to reason about behavior and exceptions.',
      },
      {
        title: 'Qualify scale evidence',
        body: 'Capacity modeling can guide architecture decisions, but projected throughput must remain visibly distinct from achieved production performance.',
      },
    ],
    flow: ['Configured policy', 'Event coordination', 'Dynamic execution', 'Operational visibility', 'Measured feedback'],
    evidence: [eomMetrics[3]!],
    learning: 'Observability and evidence qualification are part of product trust: teams need to see both how the platform behaves and what each performance claim actually proves.',
  },
];

export const eomEpic = {
  code: 'EPIC-01',
  title: 'Enterprise Order Management',
  category: 'Platform modernization · Order orchestration',
  headline: 'Turn fulfillment from manually modeled paths into a configurable orchestration platform.',
  bigPicture:
    'The legacy operating model made product change expensive because each new service combination could require another modeled fulfillment path. I led the product shift toward dependency-driven orchestration: capabilities declare what they need, shared order context is governed before execution, and product variation moves toward configuration instead of repeated structural redesign.',
  problem: 'Product change had become workflow change, increasing modeling effort, deployment dependency, and regression surface as service combinations grew.',
  decision: 'Move the platform from prescribed paths to declared dependencies, governed context, and configurable policy so execution can assemble from product intent.',
  outcome: 'A reusable orchestration model reduced logic-mapping effort while creating a foundation for broader service variation and substantially higher target scale.',
};
