import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Database,
  Globe2,
  Package,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import { getPortfolioItems } from "../services/portfolioService";
import styles from "./PortfolioPage.module.css";

const projects = [
  {
    number: "01",
    type: "Commerce / Operations",
    title: "A unified commerce system built for confident growth.",
    summary:
      "We replaced disconnected sales and fulfilment workflows with one clear platform for customers, operators, and leadership.",
    services: ["Product strategy", "UX system", "Web engineering"],
    results: [
      ["42%", "faster checkout"],
      ["3.1x", "release velocity"],
    ],
    theme: "cyan",
    visual: "commerce",
  },
  {
    number: "02",
    type: "Healthcare / Mobile",
    title: "Care coordination that keeps people, not paperwork, in focus.",
    summary:
      "A secure mobile experience that gives care teams a shared view of tasks, conversations, and patient progress.",
    services: ["Service design", "Mobile apps", "Cloud platform"],
    results: [
      ["61%", "less admin time"],
      ["4.8/5", "team rating"],
    ],
    theme: "violet",
    visual: "health",
  },
  {
    number: "03",
    type: "Fintech / Data",
    title: "Complex financial signals made useful in seconds.",
    summary:
      "A decision workspace that turns dense operational data into focused insights, alerts, and next actions.",
    services: ["Data experience", "Platform design", "Engineering"],
    results: [
      ["8 hrs", "saved weekly"],
      ["99.9%", "platform uptime"],
    ],
    theme: "blue",
    visual: "finance",
  },
];

const products = [
  {
    number: "01",
    name: "Prime Commerce",
    category: "Commerce platform",
    status: "Live",
    description:
      "A connected commerce workspace that brings catalog, orders, fulfilment, and operational reporting into one dependable system.",
    platforms: "Web · Cloud",
    capabilities: ["Order operations", "Live inventory", "Business insights"],
    metric: "42%",
    metricLabel: "faster order flow",
    Icon: Globe2,
    theme: "cyan",
  },
  {
    number: "02",
    name: "CareSync",
    category: "Care coordination",
    status: "Scaling",
    description:
      "A secure mobile product for coordinating care tasks, team communication, and patient progress without fragmented paperwork.",
    platforms: "iOS · Android",
    capabilities: ["Shared care plans", "Secure messaging", "Progress tracking"],
    metric: "61%",
    metricLabel: "less admin effort",
    Icon: Smartphone,
    theme: "violet",
  },
  {
    number: "03",
    name: "SignalDesk",
    category: "Decision intelligence",
    status: "Live",
    description:
      "A focused decision layer that converts dense business data into useful signals, timely alerts, and clear next actions.",
    platforms: "Web · Data",
    capabilities: ["Unified dashboards", "Smart alerts", "Role-based views"],
    metric: "8h",
    metricLabel: "saved per week",
    Icon: Database,
    theme: "blue",
  },
];


