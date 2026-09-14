import type { Project } from './projects';

type Presentation = {
  group: string;
  tone: string;
  role: string;
  contribution: string;
  problem: string;
  decision: string;
  outcome: string;
  before: string;
  after: string;
  flow: string[];
  proofIndex: number;
  proofNote: string;
  evidence: [string, string][];
};

// Concise editorial summaries. All numeric values come from the project record.
export const projectPresentation: Record<string, Presentation> = {
  "enterprise-order-management": {
    "group": "Platforms",
    "tone": "blue",
    "role": "Product strategy & orchestration",
    "contribution": "I led the shift to dependency-driven execution and a shared order contract across 19+ teams.",
    "problem": "Each new service combination meant more workflow modeling and regression risk.",
    "decision": "Let capabilities declare dependencies so the platform assembles the execution path.",
    "outcome": "Faster logic mapping, with existing service behavior preserved as a migration requirement.",
    "before": "Manually modeled paths",
    "after": "Dependency-driven execution",
    "flow": [
      "Product intent",
      "Dependency graph",
      "Readiness gate",
      "Fulfillment"
    ],
    "proofIndex": 0,
    "proofNote": "Proof-of-concept comparison",
    "evidence": [
      [
        "Measured",
        "Faster logic mapping"
      ],
      [
        "Projected",
        "Target order capacity"
      ],
      [
        "Actual scope",
        "Teams coordinated"
      ],
      [
        "Actual scope",
        "Service intents"
      ]
    ]
  },
  "rag-analysis-agent": {
    "group": "AI",
    "tone": "violet",
    "role": "Builder · product & engineering",
    "contribution": "I built the analysis agent and made citations, permission-aware retrieval, and evaluation gates central to the product.",
    "problem": "Investigations took days of searching fragmented engineering knowledge.",
    "decision": "Ground answers in current source evidence and abstain when that evidence is insufficient.",
    "outcome": "Shorter investigations with traceable answers and a repeatable evaluation process.",
    "before": "Manual investigation",
    "after": "Grounded analysis",
    "flow": [
      "Engineering sources",
      "Permission-aware retrieval",
      "Grounding gate",
      "Cited answer"
    ],
    "proofIndex": 0,
    "proofNote": "Historical investigations compared with pilot use",
    "evidence": [
      [
        "Measured",
        "Analysis cycle"
      ],
      [
        "Observed",
        "Knowledge corpus"
      ],
      [
        "Observed",
        "Projects searchable"
      ],
      [
        "Evaluation set",
        "Groundedness / recall"
      ]
    ]
  },
  "build-plus": {
    "group": "Operations",
    "tone": "teal",
    "role": "Product ownership · supply chain",
    "contribution": "I established the part-data foundation and sequenced planning, fulfillment, and asset recovery around it.",
    "problem": "Part data, demand, shipments, and asset recovery lived in disconnected workflows.",
    "decision": "Give every process a governed part identity before automating the lifecycle.",
    "outcome": "Connected planning and fulfillment, with custody tracked through recovery or retirement.",
    "before": "Disconnected workflows",
    "after": "One asset lifecycle",
    "flow": [
      "Part identity",
      "Demand planning",
      "Validated fulfillment",
      "Recovery"
    ],
    "proofIndex": 1,
    "proofNote": "Implemented planning capability",
    "evidence": [
      [
        "Measured baseline",
        "MRO in spreadsheets before"
      ],
      [
        "Implemented",
        "Rolling demand horizon"
      ],
      [
        "Projected",
        "Program hours returned / year"
      ],
      [
        "Actual scope",
        "Manual handoffs addressed"
      ]
    ]
  },
  "rfds": {
    "group": "Operations",
    "tone": "cyan",
    "role": "Product ownership · engineering automation",
    "contribution": "I turned engineering judgment into testable rules, with source validation and a controlled path for urgent designs.",
    "problem": "Manual drafting allowed stale equipment data and design-to-field mismatches.",
    "decision": "Make the design document an output of validated engineering data and rules.",
    "outcome": "Design generation dropped from hours to seconds; field exceptions fell below 5%.",
    "before": "Manual drafting",
    "after": "Validated design generation",
    "flow": [
      "Site & equipment data",
      "Engineering rules",
      "Validation",
      "Design & diagrams"
    ],
    "proofIndex": 1,
    "proofNote": "Observed workflow and system logs",
    "evidence": [
      [
        "Measured",
        "Annual cost avoidance"
      ],
      [
        "Measured",
        "Design generation time"
      ],
      [
        "Measured",
        "Design-to-field exception rate"
      ],
      [
        "Observed",
        "Designs per month"
      ]
    ]
  },
  "gl-coding": {
    "group": "Finance",
    "tone": "amber",
    "role": "Product ownership · financial systems",
    "contribution": "I backed a four-month redesign and aligned project identity across operations, warehouse, and ERP.",
    "problem": "Every new portfolio risked another engineering change to hard-coded accounting logic.",
    "decision": "Move accounting policy into governed configuration and validate financial codes before posting.",
    "outcome": "Faster month-end close and a reusable routing model adopted across 4+ portfolios.",
    "before": "Policy embedded in code",
    "after": "Configurable financial routing",
    "flow": [
      "Project identity",
      "Policy lookup",
      "Code validation",
      "ERP posting"
    ],
    "proofIndex": 0,
    "proofNote": "Post-implementation scenario analysis",
    "evidence": [
      [
        "Measured",
        "Faster month-end close"
      ],
      [
        "Observed",
        "Portfolio adoption"
      ],
      [
        "Actual scope",
        "Enterprise systems aligned"
      ],
      [
        "Estimated",
        "Supported-scenario enablement"
      ]
    ]
  },
  "lease-vendor-management": {
    "group": "Finance",
    "tone": "rose",
    "role": "Product ownership · lease-to-pay",
    "contribution": "I defined payment eligibility controls and replaced the three-address vendor limit with a scalable model.",
    "problem": "Fragmented lease data and vendor restrictions created recurring payment workarounds.",
    "decision": "Check vendor, address, and financial identifiers before a payment reaches Finance.",
    "outcome": "A governed lease-to-pay process with scalable vendor addresses and upstream payment controls.",
    "before": "Payment workarounds",
    "after": "Eligibility-gated payments",
    "flow": [
      "Lease obligation",
      "Vendor eligibility",
      "Payment approval",
      "Reconciliation"
    ],
    "proofIndex": 0,
    "proofNote": "Recurring financial scale governed",
    "evidence": [
      [
        "Actual scale",
        "Monthly rent roll governed"
      ],
      [
        "Implemented",
        "Vendor address model"
      ],
      [
        "Estimated",
        "Business-case ROI"
      ],
      [
        "Actual scope",
        "Stories delivered"
      ]
    ]
  }
};

