import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import useScrollReveal from "../hooks/useScrollReveal";

const databasePages = {
  mysql: {
    label: "MySQL",
    accent: "#45a7e8",
    eyebrow: "Relational data, engineered clearly",
    title: "Reliable data foundations for products that keep growing.",
    copy: "We design MySQL systems around clean relationships, predictable performance, and operational simplicity from the first schema to high volume production workloads.",
    tags: [
      "Relational modeling",
      "Transactions",
      "Query tuning",
      "Replication",
    ],
    metric: "99.99%",
    metricLabel: "availability target",
    cards: [
      [
        "Schema architecture",
        "Normalized models and intentional constraints keep business data accurate.",
      ],
      [
        "Query performance",
        "Indexes, execution plans, and workload analysis keep response times predictable.",
      ],
      [
        "Safe evolution",
        "Versioned migrations and rollback plans let the product change without data risk.",
      ],
      [
        "Operational resilience",
        "Backups, replicas, monitoring, and recovery drills protect continuity.",
      ],
    ],
  },
  dynamodb: {
    label: "DynamoDB",
    accent: "#8c79ff",
    eyebrow: "Serverless data at any scale",
    title: "Instant performance without infrastructure drag.",
    copy: "We shape DynamoDB around real access patterns, delivering low latency serverless storage that scales naturally with event driven products and global demand.",
    tags: ["Single-table design", "Global tables", "Streams", "Autoscaling"],
    metric: "<10ms",
    metricLabel: "target latency",
    cards: [
      [
        "Access first modeling",
        "Keys and indexes are designed from product queries, not relational habits.",
      ],
      [
        "Elastic throughput",
        "Capacity modes and partition strategy absorb changing traffic efficiently.",
      ],
      [
        "Event workflows",
        "Streams connect data changes to reliable serverless automation.",
      ],
      [
        "Global delivery",
        "Multi region tables place resilient data close to users.",
      ],
    ],
  },
  postgresql: {
    label: "PostgreSQL",
    accent: "#68a9e8",
    eyebrow: "Advanced open-source data systems",
    title: "Deep data capability with room to evolve.",
    copy: "We use PostgreSQL for products that need trustworthy transactions, powerful querying, rich data types, and an extensible foundation for long term growth.",
    tags: ["Advanced SQL", "JSONB", "PostGIS", "Extensions"],
    metric: "ACID",
    metricLabel: "transaction integrity",
    cards: [
      [
        "Rich data models",
        "Relational structures and JSONB work together without sacrificing integrity.",
      ],
      [
        "Advanced queries",
        "CTEs, window functions, and tuned indexes solve demanding product questions.",
      ],
      [
        "Geospatial systems",
        "PostGIS supports precise, scalable location aware experiences.",
      ],
      [
        "Observability",
        "Query statistics and workload monitoring reveal issues before users feel them.",
      ],
    ],
  },
  oracle: {
    label: "Oracle",
    accent: "#f05252",
    eyebrow: "Enterprise data without compromise",
    title: "Mission critical systems built for continuity.",
    copy: "We engineer Oracle platforms for complex enterprise workloads where governance, availability, performance, and controlled modernization are non-negotiable.",
    tags: ["PL/SQL", "RAC", "Data Guard", "Performance"],
    metric: "24/7",
    metricLabel: "enterprise continuity",
    cards: [
      [
        "Enterprise architecture",
        "Clear schemas and service boundaries support complex organizational workflows.",
      ],
      [
        "High availability",
        "RAC, Data Guard, and tested recovery plans reduce operational exposure.",
      ],
      [
        "Workload tuning",
        "Execution plans, partitioning, and resource controls optimize critical paths.",
      ],
      [
        "Modernization",
        "Phased integration and migration strategies evolve legacy estates safely.",
      ],
    ],
  },
  mongodb: {
    label: "MongoDB",
    accent: "#55d187",
    eyebrow: "Flexible documents, disciplined design",
    title: "Product data that moves at the speed of ideas.",
    copy: "We build MongoDB models that embrace flexible product requirements while preserving validation, performance, and clarity as usage and complexity grow.",
    tags: ["Document modeling", "Aggregation", "Atlas", "Change streams"],
    metric: "âˆž",
    metricLabel: "flexible product models",
    cards: [
      [
        "Document design",
        "Data that changes together is modeled together for efficient product reads.",
      ],
      [
        "Aggregation pipelines",
        "Purposeful pipelines transform and analyze operational data at scale.",
      ],
      [
        "Realtime reactions",
        "Change streams power responsive workflows and downstream events.",
      ],
      [
        "Managed operations",
        "Atlas security, search, backup, and scaling reduce platform overhead.",
      ],
    ],
  },
  redis: {
    label: "Redis",
    accent: "#ff5c5c",
    eyebrow: "Realtime speed, deliberately applied",
    title: "Milliseconds matter when experience feels instant.",
    copy: "We use Redis to accelerate critical journeys, coordinate distributed services, and deliver realtime features without compromising correctness or resilience.",
    tags: ["Caching", "Streams", "Pub/Sub", "Distributed locks"],
    metric: "<1ms",
    metricLabel: "in-memory response",
    cards: [
      [
        "Smart caching",
        "Explicit expiry and invalidation strategies accelerate the right workloads safely.",
      ],
      [
        "Realtime messaging",
        "Streams and Pub/Sub connect live product experiences and services.",
      ],
      [
        "Shared coordination",
        "Rate limits, sessions, queues, and locks support distributed systems.",
      ],
      [
        "Memory efficiency",
        "Data structures, eviction policies, and monitoring keep cost controlled.",
      ],
    ],
  },
};

