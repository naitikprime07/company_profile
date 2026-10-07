import { Check, Mail, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import usePhoneContact from "../../../hooks/usePhoneContact";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "../../common/SocialBrandIcons";
import {
  ENVIRONMENT,
  contactMailHref,
} from "../../../constants/environment";

function Footer() {
  const phoneContact = usePhoneContact();
  return (
    <footer className="footer">
      <div className="footer-panel">
        <div className="footer-main">
          <div className="footer-brand">
            <a
              className="logo logo-image-link"
              href="/"
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
            </a>
            <p className="footer-kicker">Build with clarity</p>
            <h2>Let&apos;s make your next product move count.</h2>
            <p>
              Independent digital product studio for ambitious teams building
              what is next.
            </p>
            <a
              className="footer-email"
              href={contactMailHref()}
              target="_blank"
              rel="noreferrer"
            >
              {ENVIRONMENT.contactEmail}
            </a>
            <a
              className="footer-email"
              href={phoneContact.href}
              onClick={phoneContact.onClick}
              title={
                phoneContact.isMobile
                  ? "Tap to call"
                  : "Click to copy the number"
              }
            >
              {phoneContact.copied
                ? "Number copied to clipboard ✓"
                : phoneContact.phone}
            </a>
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
              <a href="/about">About us</a>
              <a href="/#services">Our work</a>
              <Link to="/career">Careers</Link>
              <Link to="/contact">Contact</Link>
            </section>
            <section>
              <h2>Services</h2>
              <a href="/#services">Product strategy</a>
              <a href="/#services">Experience design</a>
              <a href="/#services">Engineering</a>
              <a href="/#services">Growth systems</a>
            </section>
            <section>
              <h2>Capabilities</h2>
              <a href="/#technology">Mobile apps</a>
              <a href="/#technology">Web platforms</a>
              <a href="/#technology">Cloud &amp; DevOps</a>
              <a href="/#technology">Team extension</a>
            </section>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 Prime Softech. All rights reserved.</span>
          <div>
            <a href="/#privacy">Privacy</a>
            <a href="/#terms">Terms</a>
            <a href="/#cookies">Cookies</a>
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
