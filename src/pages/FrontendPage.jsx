import { ArrowRight } from 'lucide-react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Button from '../components/Button'
import useScrollReveal from '../hooks/useScrollReveal'
import { ENVIRONMENT } from '../constants/environment'

const frontendPages = {
  angular: {
    label: 'Angular', eyebrow: 'Angular frontend in development', title: 'A structured product interface built to grow.',
    copy: 'We use Angular to organise complex product experiences into clear modules, predictable data flows, and maintainable UI systems that can evolve with the product.',
    tags: ['Angular', 'RxJS', 'Signals', 'Component architecture'], section: 'Structured by design', sectionTitle: 'Strong conventions for a dependable interface.',
    sectionCopy: 'Angular gives our team a consistent way to organise features, state, routing, forms, and testing as the application becomes more capable.',
    cards: [['Feature modules', 'Clear boundaries keep product areas independent and easier to evolve.'], ['Reactive state', 'Signals and RxJS coordinate user actions, data, and asynchronous workflows.'], ['Reliable forms', 'Typed validation and accessible feedback support important product journeys.'], ['Testable UI', 'Component and integration tests protect behaviour as the interface grows.']],
  },
  react: {
    label: 'React', eyebrow: 'React frontend in development', title: 'Composable experiences, refined interaction by interaction.',
    copy: 'We use React to build our product as a system of focused components, connecting thoughtful interaction design with a flexible frontend architecture.',
    tags: ['React', 'Hooks', 'Component system', 'Accessible UI'], section: 'Composition over complexity', sectionTitle: 'Small pieces working as one product.',
    sectionCopy: 'Our React foundation separates reusable interface elements, product features, and data concerns so teams can improve each layer with confidence.',
    cards: [['Design system', 'Reusable primitives keep visual language and interaction behaviour consistent.'], ['Feature composition', 'Focused components combine into complete product journeys without tight coupling.'], ['State strategy', 'Local and shared state stay intentional, traceable, and proportionate to the need.'], ['Performance care', 'Rendering, loading, and bundle behaviour are measured throughout development.']],
  },
  typescript: {
    label: 'TypeScript', eyebrow: 'TypeScript foundation in development', title: 'Product decisions expressed in dependable types.',
    copy: 'TypeScript gives our product a shared language across interfaces, data, and business rulesâ€”catching uncertainty early and making change safer.',
    tags: ['TypeScript', 'Strict mode', 'Typed APIs', 'Shared contracts'], section: 'Confidence in every contract', sectionTitle: 'Types that explain how the product works.',
    sectionCopy: 'We model important concepts explicitly, connect frontend and backend contracts, and use the compiler as an everyday quality tool.',
    cards: [['Domain models', 'Product concepts become precise types instead of scattered assumptions.'], ['API contracts', 'Typed requests and responses reveal integration issues before runtime.'], ['Safe refactoring', 'Compiler feedback makes broad product changes more controlled and visible.'], ['Developer clarity', 'Intent is documented directly in code through useful, readable types.']],
  },
  html5: {
    label: 'HTML5', eyebrow: 'HTML5 experience in development', title: 'A fast, accessible foundation for every screen.',
    copy: 'We begin with semantic HTML5 so our product remains understandable, keyboard-friendly, search-ready, and resilient before visual enhancement is added.',
    tags: ['Semantic HTML', 'Accessibility', 'Responsive', 'Progressive enhancement'], section: 'The web platform first', sectionTitle: 'Meaningful structure that works everywhere.',
    sectionCopy: 'Native elements, clear document structure, responsive media, and progressive enhancement create a stronger base for every user and device.',
    cards: [['Semantic structure', 'Meaningful landmarks and elements make content easier to navigate and maintain.'], ['Accessible by default', 'Keyboard behaviour, labels, focus order, and screen-reader meaning begin in markup.'], ['Responsive media', 'Modern image and media elements adapt efficiently to different screens and capabilities.'], ['Resilient delivery', 'Core content and actions remain useful across browsers and connection conditions.']],
  },
}