function DatabasePage({ type }) {
  useScrollReveal();
  const page = databasePages[type];
  return (
    <main
      className={`database-page database-${type}`}
      style={{ "--db-accent": page.accent }}
      id="top"
    >
      <section className="database-hero container">
        <div className="database-copy" data-reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> {page.eyebrow}
          </p>
          <h1>{page.title}</h1>
          <p>{page.copy}</p>
          <div className="hero-actions">
            <Button href="/#contact">Plan your data platform</Button>
            <a className="text-link" href="#database-capabilities">
              Explore capabilities <ArrowRight size={17} />
            </a>
          </div>
          <div className="database-tags">
            {page.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div
          className="database-visual"
          data-reveal
          aria-label={`${page.label} database architecture illustration`}
        >
          <div className="db-topbar">
            <span>
              <i /> DATA SYSTEM / {page.label.toUpperCase()}
            </span>
            <b>HEALTHY</b>
          </div>
          <div className="db-glow" />
          <div className="db-orbit orbit-a">
            <i />
          </div>
          <div className="db-orbit orbit-b">
            <i />
          </div>
          <div className="db-cylinder">
            <span className="db-logo">
              {page.label.slice(0, 2).toUpperCase()}
            </span>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="db-signature" aria-hidden="true">
            {type === "mysql" && (
              <>
                <span className="db-table">
                  <b>customers</b>
                  <i>id Â· primary</i>
                  <i>email Â· unique</i>
                </span>
                <span className="db-relation" />
              </>
            )}
            {type === "dynamodb" && (
              <>
                <span className="db-partition p1">PK</span>
                <span className="db-partition p2">GSI</span>
                <span className="db-partition p3">SK</span>
              </>
            )}
            {type === "postgresql" && (
              <>
                <span className="db-extension">JSONB</span>
                <span className="db-extension">GIS</span>
                <span className="db-extension">SQL</span>
              </>
            )}
            {type === "oracle" && (
              <>
                <span className="db-enterprise-ring r1" />
                <span className="db-enterprise-ring r2" />
                <span className="db-enterprise-core">RAC</span>
              </>
            )}
            {type === "mongodb" && (
              <>
                <span className="db-document d1">{"{ }"}</span>
                <span className="db-document d2">{"{ }"}</span>
                <span className="db-document d3">{"{ }"}</span>
              </>
            )}
            {type === "redis" && (
              <>
                <span className="db-stream">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="db-pulse-label">EVENT STREAM</span>
              </>
            )}
          </div>
          <div className="db-packet packet-a">
            WRITE <b>âœ“</b>
          </div>
          <div className="db-packet packet-b">
            READ <b>12ms</b>
          </div>
          <div className="db-packet packet-c">
            SYNC <b>LIVE</b>
          </div>
          <div className="db-metric">
            <strong>{page.metric}</strong>
            <span>{page.metricLabel}</span>
          </div>
        </div>
      </section>
      <section
        className="database-capabilities"
        id="database-capabilities"
        data-reveal
      >
        <div className="container">
          <div className="database-heading">
            <p className="eyebrow">Built below the surface</p>
            <h2>{page.label} expertise across the complete data lifecycle.</h2>
            <p>
              Architecture, delivery, security, and operations are treated as
              one system so data remains useful, dependable, and ready for
              what comes next.
            </p>
          </div>
          <div className="database-card-grid">
            {page.cards.map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div className="db-card-icon">
                  <i />
                  <i />
                  <i />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="database-principles container" data-reveal>
        <div>
          <p className="eyebrow">Our database standard</p>
          <h2>Fast is useful. Correct and recoverable is essential.</h2>
        </div>
        <div className="database-checks">
          <span>
            <b>01</b>
            <strong>Secure by design</strong>
            <small>Least privilege, encryption, and auditable access.</small>
          </span>
          <span>
            <b>02</b>
            <strong>Measured performance</strong>
            <small>Real workloads, clear SLOs, continuous visibility.</small>
          </span>
          <span>
            <b>03</b>
            <strong>Safe change</strong>
            <small>Tested migrations, backups, and recovery paths.</small>
          </span>
        </div>
      </section>
    </main>
  );
}

export default DatabasePage;
