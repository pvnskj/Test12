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
    slug: 'enterprise-order-management',
    title: 'Enterprise Order Management',
    category: 'Telecom order orchestration · Platform modernization',
    eyebrow: 'Declarative orchestration',
    question: 'What happens when every new product change requires developers to redraw the fulfillment engine?',
    headline: 'Replacing rigid BPMN flows with declarative, dependency-driven order orchestration.',
    summary:
      'The legacy order platform encoded fulfillment paths as Camunda BPMN and XML. As plans, services, and dependencies expanded, every change accumulated more gateways, diagrams, deployment work, and regression risk. I led the product strategy for a new orchestration model where workers declare dependencies, shared order context is governed explicitly, and the engine assembles the executable fulfillment graph.',
    productGoal:
      'Create an order-orchestration platform that can launch and change subscriber services without manually remodeling every fulfillment path, while preserving deterministic execution, shared context, and operational visibility.',
    problem:
      'Static BPMN worked when fulfillment paths were limited and predictable. At scale, hundreds of rigid models became a change bottleneck: parallel execution had to be drawn manually, product changes triggered model deployments, and fragmented state across workers increased the risk of incomplete enrichment or logic gaps.',
    complexity: [
      'Legacy Camunda BPMN orchestration with manually modeled parallel gateways and XML deployments',
      'Hansen commercial-offer decomposition into technical resource specifications',
      'Kafka-based worker coordination and dependency-driven execution',
      'Phase 1 assessment / enrichment separated from Phase 2 execution',
      'Canonical order context shared across catalog, validation, enrichment, and provisioning',
      '19+ delivery teams and 18 dynamic service intents that had to retain existing business behavior',
    ],
    ownership: [
      'Own the product direction from imperative BPMN modeling toward declarative, dependency-aware orchestration',
      'Lead UC1 Change Bucket functionality and define how plan modifications and add-ons decompose through the catalog',
      'Introduce the two-phase evaluation model so execution cannot consume partially enriched order state',
      'Standardize the canonical orderContext contract across workers and fulfillment stages',
      'Coordinate cross-team migration of existing intents while separating implemented capability from target-scale projections',
    ],
    decisions: [
      {
        title: 'Replace static flows with dependency-driven execution',
        body:
          'Workers declare what they require and what they can execute. The orchestration engine resolves those dependencies into a directed execution graph, so parallelism follows the topology instead of being redrawn as BPMN gateways for every product variation.',
      },
      {
        title: 'Separate assessment from execution',
        body:
          'Phase 1 resolves catalog decomposition, identifiers, configuration, and enrichment before Phase 2 begins fulfillment. The phase boundary prevents downstream execution from consuming incomplete technical state and creates a deterministic synchronization point.',
      },
      {
        title: 'Standardize shared order context',
        body:
          'A canonical, version-controlled orderContext travels through the lifecycle so workers contribute controlled enrichment without creating divergent representations or repeatedly reconstructing the order from source systems.',
      },
      {
        title: 'Move orchestration policy toward configuration',
        body:
          'JSON/AppConfig and worker metadata replace an increasing portion of XML/model deployment. The architecture keeps core execution stable while product and policy behavior can evolve with less structural rework.',
      },
    ],
    flow: ['Business intent', 'Hansen decomposition', 'Worker proposals', 'Dependency graph', 'Assessment & enrichment', 'Phase gate', 'Kafka execution', 'Provisioning'],
    flowCaption:
      'The architectural shift is from telling the engine exactly how to traverse a diagram to declaring capabilities, dependencies, and intent so the executable topology can be assembled consistently.',
    increments: [
      {
        title: 'Prove the orchestration model',
        focus: 'Camunda comparison, worker registration, dependency graph, parallel execution',
        learning: 'Can dependency declarations replace manually modeled gateways without losing deterministic behavior?',
      },
      {
        title: 'Change Bucket / catalog decomposition',
        focus: 'Commercial offers, resource specifications, plan modifications, add-ons',
        learning: 'Can high-level customer intent become the right technical work without embedding every path in BPMN?',
      },
      {
        title: 'Governed order context',
        focus: 'Assessment, enrichment, common data contract, phase synchronization',
        learning: 'Can parallel workers share enriched state without data loss or premature execution?',
      },
      {
        title: 'Scale & observability',
        focus: 'Kafka push model, live DAG rendering, configuration-driven policy, throughput modeling',
        learning: 'Can the platform remain observable and adaptable as order volume and service combinations increase?',
      },
    ],
    valueNarrative:
      'The transformation reduces the effort required to model changing fulfillment logic and creates a platform designed for substantially higher order volume. The current evidence includes a measured 20% improvement in logic-mapping time; the 75K-orders/day figure remains a projected capacity target based on the Kafka push architecture, not a claimed production throughput result.',
    metrics: [
      { value: '20%', label: 'Measured mapping-time improvement', detail: 'POC comparison of dependency-driven self-assembly versus manual BPMN modeling.' },
      { value: '75K/day', label: 'Projected order capacity', detail: 'Modeled target for the Kafka push architecture; not presented as achieved production throughput.' },
      { value: '19+', label: 'Teams coordinated', detail: 'Actual cross-team delivery complexity for migration and intent mapping.' },
      { value: '18', label: 'Service intents in scope', detail: 'Actual legacy intent scope to preserve during orchestration migration.' },
    ],
    featured: true,
    visual: 'fulfillment',
  },
  {
    index: '02',
    slug: 'rag-analysis-agent',
    title: 'Enterprise RAG Analysis Agent',
    category: 'Enterprise AI · Grounded technical intelligence',
    eyebrow: 'Production RAG platform',
    question: 'How do you turn an 11GB engineering haystack into evidence a production team can trust?',
    headline: 'Converting fragmented engineering knowledge into grounded, line-level operational intelligence.',
    summary:
      'Order Management troubleshooting depended on manual string searches across code, Jira, Confluence, logs, catalog imports, and technical design artifacts. The real problem was not finding documents; it was reconstructing functional relationships among identifiers, configuration, code, and deployed behavior without losing source evidence or version context.',
    productGoal:
      'Reduce technical investigation time by giving developers and analysts a permission-aware analysis agent that retrieves current engineering evidence, cites every material claim, and abstains when the available sources cannot support an answer.',
    problem:
      'Complex failures could require days of cross-repository analysis. A single issue might involve a toggle, catalog decomposition, a missing GUID, environment configuration, code behavior, and documentation that no longer matched the deployed state. A generic chatbot would have increased risk if it generated plausible but ungrounded explanations.',
    complexity: [
      '11GB+ heterogeneous corpus spanning 558+ GitLab projects, Jira, Confluence, transcripts, design documents, and 260MB+ Hansen XML imports',
      'Hybrid retrieval across conceptual meaning, project metadata, branch/version context, and technical identifiers',
      '512–1,024 token retrieval chunks with 10–15% overlap and file-type-aware processing',
      'MCP-based live access using user credential pass-through rather than a privileged agent identity',
      'Version-aware indexing with webhook-driven stale marking and refresh',
      'Grounding verification, citation traceability, golden-dataset regression gates, and private Bedrock connectivity',
    ],
    ownership: [
      'Reframe the product from a conversational chatbot into a grounded technical-analysis agent',
      'Define the grounding gate and the requirement to abstain when evidence is insufficient',
      'Establish the golden-dataset CI gate for retrieval and answer-quality regression testing',
      'Prioritize MCP integrations with engineering systems ahead of broader UI enhancements so answers reflect deployed reality',
      'Lead the progression from a local Python proof of concept to FastAPI and AWS Bedrock production architecture',
    ],
    decisions: [
      {
        title: 'Choose accuracy over conversational speed',
        body:
          'Reranking and a secondary grounding verification step add latency, but production troubleshooting requires evidence that can be acted on. The system is designed to return a slower, cited answer—or explicitly abstain—rather than produce a fast unsupported explanation.',
      },
      {
        title: 'Use live enterprise context instead of static uploads',
        body:
          'MCP integrations with GitLab and Jira allow the agent to work against current authorized engineering state. That decision made source freshness and user permissions part of the product architecture rather than a manual maintenance task.',
      },
      {
        title: 'Make evaluation a release gate',
        body:
          'Changes to retrieval, chunking, or prompting must pass a golden set of 25+ historical failures with 100% groundedness and at least 90% recall before promotion. AI quality is treated as a regression-tested product contract.',
      },
      {
        title: 'Protect retrieval during index refresh',
        body:
          'Large indexing cycles are built away from active reads and swapped safely when ready, preventing concurrent analysts from querying a partially refreshed vector index.',
      },
    ],
    flow: ['GitLab / Jira / Confluence', 'Parse & version', 'Hybrid retrieval', 'Metadata filter', 'Rerank', 'Claude via Bedrock', 'Grounding gate', 'Cited answer'],
    flowCaption:
      'The answer is only the final layer. The product value comes from live source access, version-aware retrieval, evidence verification, and an explicit refusal path when grounding is insufficient.',
    increments: [
      {
        title: 'POC',
        focus: 'Large Hansen-file parsing, Bedrock feasibility, local retrieval',
        learning: 'Can the platform reason over the technical artifacts that defeat manual search?',
      },
      {
        title: 'Pilot',
        focus: 'Change Bucket use case, five analysts, citations, grounding behavior',
        learning: 'Do grounded answers reduce investigation time without sacrificing analyst trust?',
      },
      {
        title: 'Production integration',
        focus: 'MCP, token pass-through, webhook freshness, FastAPI async execution',
        learning: 'Can the agent stay current, permission-aware, and responsive under concurrent use?',
      },
      {
        title: 'Evaluation & improvement loop',
        focus: 'Golden failures, ungrounded-query review, chunking refinement, source-gap discovery',
        learning: 'Can every failure improve both the retrieval system and the underlying knowledge ecosystem?',
      },
    ],
    valueNarrative:
      'The measured end-to-end result was a reduction in complex technical investigation from roughly six days to about two hours. Individual retrieval steps can complete much faster—for example, a missing GUID in a large Hansen import was located and cited in 42 seconds—but those examples are kept separate from the full investigation-cycle metric.',
    metrics: [
      { value: '~6 days → ~2 hrs', label: 'Measured analysis cycle', detail: 'End-to-end technical investigation comparison from historical OM troubleshooting and pilot use.' },
      { value: '11GB+', label: 'Production knowledge corpus', detail: 'Observed structured and unstructured engineering data indexed for analysis.' },
      { value: '558+', label: 'OM projects searchable', detail: 'Observed cross-project impact-analysis scope.' },
      { value: '100% / 90%+', label: 'Golden-set groundedness / recall', detail: 'Measured on the 25+ case evaluation suite; not a claim of universal model accuracy.' },
    ],
    featured: true,
    visual: 'forecast',
  },
  {
    index: '03',
    slug: 'build-plus',
    title: 'Build Plus',
    category: 'Supply chain · Asset & material transformation',
    eyebrow: 'Enterprise operating platform',
    question: 'How do you connect trusted part data, predictive demand, fulfillment, custody, and recovery into one operating model?',
    headline: 'Building a cradle-to-grave asset and supply-chain ecosystem.',
    summary:
      'The national rollout operated across fragmented master data, spreadsheet-driven demand, manual MRO fulfillment, disconnected inventory systems, and reverse-logistics handoffs. Build Plus consolidated those problems into one product program spanning Item Master governance, predictive planning, omnichannel fulfillment, serialization, and asset recovery.',
    productGoal:
      'Create a governed supply-chain operating model from part definition through demand, order, shipment, deployment, return, and financial disposition while reducing manual data carrying and protecting configuration integrity.',
    problem:
      'More than half of MRO fulfillment depended on spreadsheets, part data moved manually between systems, demand was reactive, and no single workflow preserved asset identity through forward and reverse logistics. Automating any one screen would have left the underlying data and custody gaps intact.',
    complexity: [
      'Governed Item Master across N1, Oracle, Scale, QDS, and legacy/manual data sources',
      'Taxonomy and part codification separating capitalized wireless assets from consumables',
      '18-month rolling demand planning using consumption data and regression analytics',
      'Omnichannel fulfillment across Hubs, FSLs, IHS, GCs, inventory availability, and engineering BOMs',
      'Mandatory BOM/configuration validation before shipment',
      'Serialization and reverse-logistics workflow replacing manual handoffs across 19 teams',
      '300+ requirements coordinated across planning, fulfillment, and finance systems',
    ],
    ownership: [
      'Architect the governed Item Master and taxonomy foundation before scaling downstream automation',
      'Prioritize high-benefit / lower-effort integrations using the Build Plus LOB and LOE framework',
      'Drive the shift from reactive purchasing to an 18-month demand signal tied to rollout needs',
      'Design the OMS fulfillment experience and BOM validation gate across distributed inventory nodes',
      'Establish reverse-logistics RACI, serialization, fault reporting, and lifecycle governance',
    ],
    decisions: [
      {
        title: 'Establish the data anchor first',
        body:
          'Part taxonomy, codification, mandatory attributes, and system synchronization create the trusted identity needed by planning, fulfillment, finance, and lifecycle controls. Downstream automation was deliberately sequenced after the foundation could be trusted.',
      },
      {
        title: 'Generate demand from evidence, not spreadsheets',
        body:
          'The planning model uses consumption and rollout signals across an 18-month horizon so procurement can move from buy-just-in-case behavior toward demand-aligned purchasing.',
      },
      {
        title: 'Validate before fulfillment',
        body:
          'The BOM validation gate checks configuration integrity and inventory conditions before shipment. Errors are prevented upstream instead of discovered through post-shipment audits or field rework.',
      },
      {
        title: 'Preserve identity through the full lifecycle',
        body:
          'Serialization connects receipt, custody, deployment, return, fault handling, and disposition so operational movement remains traceable without losing the associated financial history.',
      },
    ],
    flow: ['Item Master', '18-month demand plan', 'Procurement', 'BOM / order', 'Validation gate', 'Fulfillment', 'Serialized custody', 'Return / disposition'],
    flowCaption:
      'Build Plus treats master data, planning, fulfillment, and reverse logistics as one lifecycle: trusted identity becomes the common key that lets each downstream decision remain coherent.',
    increments: [
      {
        title: 'Master data foundation',
        focus: 'IMD, taxonomy, codification, governance, Oracle/N1 synchronization',
        learning: 'Can every downstream process start from the same governed definition of a part?',
      },
      {
        title: 'Predictive planning',
        focus: 'Consumption signals, regression analytics, 18-month rolling forecast',
        learning: 'Can procurement respond to projected need instead of manually inferred demand?',
      },
      {
        title: 'Systemized fulfillment',
        focus: 'OMS, BOM validation, inventory visibility, routing across fulfillment nodes',
        learning: 'Can an engineering requirement become a validated shipment without spreadsheet orchestration?',
      },
      {
        title: 'Lifecycle closure',
        focus: 'Serialization, fault reporting, reverse logistics, financial disposition',
        learning: 'Can the organization prove custody and state from first receipt through recovery or retirement?',
      },
    ],
    valueNarrative:
      'Build Plus replaces fragmented manual operations with a governed data and workflow backbone. The 10,040-hour figure is retained as a program-level projected annual benefit under LOB Level 7 rather than being double-counted across individual initiatives.',
    metrics: [
      { value: '50%+', label: 'MRO previously spreadsheet-managed', detail: 'Measured baseline for the targeted fulfillment processes before systemization.' },
      { value: '18 mo', label: 'Rolling demand horizon', detail: 'Implemented planning capability using consumption and regression-based forecasting.' },
      { value: '10,040', label: 'Projected hours returned / year', detail: 'Build Plus program-level LOB Level 7 benefit across HQ, HUB, and Field operations.' },
      { value: '19', label: 'Manual handoffs addressed', detail: 'Measured reverse-logistics operating complexity moved into governed workflow.' },
    ],
    featured: true,
    visual: 'inventory',
  },
  {
    index: '04',
    slug: 'rfds',
    title: 'RFDS Automation',
    category: 'Telecommunications · Engineering automation',
    eyebrow: 'Engineering data product',
    question: 'What changes when an engineering document becomes the output of a governed data system instead of the system itself?',
    headline: 'Transforming RF design from static documents into governed engineering data and rules.',
    summary:
      'RFDS creation depended on spreadsheets, macros, manual drafting, and distributed engineering knowledge. I reframed the problem from generating documents faster to building a governed data-and-rules product that validates source data, applies repeatable engineering decisions, generates diagrams automatically, and keeps approved design context aligned with downstream execution.',
    productGoal:
      'Turn approved RF planning and equipment data into a validated, traceable, field-ready design in seconds while allowing engineering policy to evolve through governed configuration.',
    problem:
      'As the national footprint expanded, manual drafting created version drift, stale configurations, equipment mismatches, and rework. The scalable answer was not a faster spreadsheet; it was a rules-based engineering platform in which the RFDS PDF became one generated output of trusted underlying data.',
    complexity: [
      'RF planning and procurement catalog data arriving from separate systems',
      'Site types, Alpha/Beta/Gamma sectors, frequency bands, radios, antennas, OVPs, placement, and cable-length rules',
      'Dynamic plumbing, network, and OVP diagram selection',
      'Scheduled synchronization plus a governed immediate/manual path for urgent work',
      'Validation gates that block generation when critical source values do not match',
      'Existing inventory fulfillment aligned to the approved RFDS configuration',
    ],
    ownership: [
      'Move the product model from document creation to governed engineering data',
      'Translate engineering judgment into explicit, testable rules and metadata',
      'Prioritize strict source validation even when it added friction to user entry',
      'Preserve a controlled urgent path using approved equipment and validated inputs',
      'Connect approved design context to downstream operational execution without overstating unsupported system claims',
    ],
    decisions: [
      {
        title: 'Model engineering knowledge as data and rules',
        body:
          'The platform centralizes site, sector, equipment, and technical attributes and applies configuration-driven logic so the same engineering decision can be executed consistently across the national portfolio.',
      },
      {
        title: 'Validate at the source',
        body:
          'Required fields, approved equipment, and cross-source checks prevent invalid configurations from being released. Data integrity is treated as an upstream product control rather than a downstream audit activity.',
      },
      {
        title: 'Govern flexibility instead of allowing free-form entry',
        body:
          'Strict lookups and validation reduced user freedom, but that tradeoff was necessary to keep designs consistent at rollout scale. A controlled manual path preserved speed for legitimate urgent work.',
      },
      {
        title: 'Keep fulfillment aligned with approved design',
        body:
          'For existing inventory, shipped parts are validated against the approved RFDS configuration so warehouse fulfillment remains aligned with engineering intent.',
      },
    ],
    flow: ['RF planning', 'Procurement catalog', 'Governed site model', 'Engineering rules', 'Validation gate', 'RFDS + diagrams', 'Approved configuration', 'Field / inventory execution'],
    flowCaption:
      'The RFDS is an output. The durable product is the governed engineering-data pipeline that makes every generated design repeatable, auditable, and operationally usable.',
    increments: [
      {
        title: 'Trusted source model',
        focus: 'RF planning, procurement attributes, site and sector data',
        learning: 'Can the product establish one dependable input model before automating design decisions?',
      },
      {
        title: 'Rules & governance',
        focus: 'Equipment mapping, placement, frequency, cable logic, approved-part controls',
        learning: 'Can expert decisions be encoded without creating silent configuration risk?',
      },
      {
        title: 'Automated design output',
        focus: 'RFDS generation, dynamic diagrams, SOW/comments, version history',
        learning: 'Does automation remove drafting effort while keeping design evidence visible?',
      },
      {
        title: 'Operational alignment',
        focus: 'Approved configuration, inventory alignment, downstream execution',
        learning: 'Can the approved design remain intact as it moves from engineering into physical fulfillment?',
      },
    ],
    valueNarrative:
      'The measured production story is materially stronger than the older approval-only metric: generation dropped from hours to seconds, design-to-field exceptions fell sharply, and the platform supported more than 1,000 designs per month while avoiding substantial annual labor cost.',
    metrics: [
      { value: '$1.2M', label: 'Measured annual cost avoidance', detail: 'Labor avoided at production rollout volume through automated RFDS generation.' },
      { value: '2–4 hrs → <30 sec', label: 'Measured generation time', detail: 'Observed from the automated generation workflow and system logs.' },
      { value: '35–45% → <5%', label: 'Measured exception rate', detail: 'Reduction in rework tied to design-to-field mismatches.' },
      { value: '1,000+', label: 'Designs per month', detail: 'Observed operating scale.' },
    ],
    featured: true,
    visual: 'network',
  },
  {
    index: '05',
    slug: 'gl-coding',
    title: 'Dynamic GL Coding',
    category: 'Financial operations · Configurable policy',
    eyebrow: 'Financial routing platform',
    question: 'What happens when business policy changes faster than the software encoding it?',
    headline: 'Turning hard-coded accounting logic into a reusable, configurable financial-routing capability.',
    summary:
      'A financial-routing model designed for a narrow business context became a constraint as new portfolios and operating models emerged. I led the shift from project-specific conditional logic to a metadata-driven product that preserves a common project identity across operations, warehouse, and ERP systems and validates treatment before posting.',
    productGoal:
      'Let approved accounting policy evolve through governed configuration while keeping application architecture stable, preserving auditability, and reducing engineering dependency for new portfolio onboarding.',
    problem:
      'New project types could trigger months of engineering change, financial context was represented inconsistently across enterprise systems, and manual interpretation increased reconciliation risk. Extending the existing hard-coded model for each initiative would have delivered short-term speed while compounding technical debt.',
    complexity: [
      'Different project and activity types requiring different CapEx / OpEx treatment',
      'Common project identity carried across operations, supply chain / WMS, and ERP',
      'Metadata-driven lookup and multi-component GL assembly',
      'Validation and exception handling before ledger posting',
      'Financial review, reason codes, lineage, and audit evidence',
      'Balancing a four-month foundational redesign against faster project-specific extensions',
    ],
    ownership: [
      'Own the target capability and translate accounting and operational policy into product requirements',
      'Advocate for the foundational redesign instead of another project-specific branch of conditional logic',
      'Establish the common project identity that preserves financial context across system handoffs',
      'Sequence delivery around identity, policy configuration, routing/validation, and reconciliation',
      'Validate outcomes with controllership and keep measured, estimated, and projected benefits explicitly separated',
    ],
    decisions: [
      {
        title: 'Decouple policy from code',
        body:
          'Financial mappings move into governed metadata and lookup structures. Approved policy changes can be configured and validated without turning every adjustment into an application release.',
      },
      {
        title: 'Establish a common project identity',
        body:
          'A shared project identifier links operational activity to financial treatment as transactions move through operations, warehouse processes, and ERP, preventing context from being reinterpreted at every boundary.',
      },
      {
        title: 'Validate before posting',
        body:
          'Incomplete or invalid combinations are stopped or routed for correction before reaching the ledger. The product moves error detection upstream instead of relying on month-end reconciliation.',
      },
      {
        title: 'Invest in scalability over the next quick fix',
        body:
          'The four-month redesign required more initial investment, but it changed future portfolio onboarding from structural development to controlled configuration for supported scenarios.',
      },
    ],
    flow: ['Business / project context', 'Common project ID', 'Configurable policy', 'Financial-code assembly', 'Validation', 'WMS / operational handoff', 'ERP posting', 'Audit evidence'],
    flowCaption:
      'The product principle is stable application architecture with financial policy evolving through controlled configuration and a shared identity carried across systems.',
    increments: [
      {
        title: 'Common identity',
        focus: 'Project identifier, context propagation, system ownership',
        learning: 'Can every participating system describe the same business activity consistently?',
      },
      {
        title: 'Policy configuration',
        focus: 'Lookup structures, GL components, mapping rules',
        learning: 'Can finance evolve supported policy without a code release for every change?',
      },
      {
        title: 'Routing & validation',
        focus: 'Code assembly, source validation, exception handling',
        learning: 'Can the product prevent incorrect treatment before it reaches the ledger?',
      },
      {
        title: 'Reconciliation & evidence',
        focus: 'Cross-system consistency, posting, approvers, reason codes, lineage',
        learning: 'Can every result be traced to the business context and policy that produced it?',
      },
    ],
    valueNarrative:
      'Post-implementation scenario analysis and reduced controllership back-and-forth support a measured 40% faster month-end close. The redesigned model also supported 4+ strategic portfolios; the 2–3 months to under one week onboarding comparison remains an estimate for supported scenarios rather than a production SLA.',
    metrics: [
      { value: '40%', label: 'Measured faster month-end close', detail: 'Validated through post-implementation scenario analysis and reduced reconciliation effort.' },
      { value: '4+', label: 'Observed portfolio adoption', detail: 'Strategic portfolio types onboarded on the redesigned model.' },
      { value: '3', label: 'Enterprise systems aligned', detail: 'Operations, warehouse / supply chain, and ERP share consistent project context.' },
      { value: '2–3 mo → <1 wk', label: 'Estimated enablement comparison', detail: 'Supported-scenario estimate; not presented as a production SLA.' },
    ],
    featured: true,
    visual: 'ledger',
  },
  {
    index: '06',
    slug: 'lease-vendor-management',
    title: 'Lease & Vendor Management',
    category: 'Real estate operations · Financial controls',
    eyebrow: 'Governed lease-to-pay',
    question: 'How do you turn recurring lease obligations into a controlled financial workflow instead of a spreadsheet liability?',
    headline: 'Building an enterprise lease-to-pay platform with vendor eligibility and financial controls at the source.',
    summary:
      'Thousands of site leases were managed through fragmented real-estate data, manual payment workarounds, and vendor constraints that could surface only when Finance attempted to pay. I led the ground-up Lease Management Module and VendorOne integration so lease lifecycle state, vendor eligibility, rent addresses, Oracle identifiers, GL treatment, and payment evidence could operate as one governed process.',
    productGoal:
      'Govern lease obligations from execution through payment and closeout while preventing invalid vendor/payment combinations from reaching Finance and removing structural constraints that forced manual workarounds.',
    problem:
      'The legacy vendor model supported only three active rent addresses per vendor, lease data was fragmented, and payment requests could reach Finance with inactive vendors or missing Oracle identifiers. At a $23.7M monthly rent-roll scale, those gaps represented recurring operational, financial, and compliance risk.',
    complexity: [
      'Ground-up lease lifecycle from site selection and executed agreement through commencement, payment, and closeout reconciliation',
      'VendorOne integration and scalable multi-address landlord model',
      'Vendor active status, rent-address eligibility, Oracle IDs, and site-code validation',
      'GL coding and Construction in Progress correction within lease/payment workflows',
      'NexsysOne, Oracle Finance, and RF/site context integration',
      'SOX-oriented controls, seven-year retention, and roughly 150 delivered stories of scope',
    ],
    ownership: [
      'Define the lease-to-pay lifecycle as a financial-control product rather than a real-estate database',
      'Design the vendor/payment eligibility gate before payment approval',
      'Remove the hard-coded three-address vendor limit instead of extending manual workarounds',
      'Connect VendorOne data dynamically into Lease Management payment generation',
      'Integrate GL/CIP treatment and lifecycle visibility while balancing governance against user speed',
    ],
    decisions: [
      {
        title: 'Validate payment eligibility at the source',
        body:
          'Vendor status, eligible rent address, required Oracle identifiers, and related payment prerequisites are checked before approval so invalid combinations are stopped upstream instead of becoming Finance rework.',
      },
      {
        title: 'Remove the structural address limit',
        body:
          'The product replaced the three-active-address constraint with a scalable multi-address model and exposed those addresses directly in Lease Management, eliminating the system limitation that drove landlord payment workarounds.',
      },
      {
        title: 'Treat lease data as financial-control data',
        body:
          'Lease milestones, payment schedules, vendor state, GL treatment, CIP corrections, and audit history are governed together because recurring rent is a financial obligation, not merely a document-tracking problem.',
      },
      {
        title: 'Choose control over one-click speed',
        body:
          'Active-status and identifier validation added friction to submission, but the tradeoff was deliberate: prevent invalid payment instructions before they enter the ERP path.',
      },
    ],
    flow: ['Lease execution', 'Lifecycle milestones', 'VendorOne', 'Eligibility gate', 'Payment schedule', 'GL / CIP treatment', 'Oracle execution', 'Reconciliation & evidence'],
    flowCaption:
      'The product moves error detection from downstream Finance review to the moment lease and vendor data become eligible for payment.',
    increments: [
      {
        title: 'Lease lifecycle foundation',
        focus: 'Site selection, execution, commencement, schedules, stage visibility',
        learning: 'Can every recurring obligation be represented with a clear lifecycle and accountable state?',
      },
      {
        title: 'Vendor scalability',
        focus: 'VendorOne, unlimited rent addresses, dynamic address selection',
        learning: 'Can the platform support real landlord structures without manual payment workarounds?',
      },
      {
        title: 'Payment controls',
        focus: 'Active status, Oracle identifiers, eligibility validation, approval gating',
        learning: 'Can invalid payment instructions be prevented before Finance receives them?',
      },
      {
        title: 'Financial integrity',
        focus: 'GL coding, CIP corrections, ERP execution, retention and audit evidence',
        learning: 'Can lease administration operate as a traceable financial-control system at rent-roll scale?',
      },
    ],
    valueNarrative:
      'The strongest evidence is operating scale and implemented controls: the product governs a $23.7M monthly rent roll and removes the vendor-address constraint that created manual workarounds. The approximately 2x ROI remains an estimated business-case result because the operational return is estimated, even where delivery investment is known.',
    metrics: [
      { value: '$23.7M/mo', label: 'Actual rent roll governed', detail: 'Actual recurring financial scale managed through the lease process.' },
      { value: '3 → scalable', label: 'Rent-address model', detail: 'Implemented removal of the hard-coded three-active-address vendor constraint.' },
      { value: '~2x', label: 'Estimated ROI', detail: 'Based on approximately $1.26M investment and an estimated $2.5M operational return.' },
      { value: '~150', label: 'Stories delivered', detail: 'Actual delivery scope across lease, vendor, integration, and financial-control capabilities.' },
    ],
    featured: true,
    visual: 'catalog',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