export const publicText = (text: string) => text
  .replace(/Hansen/gi, 'catalog configuration')
  .replace(/Camunda/gi, 'legacy workflow engine')
  .replace(/Change Bucket/gi, 'service-change')
  .replace(/VendorOne/gi, 'vendor-management platform')
  .replace(/NexsysOne/gi, 'operations platform')
  .replace(/GitLab/gi, 'engineering repositories')
  .replace(/Jira/gi, 'work management')
  .replace(/Confluence/gi, 'knowledge base')
  .replace(/Claude via Bedrock/gi, 'private LLM runtime')
  .replace(/AWS Bedrock/gi, 'private model runtime')
  .replace(/Bedrock/gi, 'private model runtime')
  .replace(/Oracle Finance/gi, 'ERP finance')
  .replace(/Oracle IDs/gi, 'ERP identifiers')
  .replace(/Oracle/gi, 'ERP')
  .replace(/\bN1\b/g, 'operations platform')
  .replace(/\bQDS\b/g, 'engineering system')
  .replace(/\bMCP\b/g, 'live connectors')
  .replace(/FastAPI/gi, 'service API')
  .replace(/\bOMS\b/g, 'order-management platform')
  .replace(/\bWMS\b/g, 'warehouse platform')
  .replace(/\bFSLs\b/g, 'field stocking locations')
  .replace(/\bIHS\b/g, 'in-house service teams')
  .replace(/\bGCs\b/g, 'field partners')
  .replace(/\bHubs\b/g, 'distribution hubs');

export function getEvidence(project: Project) {
  const presentation = projectPresentation[project.slug]!;
  return project.metrics.map((metric, index) => ({
    ...metric,
    type: presentation.evidence[index]?.[0] ?? 'Evidence',
    label: presentation.evidence[index]?.[1] ?? publicText(metric.label),
    detail: publicText(metric.detail),
  }));
}
