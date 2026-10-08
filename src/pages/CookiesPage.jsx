import LegalPage from "../components/LegalPage";

const sections = [
  {
    id: "what-are-cookies",
    number: "01",
    title: "What are cookies?",
    blocks: [
      {
        type: "p",
        text: "Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work or work more efficiently, as well as to provide information to the owner of the site. Cookies allow a website to recognise your device and remember certain preferences or actions over time.",
      },
      {
        type: "p",
        text: "Similar technologies, such as pixels, tags, and local storage, work in the same way and are used on many websites, including ours, to recognise and understand how visitors interact with a site.",
      },
    ],
  },
  {
    id: "do-we-use-cookies",
    number: "02",
    title: "Do we use cookies?",
    blocks: [
      {
        type: "p",
        text: "Yes. Prime Softech uses cookies and similar technologies on primesoftechs.com for the purposes described in this Cookie Policy. Our own cookies are used mainly to keep the website working properly and to remember basic preferences. Where we allow trusted third parties (for example, analytics providers) to set cookies, they do so only for the purposes described below.",
      },
      {
        type: "p",
        privacyLink: true,
        text: "The personal information these technologies may process is covered by our",
      },
    ],
  },
  {
    id: "types-of-cookies",
    number: "03",
    title: "Types of cookies we use",
    blocks: [
      {
        type: "ul",
        items: [
          "Strictly necessary cookies: essential for the website to function. They let you browse pages, load styles and scripts, and use features such as the contact form and job application forms. Without these, parts of the site cannot work.",
          "Performance and analytics cookies: help us understand how visitors interact with the website, such as which pages are visited most, how long visitors stay, and where errors occur. This information is aggregated and used only to improve the website.",
          "Functional cookies: remember choices you make (such as preferred display options) so the site can provide enhanced, more personal features.",
          "Marketing and targeting cookies: used sparingly, if at all, to measure the effectiveness of our own campaigns and to deliver relevant messaging. We do not sell your personal information to advertisers.",
        ],
      },
    ],
  },
  {
    id: "how-long-cookies-stay",
    number: "04",
    title: "How long do cookies stay on my device?",
    blocks: [
      {
        type: "p",
        text: "The length of time a cookie remains on your device depends on the type of cookie. \"Session\" cookies are created when you visit a page and expire automatically when you close your browser. \"Persistent\" cookies remain on your device until they expire (typically after a set period) or until you delete them through your browser settings.",
      },
    ],
  },
  {
    id: "how-to-control-cookies",
    number: "05",
    title: "How can I control or delete cookies?",
    blocks: [
      {
        type: "p",
        text: "You can control and manage cookies in your browser settings. Most browsers let you refuse or accept cookies, delete cookies, or block cookies from specific websites. You can find these options in the settings or preferences menu of your browser (under History, Privacy, or Security).",
      },
      {
        type: "p",
        text: "Please note that if you choose to block strictly necessary cookies, some parts of the website may not work as intended — for example, submitting a contact enquiry or a job application.",
      },
      {
        type: "p",
        text: "To learn more about managing cookies on common browsers, you can visit the support pages of your browser provider.",
      },
    ],
  },
  {
    id: "do-not-track",
    number: "06",
    title: "Do-Not-Track signals",
    blocks: [
      {
        type: "p",
        text: "Some browsers offer a Do-Not-Track (\"DNT\") setting to signal that you do not want your online activity tracked. There is currently no uniform technical standard for how websites should respond to such signals. For this reason, we do not currently respond to DNT browser signals. If a standard is adopted in the future that we must follow, we will inform you in an updated version of this Cookie Policy.",
      },
    ],
  },
  {
    id: "changes-cookie-policy",
    number: "07",
    title: "Changes to this Cookie Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Cookie Policy from time to time, for example when we add new tools or services to the website, or when legal requirements change. Any changes will be posted on this page with an updated \"Last updated\" date. We encourage you to review this policy periodically.",
      },
    ],
  },
  {
    id: "contact-cookies",
    number: "08",
    title: "How can you contact us about cookies?",
    blocks: [
      {
        type: "p",
        contact: true,
        text: "If you have questions about our use of cookies or this Cookie Policy, you may email us at",
      },
      {
        type: "address",
      },
    ],
  },
];

function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal · Cookie policy"
      title="Cookies,"
      accent="explained simply."
      intro="This Cookie Policy explains what cookies are, how Prime Softech uses them on this website, and the choices you have to control them."
      sections={sections}
    />
  );
}

export default CookiesPage;
