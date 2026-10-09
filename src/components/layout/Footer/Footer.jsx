import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import usePhoneContact from "../../../hooks/usePhoneContact";
import useContentAvailability from "../../../hooks/useContentAvailability";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "../../common/SocialBrandIcons";
import {
  ENVIRONMENT,
  contactMailHref,
} from "../../../constants/environment";

// Capability categories shown as expandable dropdowns in the footer. Each
// item links to its dedicated /technology/* page (single source of truth here).
const capabilityGroups = [
  {
    title: "Mobile",
    items: [
      { label: "iOS", to: "/technology/ios" },
      { label: "Android", to: "/technology/android" },
      { label: "Flutter", to: "/technology/flutter" },
    ],
  },
  {
    title: "Front-end",
    items: [
      { label: "Angular", to: "/technology/angular" },
      { label: "React", to: "/technology/react" },
      { label: "TypeScript", to: "/technology/typescript" },
      { label: "HTML5", to: "/technology/html5" },
    ],
  },
  {
    title: "Back-end",
    items: [
      { label: "Node", to: "/technology/node" },
      { label: "Java", to: "/technology/java" },
      { label: "PHP", to: "/technology/php" },
    ],
  },
  {
    title: "Database",
    items: [
      { label: "MySQL", to: "/technology/mysql" },
      { label: "MongoDB", to: "/technology/mongodb" },
      { label: "PostgreSQL", to: "/technology/postgresql" },
      { label: "DynamoDB", to: "/technology/dynamodb" },
      { label: "Oracle", to: "/technology/oracle" },
      { label: "Redis", to: "/technology/redis" },
    ],
  },
  {
    title: "Gaming",
    items: [{ label: "Unity", to: "/technology/unity" }],
  },
  {
    title: "DevOps",
    items: [{ label: "Infra & DevOps", to: "/technology/infra-devops" }],
  },
  {
    title: "CMS",
    items: [{ label: "CMS platforms", to: "/technology/cms" }],
  },
];

function Footer() {
  const phoneContact = usePhoneContact(ENVIRONMENT.contactMobile);
  const { hasBlogs, hasPortfolio } = useContentAvailability();
  const [openGroups, setOpenGroups] = useState({});
  const toggleGroup = (title) =>
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  // The footer persists across route changes, so collapse any open capability
  // dropdown once navigation happens (e.g. after clicking a page link).
  const { pathname } = useLocation();
  useEffect(() => {
    setOpenGroups({});
  }, [pathname]);
  return (
    <footer className="footer">
      <div className="footer-panel">
        <div className="footer-main">
          <div className="footer-brand">
            <Link
              className="logo logo-image-link"
              to="/"
              aria-label="Prime Softech home"
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
            <p className="footer-kicker">Build with clarity</p>
            <h2>Let&apos;s make your next product move count.</h2>
            <p>
              Independent digital product studio for ambitious teams building
              what is next.
            </p>
            <div className="footer-meta">
              <a
                className="footer-metaItem"
                href={ENVIRONMENT.office.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={16} aria-hidden="true" />
                <span>{ENVIRONMENT.office.footerAddress}</span>
              </a>
              <div className="footer-metaItem">
                <Mail size={16} aria-hidden="true" />
                <span>
                  <a
                    href={contactMailHref()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ENVIRONMENT.contactEmail}
                  </a>
                  <a
                    href={contactMailHref(
                      ENVIRONMENT.careersEmail,
                      "HR / Career enquiry at Prime Softech",
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ENVIRONMENT.careersEmail}
                  </a>
                </span>
              </div>
              <a
                className="footer-metaItem"
                href={phoneContact.href}
                onClick={phoneContact.onClick}
                title={
                  phoneContact.isMobile
                    ? "Tap to call"
                    : "Click to copy the number"
                }
              >
                <Phone size={16} aria-hidden="true" />
                <span>
                  {phoneContact.copied
                    ? "Number copied to clipboard ✓"
                    : phoneContact.phone}
                </span>
              </a>
              <div className="footer-metaItem">
                <Clock size={16} aria-hidden="true" />
                <span>{ENVIRONMENT.office.hours}</span>
              </div>
            </div>
            <div className="footer-socials" aria-label="Social media">
              <a
                href={ENVIRONMENT.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={17} />
              </a>
              <a
                href={ENVIRONMENT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={ENVIRONMENT.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href={contactMailHref()}
                target="_blank"
                rel="noreferrer"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
              <a
                href={phoneContact.href}
                onClick={phoneContact.onClick}
                aria-label="Call us"
                title={
                  phoneContact.isMobile
                    ? `Call ${phoneContact.phone}`
                    : "Copy phone number"
                }
              >
                {phoneContact.copied ? <Check size={17} /> : <Phone size={17} />}
              </a>
              <Link to="/contact" aria-label="Contact us">
                <MessageCircle size={17} />
              </Link>
            </div>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <section>
              <h2>Company</h2>
              <Link to="/about">About us</Link>
              {hasPortfolio && <Link to="/portfolio">Portfolio</Link>}
              {hasBlogs && <Link to="/blog">Blog</Link>}
              <Link to="/career">Careers</Link>
              <Link to="/contact">Contact</Link>
            </section>
            <section>
              <h2>Services</h2>
              <Link to="/services#mobile-apps">Mobile apps</Link>
              <Link to="/services#web-development">Web development</Link>
              <Link to="/services#design">Product design</Link>
              <Link to="/services#staff-augmentation">Staff augmentation</Link>
              <Link to="/services#devops">Cloud &amp; DevOps</Link>
            </section>
            <section className="footer-caps">
              <h2>Capabilities</h2>
              {capabilityGroups.map((group) => {
                const isOpen = !!openGroups[group.title];
                return (
                  <div className="footer-capsGroup" key={group.title}>
                    <button
                      type="button"
                      className="footer-capsTrigger"
                      aria-expanded={isOpen}
                      onClick={() => toggleGroup(group.title)}
                    >
                      <span>{group.title}</span>
                      <ChevronDown
                        size={15}
                        aria-hidden="true"
                        className={isOpen ? "footer-capsIconOpen" : ""}
                      />
                    </button>
                    {isOpen && (
                      <div className="footer-capsPanel">
                        {group.items.map((item) => (
                          <Link key={item.to} to={item.to}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            Copyright {new Date().getFullYear()}{" "}
            <strong className="footer-copyBrand">Prime Softech</strong> All
            rights reserved.
          </span>
          <div>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
        <div
          className="footer-watermark footer-watermark-simple"
          aria-hidden="true"
        >
          PRIME SOFTECH
        </div>
      </div>
    </footer>
  );
}

export default Footer;
