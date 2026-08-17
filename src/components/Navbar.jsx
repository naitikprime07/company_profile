import {
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Gamepad2,
  Menu,
  Monitor,
  ServerCog,
  ShoppingCart,
  Smartphone,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const serviceGroups = [
  {
    icon: Smartphone,
    title: "Mobile apps",
    items: [
      "Native iOS apps",
      "Native Android apps",
      "Cross-platform apps",
      "Agentic AI",
      "AI & automation",
      "Custom software",
      "MVP development",
      "SaaS products",
    ],
  },
  {
    icon: Code2,
    title: "Web development",
    items: [
      "Enterprise solutions",
      "Ecommerce",
      "CMS platforms",
      "Custom development",
    ],
  },
  {
    icon: Monitor,
    title: "Design",
    items: [
      "Discovery workshop",
      "Product analysis",
      "Wireframes",
      "SEO audit",
      "UI / UX design",
    ],
  },
  {
    icon: UsersRound,
    title: "Staff augmentation",
    items: [
      "Offshore & nearshore",
      "Dedicated teams",
      "Hourly support",
      "Contract roles",
      ".NET specialists",
    ],
  },
  {
    icon: Cloud,
    title: "DevOps",
    items: ["Cloud setup", "Automation", "Continuous delivery", "Monitoring"],
  },
];

const technologyGroups = [
  { icon: Smartphone, title: "Mobile", items: ["iOS", "Android", "Flutter"] },
  { icon: Gamepad2, title: "Gaming", items: ["Unity"] },
  { icon: ServerCog, title: "Back-end", items: ["Node", "Java", "PHP"] },
  {
    icon: Code2,
    title: "Front-end",
    items: ["Angular", "React", "TypeScript", "HTML5"],
  },
  {
    icon: Database,
    title: "Database",
    items: ["MySQL", "DynamoDB", "PostgreSQL", "Oracle", "MongoDB", "Redis"],
  },
  {
    icon: Cloud,
    title: "Infra & DevOps",
    items: ["AWS", "Google Cloud", "Azure", "Gradle", "Jenkins", "Selenium"],
  },
  {
    icon: ShoppingCart,
    title: "CMS",
    items: ["Magento", "WordPress", "Shopify", "Umbraco", "Drupal", "Joomla"],
  },
];

const links = [
  { label: "About Us", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Career", to: "/career" },
  { label: "Contact Us", to: "/contact" },
];

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [technologyOpen, setTechnologyOpen] = useState(false);
  const servicesId = useId();
  const technologyId = useId();
  const closeTimer = useRef(null);
  const technologyCloseTimer = useRef(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
        setTechnologyOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(technologyCloseTimer.current);
    },
    [],
  );

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const closeMenu = () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(technologyCloseTimer.current);
    setOpen(false);
    setServicesOpen(false);
    setTechnologyOpen(false);
  };

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
    setTechnologyOpen(false);
  };

  const scheduleServicesClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 300);
  };

  const openTechnology = () => {
    window.clearTimeout(technologyCloseTimer.current);
    setTechnologyOpen(true);
    setServicesOpen(false);
  };

  const scheduleTechnologyClose = () => {
    window.clearTimeout(technologyCloseTimer.current);
    technologyCloseTimer.current = window.setTimeout(
      () => setTechnologyOpen(false),
      300,
    );
  };

  return (
    <header className="navbar-shell">
      <nav className="navbar container" aria-label="Main navigation">
        <Link
          className="logo logo-image-link"
          to="/"
          aria-label="Prime Softech home"
          onClick={closeMenu}
        >
          <span className="brand-logo-surface">
            <img
              className="brand-logo-image"
              src="/Prime%20Softech%20logo.png"
              alt="Prime Softech"
              width="1368"
              height="553"
            />
          </span>
        </Link>

        <div className={open ? "nav-links nav-links-open" : "nav-links"}>
          <div
            className="services-menu"
            onMouseEnter={openServices}
            onMouseLeave={scheduleServicesClose}
          >
            <button
              className="services-trigger"
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={servicesId}
              onClick={() => {
                window.clearTimeout(closeTimer.current);
                setServicesOpen(!servicesOpen);
              }}
            >
              Services <ChevronDown size={15} aria-hidden="true" />
            </button>
            <div
              className={
                servicesOpen
                  ? "services-mega-menu is-open"
                  : "services-mega-menu"
              }
              id={servicesId}
              onMouseEnter={openServices}
            >
              <div className="mega-menu-groups">
                {serviceGroups.map(({ icon: Icon, title, items }) => (
                  <section
                    className="mega-menu-group"
                    key={title}
                    aria-label={title}
                  >
                    <h2>
                      <Icon size={18} aria-hidden="true" />
                      {title}
                    </h2>
                    <div>
                      {items.map((item) => (
                        <Link
                          className="service-item-link"
                          to={`/services#${toSlug(item)}`}
                          key={item}
                          onClick={closeMenu}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>

          <div
            className="technology-menu"
            onMouseEnter={openTechnology}
            onMouseLeave={scheduleTechnologyClose}
          >
            <button
              className="technology-trigger"
              type="button"
              aria-expanded={technologyOpen}
              aria-controls={technologyId}
              onClick={() => {
                window.clearTimeout(technologyCloseTimer.current);
                setTechnologyOpen(!technologyOpen);
                setServicesOpen(false);
              }}
            >
              Technology <ChevronDown size={15} aria-hidden="true" />
            </button>
            <div
              className={
                technologyOpen
                  ? "technology-mega-menu is-open"
                  : "technology-mega-menu"
              }
              id={technologyId}
              onMouseEnter={openTechnology}
            >
              <div className="technology-menu-groups">
                {technologyGroups.map(({ icon: Icon, title, items }) => (
                  <section
                    className="technology-menu-group"
                    key={title}
                    aria-label={title}
                  >
                    <h2>
                      <Icon size={18} aria-hidden="true" />
                      {title}
                    </h2>
                    <div>
                      {items.map((item) =>
                        [
                          "iOS",
                          "Android",
                          "Flutter",
                          "Unity",
                          "Node",
                          "Java",
                          "PHP",
                          "Angular",
                          "React",
                          "TypeScript",
                          "HTML5",
                          "MySQL",
                          "DynamoDB",
                          "PostgreSQL",
                          "Oracle",
                          "MongoDB",
                          "Redis",
                        ].includes(item) ? (
                          <Link
                            className="technology-item-link"
                            to={`/technology/${item.toLowerCase()}`}
                            key={item}
                            onClick={closeMenu}
                          >
                            {item}
                          </Link>
                        ) : (
                          <Link
                            className="technology-item-link"
                            to={
                              title === "Infra & DevOps"
                                ? "/services#devops"
                                : "/services#web-development"
                            }
                            key={item}
                            onClick={closeMenu}
                          >
                            {item}
                          </Link>
                        ),
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>

          {links.map((link) =>
            link.to ? (
              <NavLink key={link.label} to={link.to} onClick={closeMenu}>
                {link.label}
              </NavLink>
            ) : (
              <a key={link.label} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ),
          )}
        </div>

        <button
          className="nav-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X size={22} /> : <Menu size={23} />}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