function ProjectVisual({ kind }) {
  return (
    <div className={styles.projectVisual} aria-hidden="true">
      <div className={styles.visualTop}>
        <i />
        <i />
        <i />
        <span>LIVE PRODUCT</span>
      </div>
      <div className={styles.visualBody}>
        <aside>
          <b>PS</b>
          <i />
          <i />
          <i />
        </aside>
        <div className={styles.visualCanvas}>
          <span className={styles.visualLabel}>{kind}</span>
          <div className={styles.visualMetric}>
            <small>PRODUCT SIGNAL</small>
            <strong>94.2</strong>
            <em>+18.4%</em>
          </div>
          <div className={styles.visualChart}>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={styles.visualRows}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductPreview({ product }) {
  const Icon = product.type === "app" ? Smartphone : Globe2;

  if (product.image) {
    return (
      <div className={styles.productImagePreview}>
        <img src={product.image} alt={product.title} />
        <span><Icon size={15} /> {product.type === "app" ? "App project" : "Web project"}</span>
      </div>
    );
  }

  return (
    <div className={styles.productPreview} aria-hidden="true">
      <div className={styles.productPreviewGlow} />
      <div className={styles.productWindow}>
        <div className={styles.productWindowTop}>
          <span className={styles.productMark}>
            <Icon size={18} />
          </span>
          <span>
            <small>PRIME PRODUCT</small>
            <b>{product.title}</b>
          </span>
          <i>{product.isFeatured ? "FEATURED" : product.type.toUpperCase()}</i>
        </div>
        <div className={styles.productWindowBody}>
          <div className={styles.productSignal}>
            <span>Product signal</span>
            <strong>{product.metric}</strong>
            <small>{product.metricLabel}</small>
          </div>
          <div className={styles.productPulse}>
            {[42, 58, 48, 72, 64, 86, 78].map((height, index) => (
              <i key={index} style={{ "--bar-height": `${height}%` }} />
            ))}
          </div>
          <div className={styles.productActivity}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  useScrollReveal();
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState("all");
  const [productPage, setProductPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  useEffect(() => {
    let active = true;
    setProductsLoading(true);
    setProductsError("");
    getPortfolioItems(productPage, productType, 10)
      .then((data) => {
        if (!active) return;
        setProducts(data.items);
        setPagination(data.pagination);
      })
      .catch((error) => active && setProductsError(error.message))
      .finally(() => active && setProductsLoading(false));
    return () => {
      active = false;
    };
  }, [productPage, productType]);

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-reveal>
        <div className="container">
          <p className="eyebrow">
            <span className="status-dot" /> Prime portfolio
          </p>
          <div className={styles.portfolioHeroCopy}>
            <h1>Our digital <span className="text-gradient">masterpieces.</span></h1>
            <p>
              Discover App and Web experiences built around meaningful ideas,
              polished interfaces, and technology made to perform.
            </p>
            <a className={styles.heroLink} href="#portfolio-projects">
              Explore projects <ArrowRight size={17} />
            </a>
          </div>
        </div>
        {products.some((product) => product.image) && (
          <div className={styles.projectRibbon} aria-label="Featured project previews">
            <div className={styles.projectRibbonTrack}>
              {Array.from({ length: 4 }, () => products.filter((product) => product.image))
                .flat()
                .slice(0, 16)
                .map((product, index) => (
                  <div className={styles.ribbonCard} key={product._id + "-" + index}>
                    <img src={product.image} alt="" />
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      <section className={styles.products} id="portfolio-projects" data-reveal>
        <div className="container">
          <header className={styles.productsHead}>
            <div>
              <p className="eyebrow">
                <Package size={14} /> Selected creations
              </p>
              <h2>Witness our impactful creations.</h2>
            </div>
            <p>
              Browse projects created for mobile and web, each shaped around a
              clear business goal and a useful customer experience.
            </p>
          </header>

          <div className={styles.productFilters} aria-label="Filter portfolio projects">
            {["all", "app", "web"].map((type) => (
              <button
                type="button"
                key={type}
                className={productType === type ? styles.productFilterActive : ""}
                onClick={() => {
                  setProductType(type);
                  setProductPage(1);
                }}
              >
                {type === "all" ? "All work" : type === "app" ? "Apps" : "Web"}
              </button>
            ))}
          </div>

          <div className={styles.productGrid}>
            {productsLoading ? (
              <div className={styles.productEmpty}>Loading our work...</div>
            ) : productsError ? (
              <div className={styles.productEmpty}>{productsError}</div>
            ) : products.length === 0 ? (
              <div className={styles.productEmpty}>No {productType === "all" ? "portfolio" : productType} projects are published yet.</div>
            ) : products.map((product, index) => (
              <article
                className={[styles.productCard, styles[product.type === "app" ? "violet" : index % 2 ? "blue" : "cyan"]].join(" ")}
                key={product._id}
              >
                <Link className={styles.cardOpenLink} to={"/portfolio/" + product._id} aria-label={"View " + product.title} />
                <div className={styles.galleryImage}>
                  {product.image ? <img src={product.image} alt={product.title} /> : <ProductPreview product={product} />}
                  <span>{product.type === "app" ? "APP" : "WEB"}</span>
                </div>
                <div className={styles.galleryBody}>
                  <div>
                    <small>{product.category}</small>
                    <h3>{product.title}</h3>
                  </div>
                  <span className={styles.galleryArrow}><ArrowUpRight size={18} /></span>
                </div>
                <p className={styles.galleryExcerpt}>{product.excerpt}</p>
                <div className={styles.galleryMeta}>
                  <span>{product.platforms?.join(" · ") || (product.type === "app" ? "Mobile application" : "Web platform")}</span>
                  {product.metric && <strong>{product.metric} <small>{product.metricLabel}</small></strong>}
                </div>
              </article>
            ))}
          </div>
          {!productsLoading && !productsError && pagination.totalPages > 1 && (
            <nav className={styles.publicPagination} aria-label="Portfolio pagination">
              <span>Page {pagination.page} of {pagination.totalPages}</span>
              <div>
                <button type="button" disabled={productPage <= 1} onClick={() => setProductPage((page) => page - 1)}><ChevronLeft size={15} /> Previous</button>
                {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => (
                  <button type="button" className={page === productPage ? styles.currentPage : ""} key={page} onClick={() => setProductPage(page)}>{page}</button>
                ))}
                <button type="button" disabled={productPage >= pagination.totalPages} onClick={() => setProductPage((page) => page + 1)}>Next <ChevronRight size={15} /></button>
              </div>
            </nav>
          )}
        </div>
      </section>

      <section className={styles.cta} data-reveal>
        <div className="container">
          <span>
            <BarChart3 size={21} />
          </span>
          <p className="eyebrow">Your next case study</p>
          <h2>Have a meaningful problem to solve?</h2>
          <p>
            Let us turn it into a product people understand and your business
            can depend on.
          </p>
          <Link to="/contact">
            Build something useful <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