function FrontendPage({ type }) {
  useScrollReveal()
  const page = frontendPages[type]

  return (
    <main className={`frontend-page frontend-${type}`} id="top">
      <section className="frontend-hero container">
        <div className="frontend-copy" data-reveal>
          <p className="eyebrow hero-eyebrow"><span className="status-dot" /> {page.eyebrow}</p>
          <h1>{page.title}</h1><p>{page.copy}</p>
          <div className="hero-actions"><Button href="/#about">About our company</Button><a className="text-link" href="#frontend-foundation">Explore our approach <ArrowRight size={17} /></a></div>
          <div className="frontend-tags">{page.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className={`frontend-visual frontend-visual-${type}`} data-reveal aria-label={`${page.label} product architecture illustration`}>
          {type === 'angular' && <><div className="angular-build-bar" aria-hidden="true"><span><i /> NG BUILD</span><b>COMPILED</b></div><span className="angular-module-ring" aria-hidden="true"><i /><i /><i /></span><DotLottieReact className="angular-lottie" src={ENVIRONMENT.animations.angular} loop autoplay aria-label="Angular development animation" /><span className="angular-node n1">FEATURE</span><span className="angular-node n2">SIGNALS</span><span className="angular-node n3">ROUTER</span><div className="angular-activity" aria-hidden="true"><small>CHANGE DETECTION</small><span><i /><i /><i /><i /><i /></span></div></>}
          {type === 'react' && <><div className="react-atom"><i /><i /><i /><b>UI</b></div><span className="react-chip c1">STATE</span><span className="react-chip c2">VIEW</span><span className="react-chip c3">DATA</span></>}
          {type === 'typescript' && <>
            <div className="typescript-aurora" aria-hidden="true" />
            <div className="typescript-status" aria-hidden="true"><span><i /> TYPESCRIPT ENGINE</span><b>TYPE-SAFE</b></div>
            <div className="typescript-orbit" aria-hidden="true"><span>TS</span><i /><i /><i /></div>
            <DotLottieReact className="typescript-lottie" src={ENVIRONMENT.animations.typescript} loop autoplay aria-label="TypeScript development animation" />
            <div className="typescript-badges" aria-hidden="true"><span>STRICT</span><span>INTELLISENSE</span><span>ZERO RUNTIME</span></div>
          </>}
          {type === 'html5' && <><div className="html-browser-bar" aria-hidden="true"><i /><i /><i /><code>semantic-document.html</code></div><span className="html5-mark" aria-hidden="true">5</span><DotLottieReact className="html-lottie" src={ENVIRONMENT.animations.html5} loop autoplay aria-label="HTML5 development animation" /><div className="html-semantic-tags" aria-hidden="true"><span>&lt;main&gt;</span><span>&lt;article&gt;</span><span>&lt;nav&gt;</span></div><span className="html-scan-line" aria-hidden="true" /><span className="html-score">A11Y <b>READY</b></span></>}
        </div>
      </section>
      <section className="frontend-foundation" id="frontend-foundation" data-reveal>
        <div className="container"><div className="frontend-heading"><p className="eyebrow">{page.section}</p><h2>{page.sectionTitle}</h2><p>{page.sectionCopy}</p></div>
          <div className="frontend-card-grid">{page.cards.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>
      <section className="frontend-quality container" data-reveal><div><p className="eyebrow">How we give our best</p><h2>Quality runs through every frontend decision.</h2></div><ol><li><b>01</b><span><strong>Model</strong>Define flows, states, content, and technical boundaries.</span></li><li><b>02</b><span><strong>Build</strong>Create accessible, reusable, and maintainable interfaces.</span></li><li><b>03</b><span><strong>Verify</strong>Test behaviour, devices, browsers, and edge cases.</span></li><li><b>04</b><span><strong>Refine</strong>Measure performance and polish the complete experience.</span></li></ol></section>
    </main>
  )
}

export default FrontendPage
