import { Globe2, Mail, MessageCircle } from 'lucide-react'
import { ENVIRONMENT, mailTo } from '../../../constants/environment'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-panel">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="logo" href="/"><span className="logo-symbol" aria-hidden="true"><i /><i /><i /></span><span>ASTER<span className="logo-muted">/studio</span></span></a>
            <p className="footer-kicker">Build with clarity</p>
            <h2>Let&apos;s make your next product move count.</h2>
            <p>Independent digital product studio for ambitious teams building what is next.</p>
            <a className="footer-email" href={mailTo()}>{ENVIRONMENT.contactEmail}</a>
            <div className="footer-socials" aria-label="Social media">
              <a href={ENVIRONMENT.linkedInUrl} aria-label="LinkedIn"><Globe2 size={17} /></a>
              <a href={mailTo()} aria-label="Email"><Mail size={17} /></a>
              <a href="/#contact" aria-label="Contact"><MessageCircle size={17} /></a>
            </div>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <section><h2>Company</h2><a href="/about">About us</a><a href="/#services">Our work</a><a href={mailTo(ENVIRONMENT.careersEmail)}>Careers</a><a href={mailTo()}>Contact</a></section>
            <section><h2>Services</h2><a href="/#services">Product strategy</a><a href="/#services">Experience design</a><a href="/#services">Engineering</a><a href="/#services">Growth systems</a></section>
            <section><h2>Capabilities</h2><a href="/#technology">Mobile apps</a><a href="/#technology">Web platforms</a><a href="/#technology">Cloud &amp; DevOps</a><a href="/#technology">Team extension</a></section>
          </nav>
        </div>
        <div className="footer-bottom"><span>Copyright 2026 Aster Studio. All rights reserved.</span><div><a href="/#privacy">Privacy</a><a href="/#terms">Terms</a><a href="/#cookies">Cookies</a></div></div>
        <div className="footer-watermark" aria-hidden="true">ASTER</div>
      </div>
    </footer>
  )
}

export default Footer
