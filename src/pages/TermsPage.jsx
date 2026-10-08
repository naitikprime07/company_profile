import LegalPage from "../components/LegalPage";

const sections = [
  {
    id: "acceptance-of-terms",
    number: "01",
    title: "Acceptance of these terms",
    blocks: [
      {
        type: "p",
        text: "Welcome to Prime Softech. These terms and conditions outline the rules for the use of Prime Softech's Website. By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Prime Softech's website if you do not accept all of the terms and conditions stated on this page.",
      },
      {
        type: "p",
        text: "These terms apply to visitors, prospective clients, and candidates using the website for browsing, project inquiries, and job applications. Any separate written agreement you sign with us (such as a project contract or offer letter) takes precedence over these terms for that engagement.",
      },
    ],
  },
  {
    id: "about-our-services",
    number: "02",
    title: "About our services",
    blocks: [
      {
        type: "p",
        text: "Prime Softech provides mobile application development (Android, iOS, Flutter), web development, UI/UX and product design, staff augmentation, and related technology services. Descriptions of services on this website are for general information only. The exact scope, deliverables, timelines, and pricing of any work are defined in a separate proposal or written agreement between you and Prime Softech.",
      },
      {
        type: "p",
        text: "We reserve the right to modify, suspend, or discontinue any part of the website or its content at any time without prior notice.",
      },
    ],
  },
  {
    id: "use-of-website",
    number: "03",
    title: "Use of the website",
    blocks: [
      {
        type: "p",
        text: "Unless otherwise stated, Prime Softech owns the intellectual property rights for all material on this website, including the design, text, graphics, logos, and code. All material is available to you for viewing and for lawful use of our services, subject to the restrictions below:",
      },
      {
        type: "ul",
        items: [
          "Do not copy, reproduce, republish, or distribute website content for commercial purposes without our written permission.",
          "Do not use our name, logo, or brand assets in a way that suggests endorsement or partnership without approval.",
          "Do not frame any part of the website or use meta tags to clone our company name or trademarks.",
          "You may share links to our pages and quote short extracts with attribution for commentary or review purposes.",
        ],
      },
    ],
  },
  {
    id: "user-submissions",
    number: "04",
    title: "Your submissions and enquiries",
    blocks: [
      {
        type: "p",
        text: "When you submit the contact form, apply for a job, upload a resume, or send us information, you confirm that the details are accurate and that you have the right to share them. You agree not to submit unlawful, infringing, defamatory, or malicious content through the website.",
      },
      {
        type: "p",
        text: "Information submitted through career pages is used only to evaluate your suitability for current or future roles, as described in our Privacy Policy. We do not claim ownership of resumes or portfolios you send us.",
      },
      {
        type: "p",
        privacyLink: true,
        text: "How we handle your submitted data is described in our",
      },
    ],
  },
  {
    id: "client-project-responsibilities",
    number: "05",
    title: "Client responsibilities",
    blocks: [
      {
        type: "p",
        text: "For active projects, clients agree to provide timely access to required information, approvals, assets, and systems; to nominate a point of contact for decisions; and to review deliverables within agreed timelines. Delays caused by unavailable inputs or late approvals may affect delivery dates and, where applicable, project cost.",
      },
      {
        type: "p",
        text: "Clients are responsible for the lawful use of any product, content, or data we build, host, or process on their behalf, including compliance with applicable industry, consumer, and data protection regulations.",
      },
    ],
  },
  {
    id: "third-party-links",
    number: "06",
    title: "Third-party links and services",
    blocks: [
      {
        type: "p",
        text: "Our website may contain links to third-party websites, tools, or services (such as app stores, social platforms, or analytics providers) that are not affiliated with or controlled by us. We do not take responsibility for the privacy practices, accuracy, or content of any third-party sites and encourage you to read their terms and policies before use.",
      },
    ],
  },
  {
    id: "prohibited-uses",
    number: "07",
    title: "Prohibited uses",
    blocks: [
      {
        type: "p",
        text: "You may not use this website:",
      },
      {
        type: "ul",
        items: [
          "In any way that violates any applicable national or local law or regulation.",
          "For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.",
          "To transmit, or procure the sending of, any unsolicited or unauthorised advertising, promotional content, spam, or similar.",
          "To knowingly transmit data, send, upload, or use materials that contain viruses, trojans, worms, logic bombs, or any other material that is malicious or technologically harmful.",
          "To attempt to gain unauthorised access to the website, the server on which the website is stored, or any server, computer, or database connected to the website.",
          "To attack the website by way of denial-of-service or distributed denial-of-service attack, or to interfere with the proper working of the website.",
        ],
      },
      {
        type: "p",
        text: "We will notify the relevant authorities of any misuse and will not tolerate any action that may result in damage to the website or its users.",
      },
    ],
  },
  {
    id: "disclaimer",
    number: "08",
    title: "Disclaimer",
    blocks: [
      {
        type: "p",
        text: "The information provided on this website is of a general nature and is provided for information purposes only. It is not intended to constitute advice, and you should not act or refrain from acting on the basis of any content on this site without seeking appropriate professional advice. While we strive to keep the website running smoothly and the content current, we make no warranties about the completeness, reliability, or accuracy of this information, and we accept no liability for any loss or damage of whatever nature arising from the use of, or reliance on, the website.",
      },
      {
        type: "p",
        text: "All warranties, terms, and conditions that may otherwise be implied by statute or common law are, to the fullest extent permitted by law, excluded.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    number: "09",
    title: "Limitation of liability",
    blocks: [
      {
        type: "p",
        text: "Prime Softech, its directors, employees, or affiliates will not be held liable for any direct, indirect, incidental, consequential, special, exemplary, or punitive damages, or lost profits, revenue, data, or goodwill resulting from: (a) your access to, use of, or inability to use the website; (b) any conduct or content of any third party on the website; (c) any content obtained from the website; or (d) unauthorised access, use, or alteration of your transmissions or content — whether based on warranty, contract, tort (including negligence), or any other legal theory, even if we have been informed of the possibility of such damage.",
      },
      {
        type: "p",
        text: "Where a written project agreement exists between you and Prime Softech, liability is limited to the terms and caps stated in that agreement.",
      },
    ],
  },
  {
    id: "indemnification",
    number: "10",
    title: "Indemnification",
    blocks: [
      {
        type: "p",
        text: "You agree to defend, indemnify, and hold harmless Prime Softech and its employees and contractors from and against any claims, damages, obligations, losses, liabilities, costs, or expenses (including attorney fees) arising from: (a) your use of and access to the website; (b) your violation of any term of these conditions; (c) any of your submissions, including resumes, project details, or messages; or (d) your violation of any third-party right, including without limitation any copyright, property, or privacy right.",
      },
    ],
  },
  {
    id: "changes-to-terms",
    number: "11",
    title: "Changes to these terms",
    blocks: [
      {
        type: "p",
        text: "We may revise these terms and conditions from time to time for reasons such as legal requirements, new services, or regulatory guidance. Changes take effect when published on this page, and the \"Last updated\" date at the top reflects the most recent revision. Your continued use of the website after changes are published means you accept the revised terms.",
      },
    ],
  },
  {
    id: "governing-law",
    number: "12",
    title: "Governing law and jurisdiction",
    blocks: [
      {
        type: "p",
        text: "These terms are governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located at Surat, Gujarat, India.",
      },
    ],
  },
  {
    id: "contact-us",
    number: "13",
    title: "How can you contact us about these terms?",
    blocks: [
      {
        type: "p",
        contact: true,
        text: "If you have questions or comments about these terms, you may email us at",
      },
      {
        type: "address",
      },
    ],
  },
];

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms & Conditions"
      title="Terms that keep"
      accent="the work clear."
      intro="These terms and conditions govern your use of the Prime Softech website — including browsing our services, sending enquiries, and applying for roles. Separate written agreements govern client projects."
      sections={sections}
    />
  );
}

export default TermsPage;
